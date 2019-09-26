import Recogonizer from "./Recogonizer.js";

export default class PanRecogonizer extends Recogonizer {
    start(pointer) {
        pointer.isPanning = false;
    }
    move(pointer) {
        let dx = pointer.x - pointer.startX,
            dy = pointer.y - pointer.startY;

        if(Math.sqrt(dx * dx + dy * dy) > 10 * this.DPR && !pointer.isPanning) {
            pointer.isPanning = true;
            this.emit("panstart", pointer);
        }

        if(pointer.isPanning)
            this.emit("pan", pointer);
    }
    end(pointer){
        if(pointer.isPanning)
            this.emit("panend", pointer);
    }
    cancel(pointer){
        if(pointer.isPanning)
            this.emit("pancancel", pointer);
    }
}