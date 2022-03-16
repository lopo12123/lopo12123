const GlobalConfig = {
    world: {
        /**
         * @description 外尺寸 [width, height]
         * @type [number, number]
         * @default [1000, 640]
         */
        outerSize: [ 1000, 640 ],
        /**
         * @description 内尺寸 [width, height]
         * @type [number, number]
         * @default [960, 600]
         */
        innerSize: [ 960, 600 ],
        /**
         * @description 壁厚
         * @type number
         * @default 20
         */
        boundaryThickness: 20
    },
    player: {
        /**
         * @description 头(圆) radius
         * @type number
         * @default 10
         */
        headRadius: 10,
        /**
         * @description 脖子(空隙) height
         * @type number
         * @default 5
         */
        neckGap: 5,
        /**
         * @description 身体(长方形) [width, height]
         * @type [number, number]
         * @default [20, 30]
         */
        bodySize: [ 20, 30 ],
        /**
         * @description 腿-身体(空隙) height
         * @type number
         * @default 3
         */
        legGap: 3,
        /**
         * @description 腿(长方形) [width, height]
         * @type [number, number]
         * @default [6, 10]
         */
        legSize: [ 6, 10 ]
    }
}

export {
    GlobalConfig
}