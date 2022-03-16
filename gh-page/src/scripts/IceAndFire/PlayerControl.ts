import { Bodies, Body } from "matter-js";
import { GlobalConfig } from "@/scripts/IceAndFire/BasicConfig";

class PlayerControl {
    /**
     * @description 生成一个可控实体
     */
    public static createPlayer(color: string = '#000000', initPos?: [ number, number ]) {
        const { outerSize, boundaryThickness } = GlobalConfig.world
        const { headRadius, neckGap, bodySize, legGap, legSize } = GlobalConfig.player

        // 脚中心点的 [x, y]
        const startPoint = initPos ?? [
            boundaryThickness + 20 + bodySize[0] / 2,
            outerSize[1] - boundaryThickness
        ]

        const _head = Bodies.circle(startPoint[0], startPoint[1] - legSize[1] - legGap - bodySize[1] - neckGap - headRadius, headRadius, { render: { fillStyle: color + 'aa' } })
        const _body = Bodies.rectangle(startPoint[0], startPoint[1] - legSize[1] - legGap - bodySize[1] / 2, bodySize[0], bodySize[1], { render: { fillStyle: color }, chamfer: { radius: 5 } })
        const _leg_left = Bodies.rectangle(startPoint[0] - bodySize[0] / 4, startPoint[1] - legSize[1] / 2, legSize[0], legSize[1], { render: { fillStyle: color + 'cc' } })
        const _leg_right = Bodies.rectangle(startPoint[0] + bodySize[0] / 4, startPoint[1] - legSize[1] / 2, legSize[0], legSize[1], { render: { fillStyle: color + 'cc' } })

        return Body.create({
            parts: [ _head, _body, _leg_left, _leg_right ],
            inertia: 1e10,  // 极大的惯性 - 保持竖直
            inverseInertia: 1e-10,  // 与 inertia 属性同步设置, 互为倒数
            // friction: 0,  // 动摩擦力
            // frictionAir: 0,  // 空气阻力
            // frictionStatic: 0,  // 静摩擦力
            restitution: 1,
            collisionFilter: {
                group: -1
            },
        })
    }

    /**
     * @description control player`s move or stop
     */
    public static control(player: Body, directions: ('up' | 'right' | 'down' | 'left' | 'disable' | 'enable')[]) {
        if(directions.includes('disable')) {
            player.isStatic = true
        }
        else {
            if(directions.includes('enable')) player.isStatic = false

            const _up = directions.includes('up') ? -0.02 : 0
            const _right = directions.includes('right') ? 0.01 : 0
            const _down = directions.includes('down') ? 0.02 : 0
            const _left = directions.includes('left') ? -0.01 : 0

            Body.applyForce(player, player.position, { x: _left + _right, y: _up + _down })
        }
    }
}

export {
    PlayerControl
}