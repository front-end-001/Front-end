import Listener from "./Listener.js";

export default class DomTouchListener extends Listener {
    constructor(element, recogonizers, useCapture = false){
        super(recogonizers);
        element.addEventListener("touchstart", event => {
            for(let touch of event.changedTouches) {
                var pointer = new Object;
                pointer.x = touch.clientX;
                pointer.y = touch.clientY;
                pointer.startX = touch.clientX;
                pointer.startY = touch.clientY;
                pointer.innerEvent = event; 
                pointer.identifier = touch.identifier;
                this.pointers.set(touch.identifier, pointer);
                for(let recogonizer of recogonizers) {
                    recogonizer.start(pointer, this.pointers);
                }
            }

        }, useCapture);
        let move = event => {
            for(let touch of event.changedTouches) {
                var pointer = this.pointers.get(touch.identifier);
                if(!pointer)
                    continue;
                pointer.x = touch.clientX;
                pointer.y = touch.clientY;
                pointer.innerEvent = event; 
                pointer.identifier = touch.identifier;
                for(let recogonizer of recogonizers) {
                    recogonizer.move(pointer, this.pointers);
                }
            }
        }
        let end = event => {
            for(let touch of event.changedTouches) {
                var pointer = this.pointers.get(touch.identifier);
                if(!pointer)
                    continue;
                pointer.x = touch.clientX;
                pointer.y = touch.clientY;
                pointer.innerEvent = event;
                pointer.identifier = touch.identifier;
                this.pointers.delete(touch.identifier, pointer);
                for(let recogonizer of recogonizers) {
                    recogonizer.end(pointer, this.pointers);
                }
            }
        }
        let cancel = event => {
            //console.log(event);
            for(let touch of event.changedTouches) {
                var pointer = this.pointers.get(touch.identifier);
                if(!pointer)
                    continue;
                pointer.x = touch.clientX;
                pointer.y = touch.clientY;
                pointer.innerEvent = event; 
                pointer.identifier = touch.identifier;
                this.pointers.delete(touch.identifier, pointer);
                for(let recogonizer of recogonizers) {
                    recogonizer.cancel(pointer, this.pointers);
                }
            }
        }
        element.addEventListener("touchmove", move, useCapture);
        element.addEventListener("touchend", end, useCapture);
        element.addEventListener("touchcancel", cancel, useCapture);
        
    }
}