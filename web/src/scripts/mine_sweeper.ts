const enum BlockState {
    // 雷
    mime = -4,
    // 安全
    safe = -3,
    // 旗子
    certain = -2,
    // 问号
    unknown = -1,
    // 已点击 0 - 8
    zero = 0,
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
}

class Mine_sweeper {
    #x_len: number = 0
    #y_len: number = 0
    #mine: number = 0
    #ground: (BlockState | number)[][] = []

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
            this.#ground[Math.floor(arr[idx_of_mine] / this.#x_len)][arr[idx_of_mine] % this.#x_len] = BlockState.mime
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
    constructor(x: number = 10, y: number = 10, mine?: number) {
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
                if(this.#ground[y][x] === BlockState.mime) count += 1
            }
        }
        return count
    }

    /**
     * @description 挖一个
     * @return boolean 是否死亡
     */
    dig(x: number, y: number) {
        // 已经掀开的不能进行操作
        if(this.#ground[y][x] >= 0) return false
        // 遇到雷直接结束
        else if(this.#ground[y][x] === BlockState.mime) return true
        // 否则递归挖开并统计周围的雷数量
        else {
            this.#ground[y][x] = this.count_around(x, y)
            return false
        }
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
