const enum BlockState {
    /** 雷 */
    mine = -6,
    /** 安全 */
    safe = -5,
    /** 旗子 - 雷 */
    flag_mine = -4,
    /** 旗子 - 安全 */
    flag_safe = -3,
    /** 问号 - 雷 */
    unknown_mine = -2,
    /** 问号 - 安全 */
    unknown_safe = -1,
}

class Mine_sweeper {
    #ifFirstDig = true
    #x_len: number = 0
    #y_len: number = 0
    #ground: (BlockState | number)[][] = []
    #mine: number = 0

    get mine() {
        return this.#mine
    }

    /**
     * @description 初始化场地
     * @private
     */
    private init_ground(x: number = 10, y: number = 10, mine?: number) {
        if(x < 9) x = 9; else if(x > 30) x = 30
        if(y < 9) y = 9; else if(y > 30) y = 30

        this.#x_len = x
        this.#y_len = y

        this.#ground = new Array(y).fill(0)
            .map(() => new Array(x).fill(BlockState.safe))

        if(!mine) {
            if(x + y < 32) this.#mine = Math.floor(0.13 * x * y)
            else if(x + y < 46) this.#mine = Math.floor(0.19 * x * y)
            else this.#mine = Math.floor(0.25 * x * y)
        }
        else if(mine < 10) this.#mine = 10
        else if(mine > (x - 1) * (y - 1)) this.#mine = (x - 1) * (y - 1)
        else this.#mine = mine
    }

    /**
     * @description 放置地雷
     * @private
     */
    private init_mine() {
        let remain = this.#mine
        const arr: number[] = new Array(this.#x_len * this.#y_len)
            .fill(0).map((_, idx) => idx)

        let idx_of_mine
        while (remain > 0) {
            idx_of_mine = Math.floor(Math.random() * arr.length)
            this.#ground[Math.floor(arr[idx_of_mine] / this.#x_len)][arr[idx_of_mine] % this.#x_len] = BlockState.mine
            arr.splice(idx_of_mine, 1)
            remain -= 1
        }
    }

    /**
     * @description 初始化
     * @param x [9, 30]
     * @param y [9, 30]
     * @param mine
     */
    constructor(x: number = 9, y: number = 9, mine?: number) {
        this.init_ground(x, y, mine)
        this.init_mine()
    }

    /**
     * @description 统计周围的雷的数量
     * @private
     */
    private count_around(x: number, y: number) {
        let count = 0
        for (let p_y = Math.max(0, y - 1); p_y <= Math.min(this.#y_len - 1, y + 1); p_y++) {
            for (let p_x = Math.max(0, x - 1); p_x <= Math.min(this.#x_len - 1, x + 1); p_x++) {
                if(this.#ground[p_y][p_x] === BlockState.mine
                    || this.#ground[p_y][p_x] === BlockState.flag_mine
                    || this.#ground[p_y][p_x] === BlockState.unknown_mine) count += 1
            }
        }
        return count
    }

    /**
     * @description 挖一个
     * @return boolean 是否死亡
     */
    dig(x: number, y: number): [ if_end: boolean, win_or_die: 'win' | 'die' | 'unknown' | 'never' ] {
        const real_thing = this.#ground[y][x]
        // 已标记的点位无法操作
        if(real_thing === BlockState.flag_safe
            || real_thing === BlockState.flag_mine
            || real_thing === BlockState.unknown_safe
            || real_thing === BlockState.unknown_mine) return [ false, 'unknown' ]
        // 已经掀开的不能进行操作
        else if(real_thing >= 0) return [ false, 'unknown' ]
        // 遇到雷: 第一次挖 - 换位; 非第一次 - 结束
        else if(real_thing === BlockState.mine) {
            if(!this.#ifFirstDig) return [ true, 'die' ]
            else {
                this.#ifFirstDig = false
                for (let y_replace = 0; y_replace < this.#y_len; y_replace++) {
                    for (let x_replace = 0; x_replace < this.#x_len; x_replace++) {
                        if(this.#ground[y_replace][x_replace] === BlockState.safe) {
                            this.#ground[y_replace][x_replace] = BlockState.mine
                            this.#ground[y][x] = BlockState.safe
                            return this.dig(x, y)
                        }
                        else if(this.#ground[y_replace][x_replace] === BlockState.flag_safe) {
                            this.#ground[y_replace][x_replace] = BlockState.flag_mine
                            this.#ground[y][x] = BlockState.safe
                            return this.dig(x, y)
                        }
                        else if(this.#ground[y_replace][x_replace] === BlockState.unknown_safe) {
                            this.#ground[y_replace][x_replace] = BlockState.unknown_mine
                            this.#ground[y][x] = BlockState.safe
                            return this.dig(x, y)
                        }
                    }
                }
                return [ false, 'never' ]
            }
        }
        // 未挖开的格子 递归挖开并统计周围的雷数量
        else {
            let mine_around = this.count_around(x, y)
            this.#ground[y][x] = mine_around
            // 如果周围八个全是空白, 则递归展开
            if(mine_around === 0) {
                for (let p_y = Math.max(0, y - 1); p_y <= Math.min(this.#y_len - 1, y + 1); p_y++) {
                    for (let p_x = Math.max(0, x - 1); p_x <= Math.min(this.#x_len - 1, x + 1); p_x++) {
                        this.dig(p_x, p_y)
                    }
                }
            }
            return [ false, 'unknown' ]
        }
    }

    /**
     * @description [无 - 旗 - 问号] 标记循环
     */
    mark(x: number, y: number) {
        const real_thing = this.#ground[y][x]
        // 已显示 - 直接返回
        if(real_thing >= 0) return
        // 雷
        else if(real_thing === BlockState.mine) this.#ground[y][x] = BlockState.flag_mine
        else if(real_thing === BlockState.flag_mine) this.#ground[y][x] = BlockState.unknown_mine
        else if(real_thing === BlockState.unknown_mine) this.#ground[y][x] = BlockState.mine
        // 安全
        else if(real_thing === BlockState.safe) this.#ground[y][x] = BlockState.flag_safe
        else if(real_thing === BlockState.flag_safe) this.#ground[y][x] = BlockState.unknown_safe
        else if(real_thing === BlockState.unknown_safe) this.#ground[y][x] = BlockState.safe
    }

    /**
     * @description 读取快照
     */
    have_a_look() {
        return this.#ground.map(row => [ ...row ])
    }
}

export {
    Mine_sweeper
}
