import Listener from "./Listener.js";

export default class SpriteTouchListener extends Listener {
    constructor(sprite, recogonizers, useCapture = false){
        super(recogonizers);
        let start = event => {
            
            var pointer = new Object;
            pointer.x = event.x;
            pointer.y = event.y;
            pointer.startX = event.x;
            pointer.startY = event.y;
            pointer.originalEvent = event; 
            pointer.identifier = event.identifier;
            this.pointers.set(event.identifier, pointer);
            for(let recogonizer of recogonizers) {
                recogonizer.start(pointer, this.pointers);
            }
        };
        let move = event => {
            var pointer = this.pointers.get(event.identifier);
            if(!pointer)
                return;
            pointer.x = event.x;
            pointer.y = event.y;
            pointer.originalEvent = event; 
            pointer.identifier = event.identifier;
            for(let recogonizer of recogonizers) {
                recogonizer.move(pointer, this.pointers);
            }
        }
        let end = event => {
            var pointer = this.pointers.get(event.identifier);
            if(!pointer)
                return;
            pointer.x = event.x;
            pointer.y = event.y;
            pointer.originalEvent = event;
            pointer.identifier = event.identifier;
            this.pointers.delete(event.identifier, pointer);
            for(let recogonizer of recogonizers) {
                recogonizer.end(pointer, this.pointers);
            }
        }
        let cancel = event => {
            //console.log(event);
            var pointer = this.pointers.get(event.identifier);
            if(!pointer)
                return;
            pointer.x = event.x;
            pointer.y = event.y;
            pointer.originalEvent = event; 
            pointer.identifier = event.identifier;
            this.pointers.delete(event.identifier, pointer);
            for(let recogonizer of recogonizers) {
                recogonizer.cancel(pointer, this.pointers);
            }
        }
        sprite.on("touchstart", start, useCapture);
        sprite.on("touchmove", move, useCapture);
        sprite.on("touchend", end, useCapture);
        sprite.on("touchcancel", cancel, useCapture);
        
    }
}