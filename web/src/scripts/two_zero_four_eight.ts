class Two_zero_four_eight {
    readonly #size_x: number
    readonly #size_y: number
    #grid: number[][]
    #max = 1

    /**
     * @description max number in the grid
     */
    get max() {
        return this.#max
    }

    constructor(x: number = 4, y: number = 4) {
        this.#grid = new Array(y).fill(0)
            .map(_ => new Array(x).fill(0))

        this.#size_x = x
        this.#size_y = y

        this.auto_appear()
        this.auto_appear()
    }

    /**
     * @description 空白处随机出现一个新数字, 并返回其坐标
     */
    private auto_appear(val: number = 1): [ x: number, y: number ] {
        const empty_ceil: [ number, number ][] = []
        for (let y = 0; y < this.#size_y; y++) {
            for (let x = 0; x < this.#size_x; x++) {
                if(this.#grid[y][x] === 0) empty_ceil.push([ x, y ])
                else this.#max = Math.max(this.#max, this.#grid[y][x])
            }
        }
        const new_pos = empty_ceil[Math.floor(Math.random() * empty_ceil.length)]
        this.set_val(...new_pos, val)
        return new_pos
    }

    // region merge to specific direction
    private apply_force_up() {
        // region 向上
        // 每一列独立
        for (let x = 0; x < this.#size_x; x++) {
            let force_end = 0
            // 力方向上最后一个不用做处理
            for (let y = force_end + 1; y < this.#size_y; y++) {
                // 0 不做处理
                if(this.#grid[y][x] === 0) continue
                // 非零 沉降
                for (let p = y; p > force_end; p--) {
                    // 遇到0 换位
                    if(this.#grid[p - 1][x] === 0) {
                        this.#grid[p - 1][x] = this.#grid[p][x]
                        this.#grid[p][x] = 0
                    }
                    // 非零且相等 融合
                    else if(this.#grid[p - 1][x] === this.#grid[p][x]) {
                        this.#grid[p - 1][x] *= 2
                        this.#grid[p][x] = 0
                        force_end = p
                        break
                    }
                    // 非零且不等 停止
                    else {
                        force_end = p
                        break
                    }
                }
            }
        }
        // endregion
    }

    private apply_force_right() {
        // region 向右
        // 每一行独立
        for (let y = 0; y < this.#size_y; y++) {
            let force_end = this.#size_x - 1
            for (let x = force_end - 1; x >= 0; x--) {
                // 0 不做处理
                if(this.#grid[y][x] === 0) continue
                // 非零 沉降
                for (let p = x; p < force_end; p++) {
                    // 遇到0 换位
                    if(this.#grid[y][p + 1] === 0) {
                        this.#grid[y][p + 1] = this.#grid[y][p]
                        this.#grid[y][p] = 0
                    }
                    // 非零且相等 融合
                    else if(this.#grid[y][p + 1] === this.#grid[y][p]) {
                        this.#grid[y][p + 1] *= 2
                        this.#grid[y][p] = 0
                        force_end = p
                        break
                    }
                    // 非零且不等 停止
                    else {
                        force_end = p
                        break
                    }
                }
            }
        }
        // endregion
    }

    private apply_force_down() {
        // region 向下
        // 每一列独立
        for (let x = 0; x < this.#size_x; x++) {
            let force_end = this.#size_y - 1
            for (let y = force_end - 1; y >= 0; y--) {
                // 0 不做处理
                if(this.#grid[y][x] === 0) continue
                // 非零 沉降
                for (let p = y; p < force_end; p++) {
                    // 遇到0 换位
                    if(this.#grid[p + 1][x] === 0) {
                        this.#grid[p + 1][x] = this.#grid[p][x]
                        this.#grid[p][x] = 0
                    }
                    // 非零且相等 融合
                    else if(this.#grid[p + 1][x] === this.#grid[p][x]) {
                        this.#grid[p + 1][x] *= 2
                        this.#grid[p][x] = 0
                        force_end = p
                        break
                    }
                    // 非零且不等 停止
                    else {
                        force_end = p
                        break
                    }
                }
            }
        }
        // endregion
    }

    private apply_force_left() {
        // region 向左
        // 每一行独立
        for (let y = 0; y < this.#size_y; y++) {
            let force_end = 0
            for (let x = force_end + 1; x < this.#size_x; x++) {
                // 0 不做处理
                if(this.#grid[y][x] === 0) continue
                // 非零 沉降
                for (let p = x; p > force_end; p--) {
                    // 遇到0 换位
                    if(this.#grid[y][p - 1] === 0) {
                        this.#grid[y][p - 1] = this.#grid[y][p]
                        this.#grid[y][p] = 0
                    }
                    // 非零且相等 融合
                    else if(this.#grid[y][p - 1] === this.#grid[y][p]) {
                        this.#grid[y][p - 1] *= 2
                        this.#grid[y][p] = 0
                        force_end = p
                        break
                    }
                    // 非零且不等 停止
                    else {
                        force_end = p
                        break
                    }
                }
            }
        }
        // endregion
    }

    /**
     * @description apply a force
     * @description return `true` if end
     * @description return `false` and auto do appear if not end
     */
    apply_force(to: 'up' | 'right' | 'down' | 'left') {
        switch(to) {
            case 'up':
                this.apply_force_up()
                break
            case 'right':
                this.apply_force_right()
                break
            case 'down':
                this.apply_force_down()
                break
            case 'left':
                this.apply_force_left()
                break
        }

        const if_end = this.check_if_end()

        if(if_end) return true
        else {
            this.auto_appear()
            return false
        }
    }

    // endregion

    /**
     * @description check if meet the end
     */
    check_if_end() {
        const ori_grid = JSON.stringify(this.#grid)

        this.apply_force_up()
        let new_grid = JSON.stringify(this.#grid)
        this.#grid = JSON.parse(ori_grid)
        if(new_grid !== ori_grid) return false

        this.apply_force_right()
        new_grid = JSON.stringify(this.#grid)
        this.#grid = JSON.parse(ori_grid)
        if(new_grid !== ori_grid) return false

        this.apply_force_down()
        new_grid = JSON.stringify(this.#grid)
        this.#grid = JSON.parse(ori_grid)
        if(new_grid !== ori_grid) return false

        this.apply_force_left()
        new_grid = JSON.stringify(this.#grid)
        this.#grid = JSON.parse(ori_grid)
        return new_grid === ori_grid;
    }

    /**
     * @description take a shoot of current grid`s state
     */
    have_a_look() {
        return this.#grid.map(row => {
            return [ ...row ]
        })
    }

    /**
     * @description set grid[y][x] to val
     */
    set_val(x: number, y: number, val: number = 1) {
        this.#grid[y][x] = val
    }
}

const grid = new Two_zero_four_eight()
// grid.set_val(0,2)
// grid.set_val(1,2)
// grid.set_val(2,2)
// grid.set_val(3,2)
// console.log('0: ', grid.have_a_look())
// grid.force('down')
// console.log('1: ', grid.have_a_look())
// grid.force('down')
// console.log('2: ', grid.have_a_look())
// grid.force('down')
// console.log('3: ', grid.have_a_look())

// grid.set_val(2, 0)
// grid.set_val(2, 1)
// grid.set_val(2, 2)
// grid.set_val(2, 3)
// console.log('0: ', grid.have_a_look())
// grid.apply_force('left')
// console.log('1: ', grid.have_a_look())
// grid.apply_force('left')
// console.log('2: ', grid.have_a_look())
// grid.apply_force('left')
// console.log('3: ', grid.have_a_look())

// grid.have_a_look()

export {
    Two_zero_four_eight
}