import Recogonizer from "./Recogonizer.js";

export default class PressRecogonizer extends Recogonizer {
    constructor(pointers) {
        super(pointers);
    }
    start(pointer) {
        pointer.isTap = true;
        pointer.startTime = Date.now();
    }
    move(pointer) {
        let dx = pointer.x - pointer.startX,
            dy = pointer.y - pointer.startY;
        if(Math.sqrt(dx * dx + dy * dy) > 10  * this.DPR && !pointer.isPanning) {
            pointer.isTap = false;
        }
    }
    end(pointer){
        if(pointer.isTap && Date.now() - pointer.startTime < 500)
            this.emit("tap", pointer);
    }
}