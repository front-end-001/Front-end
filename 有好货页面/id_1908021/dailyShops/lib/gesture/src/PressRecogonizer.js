import Recogonizer from "./Recogonizer.js";

export default class PressRecogonizer extends Recogonizer {

    start(pointer) {
        pointer.pressHandler = setTimeout(()=> {
            pointer.isPressing = true;
            this.emit("pressstart", pointer);
            pointer.pressHandler = null;
        }, 500);
    }
    move(pointer) {
        let dx = pointer.x - pointer.startX,
            dy = pointer.y - pointer.startY;
        if(Math.sqrt(dx * dx + dy * dy) > 10 * this.DPR ) {
            if(pointer.isPressing) {
                pointer.isPressing = false;
                this.emit("presscancel", pointer);
            }
            if(pointer.pressHandler) {
                clearTimeout(pointer.pressHandler);
                pointer.pressHandler = null;
            }
        }
    }
    end(pointer){
        if(pointer.isPressing) {
            pointer.isPressing = false;
            this.emit("pressend", pointer);
        }
        if(pointer.pressHandler) {
            clearTimeout(pointer.pressHandler);
            pointer.pressHandler = null;
        }
    }
    cancel(pointer){
        if(pointer.isPressing) {
            pointer.isPressing = false;
            this.emit("presscancel", pointer);
        }
        if(pointer.pressHandler) {
            clearTimeout(pointer.pressHandler);
            pointer.pressHandler = null;
        }
    }
}