import { Bodies, Body, Composites, Constraint } from "matter-js";

class BasicComponents {
    /**
     * @description
     * @param startX 左侧桥墩的中心点 x
     * @param startY 左侧桥墩的中心点 y
     * @param [boardSize = [30, 20]]
     * @param [boardNumber = 5]
     * @param [borderGap = 10]
     * @example
     * const combined = BasicComponents.bridge(...)
     * World.add(world, combined)
     */
    public static bridge(startX: number, startY: number, boardSize: [ number, number ] = [ 40, 10 ], boardNumber: number = 3, borderGap: number = 10) {
        const left = Bodies.rectangle(startX, startY, 10, 30, { isStatic: true })
        const right = Bodies.rectangle(startX + boardSize[0] * boardNumber + borderGap * (boardNumber + 1), startY, 10, 30, { isStatic: true })

        const boards = Composites.stack(startX + borderGap, startY, boardNumber, 1, borderGap, 0, (x: number, y: number) => {
            return Bodies.rectangle(x, y, ...boardSize, { chamfer: { radius: 5 } })
        })

        const link_left = Constraint.create({
            bodyA: left,
            pointA: { x: 0, y: -5 },
            bodyB: boards.bodies[0],
            pointB: { x: -boardSize[0] * 0.4, y: 0 }
        })

        Composites.chain(boards, 0.4, 0, -0.4, 0, {})

        const link_right = Constraint.create({
            bodyA: boards.bodies[boards.bodies.length - 1],
            pointA: { x: boardSize[0] * 0.4, y: 0 },
            bodyB: right,
            pointB: { x: 0, y: -5 }
        })

        return [ left, link_left, boards, link_right, right ]
    }

    public static door(startX: number, startY: number, outerSize: [ number, number ], borderWidth: number, color: string = '#000000'): [Body, Function] {
        const outer = Bodies.rectangle(startX, startY, ...outerSize, { collisionFilter: { group: -1 }, render: { fillStyle: '#000000' } })
        const inner = Bodies.rectangle(startX, startY, outerSize[0] - 2 * borderWidth, outerSize[1] - 2 * borderWidth, { collisionFilter: { group: -1 }, render: { fillStyle: color+'99' } })
        const handle = Bodies.circle(startX + outerSize[0] / 2 - 3 * borderWidth, startY, 5, { render: { fillStyle: 'red' } })

        const entire = Body.create({
            parts: [ outer, inner, handle ]
        })

        const open = () => {
            // inner.position =
            Body.setPosition(inner, { x: inner.position.x, y: inner.position.y - outerSize[1] / 2 })
            Body.setPosition(handle, { x: handle.position.x, y: handle.position.y - outerSize[1] / 2 })
        }

        return [ entire, open ]
    }

}

export {
    BasicComponents
}