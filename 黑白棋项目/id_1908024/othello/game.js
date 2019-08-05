class Game {
    constructor() {
        this.patterns = [new Pattern()];
    }

    get pattern() {
        return this.patterns[this.patterns.length - 1];
    }

    get blackNum() {
        return this.pattern._computeWhiteAndBlackNumber().blackNum
    }

    get whiteNum() {
        return this.pattern._computeWhiteAndBlackNumber().whiteNum
    }

    bindEventClickEvent(view) {
        let blocks = es(".block");
        for (let block of blocks) {
            bindEvent(block, "click", () => {
                let [oy, ox] = block.dataset.offset.split("");
                oy = Number(oy);
                ox = Number(ox);

                // 落子
                this.move(oy, ox);
                view.render();

                // check pass 是否有地方下子， 没有地方就pass
                this.checkPass();
            });
        }

        // 悔棋部分
        let regret = e("#regret");
        bindEvent(regret, "click", () => {
            this.revert();
            view.render();
        });
    }

    move(y, x) {
        let pattern = this.pattern.clone();
        if (pattern.board[y][x] !== 0) {
            log("有棋子占据该位置");
            return;
        } else {
            // 吃子, 改变board数据
            pattern.move(y, x);
            // 判断落子是否可落子
            if (!pattern.canDropDisc) {
                // 这个位置不能落子，页面提示
                log("这个位置落子不符合规则");
                return;
            } else {
                // 这个位置可以落子
                // set canDropDisc variable to default, wait for next click
                pattern.canDropDisc = false;
                // change next click color
                pattern.color = 3 - pattern.color;

                this.patterns.push(pattern);
            }
        }
    }

    checkPass() {
        let pattern = this.pattern;
        if (!pattern.checkBoard()) {
            pattern.color = 3 - pattern.color;
            if (!pattern.checkBoard()) {
                log("Game Over");
            }
        }
    }

    revert() {
        if (this.patterns.length > 1) {
            this.patterns.pop();
        }
    }
}
