import { Bodies, Composites } from "matter-js";

class BasicComponents {
    /**
     * @description
     * @param startX
     * @param startY
     * @param [boardSize = [30, 20]]
     * @param [boardNumber = 5]
     * @param [borderGap = 10]
     */
    public static bridge(startX: number, startY: number, boardSize: [number,number] = [30, 10], boardNumber: number = 5, borderGap: number = 10) {
        const boards = Composites.stack(startX, startY, boardNumber, 1, borderGap, 0, (x: number, y: number) => {
            return Bodies.rectangle(x, y, ...boardSize, { chamfer: { radius: 5 } })
        })
        Composites.chain(boards, 0.4, 0, -0.4, 0, {})
        return boards
    }
}

export {
    BasicComponents
}