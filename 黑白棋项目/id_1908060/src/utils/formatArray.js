// help
const copy = (raw) => raw.map(item => [...item]);

export default function format(squares) {
    return squares.reduce((result, current, index) => {
        result = copy(result);
        const row = Math.floor(index / 10);
        const col = index % 10;

        if (row > 0 && row < 9 && col > 0 && col < 9) {
            result[col - 1][row - 1] = current;
        }
        return result;
    }, new Array(8).fill(new Array(8).fill(null)));
}
