class View {
    constructor(container, game) {
        this.container = container;
        this.game = game;
        this.setFrame();
    }

    setFrame() {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let element = document.createElement("div");
                element.setAttribute("class", "block");
                element.setAttribute("data-offset", `${y}${x}`);
                this.container.appendChild(element);
            }
            this.container.appendChild(document.createElement("br"));
        }

        const information = document.createElement('div')
        information.setAttribute("id", "information");
        this.container.appendChild(information);

        // present black or white?
        let present = document.createElement('p')
        present.setAttribute("id", "present");
        information.appendChild(present);


        // score
        let score = document.createElement('section')
        score.setAttribute("id", "score");
        information.appendChild(score);

        // 悔棋部分
        let regret = document.createElement("button");
        regret.setAttribute("id", "regret");
        regret.innerText = "悔棋";
        information.appendChild(regret);

        this.game.bindEventClickEvent(this);

    }

    render() {
        // 棋盘
        let disc;
        let board = this.game.pattern.board;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                let element = e(`.block[data-offset= '${y}${x}']`);
                if (board[y][x] != 0) {
                    if (board[y][x] == 1) {
                        disc = this._addDisc("white");
                    } else if (board[y][x] == 2) {
                        disc = this._addDisc("black");
                    }
                    if (!element.firstChild) {
                        element.appendChild(disc);
                    } else {
                        element.replaceChild(disc, element.firstChild);
                    }
                } else {
                    if (element.firstChild) {
                        element.removeChild(element.firstChild);
                    }
                }
            }
        }

        // present
        const presentDom = e('#present')
        let presentHtml = `当前: ${this.game.pattern.color === 2 ? '黑方' : '白方'}`
        presentDom.innerText = presentHtml

        // score
        const scoreDom = e('#score')
        let scoreHtml = `黑子: ${this.game.blackNum}, 白子: ${this.game.whiteNum}`
        scoreDom.innerText = scoreHtml
    }

    _addDisc(color) {
        let disc = document.createElement("div");
        disc.setAttribute("class", `disc disc-${color}`);
        return disc;
    }
}
