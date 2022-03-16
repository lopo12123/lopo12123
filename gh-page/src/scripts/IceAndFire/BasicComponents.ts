import { Bodies, Body, Composites, Constraint } from "matter-js";

class BasicComponents {
    /**
     * @description
     * @param startX
     * @param startY
     * @param [boardSize = [30, 20]]
     * @param [boardNumber = 5]
     * @param [borderGap = 10]
     * @example
     * const combined = BasicComponents.bridge(...)
     * World.add(world, combined)
     */
    public static bridge(startX: number, startY: number, boardSize: [number,number] = [40, 10], boardNumber: number = 3, borderGap: number = 10) {
        const left = Bodies.rectangle(startX, startY, 10, 30, { isStatic: true })
        const right = Bodies.rectangle(startX + boardSize[0] * boardNumber + borderGap * (boardNumber + 1), startY, 10, 30, { isStatic: true })

        const boards = Composites.stack(startX + borderGap, startY, boardNumber, 1, borderGap, 0, (x: number, y: number) => {
            return Bodies.rectangle(x, y, ...boardSize, { chamfer: { radius: 5 } })
        })

        const link_left = Constraint.create({
            bodyA: left,
            pointA: { x: 0, y: -5 },
            bodyB: boards.bodies[0],
            pointB: { x: -boardSize[0] * 0.4, y: 0  }
        })

        Composites.chain(boards, 0.4, 0, -0.4, 0, {})

        const link_right = Constraint.create({
            bodyA: boards.bodies[boards.bodies.length - 1],
            pointA: { x: boardSize[0] * 0.4, y: 0  },
            bodyB: right,
            pointB: { x: 0, y: -5 }
        })

        return [left, link_left, boards, link_right, right ]
    }
}

export {
    BasicComponents
}