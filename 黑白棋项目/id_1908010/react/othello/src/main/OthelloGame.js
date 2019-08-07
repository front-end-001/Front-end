import OthelloPattern from "./OthelloPattern.js";

class OthelloGame {
    constructor() {
        this.patterns = [new OthelloPattern()];
        this.colors = [1];
    }

    get pattern() {
        return this.patterns[this.patterns.length - 1];
    }

    get color() {
        return this.colors[this.colors.length - 1];
    }

    move(x, y) {
        let pattern = this.pattern.clone();
        let color = this.color;

        if(pattern.move(x, y, color)) {
            color = 3 - color;
            if (pattern.checkPass(color)) {
                console.log("passed");
                color = 3 - color;
                if (pattern.checkPass(color)) {
                    //game over
                    pattern.showWin();
                }
            }
            this.patterns.push(pattern);
            this.colors.push(color);
            pattern.showCurrent();
        }
    }

    revert() {
        if (this.patterns.length > 1) {
            this.patterns.pop();
            this.colors.pop();
        }
    }

    reset() {
        this.patterns = [new OthelloPattern()];
        this.colors = [1];
    }
}

export default OthelloGame;
