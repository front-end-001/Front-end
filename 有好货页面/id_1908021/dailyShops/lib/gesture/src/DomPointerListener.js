import Listener from "./Listener.js";

export default class DomPointerListener extends Listener {
    constructor(element, recogonizers, useCapture = false){
        super(recogonizers);
        element.addEventListener("touchstart", event => {
            for(let touch of event.changedTouches) {
                var pointer = new Object;
                pointer.x = touch.clientX;
                pointer.y = touch.clientX;
                pointer.startX = touch.clientX;
                pointer.startY = touch.clientY;
                pointer.event = event; 
                this.pointers.set(touch.identifier, pointer);
                for(let recogonizer of recogonizers) {
                    recogonizer.start(pointer, );
                }
            }

        }, useCapture);
        let move = event => {
            for(let touch of event.changedTouches) {
                var pointer = this.pointers.get(touch.identifier);
                pointer.x = touch.clientX;
                pointer.y = touch.clientX;
                pointer.event = event; 
                for(let recogonizer of recogonizers) {
                    recogonizer.move(pointer);
                }
            }
        }
        let end = event => {
            for(let touch of event.changedTouches) {
                var pointer = this.pointers.get(touch.identifier);
                pointer.x = event.clientX;
                pointer.y = event.clientX;
                pointer.event = event; 
                this.pointers.delete("", pointer);
                for(let recogonizer of recogonizers) {
                    recogonizer.end(pointer);
                }
            }
        }
        element.addEventListener("touchmove", move, useCapture);
        element.addEventListener("touchend", end, useCapture);
        
    }
}