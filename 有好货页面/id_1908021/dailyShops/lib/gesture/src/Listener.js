export default class Listener {
    constructor(recogonizers){
        this.pointers = new Map();
        this.recogonizers = [...recogonizers];
    }
}

