import Listener from "./Listener.js";

export default class DomMouseListener extends Listener {
    constructor(element, recogonizers, useCapture = false){
        super(recogonizers);
        element.addEventListener("mousedown", event => {
            var pointer = new Object;
            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.startX = event.clientX;
            pointer.startY = event.clientY;
            pointer.event = event; 
            this.pointers.set("", pointer);
            for(let recogonizer of recogonizers) {
                recogonizer.start(pointer, this.pointers);
            }

            let move = event => {
                var pointer = this.pointers.get("");
                pointer.x = event.clientX;
                pointer.y = event.clientY;
                pointer.innerEvent = event; 
                for(let recogonizer of recogonizers) {
                    recogonizer.move(pointer, this.pointers);
                }
            }
            let end = event => {
                var pointer = this.pointers.get("");
                pointer.x = event.clientX;
                pointer.y = event.clientY;
                pointer.innerEvent = event; 
                this.pointers.delete("", pointer);
                for(let recogonizer of recogonizers) {
                    recogonizer.end(pointer, this.pointers);
                }
                element.removeEventListener("mousemove", move);
                element.removeEventListener("mouseup", end);
                if(element.releaseCapture)
                    element.releaseCapture();
            }

            element.addEventListener("mousemove", move, useCapture);
            element.addEventListener("mouseup", end, useCapture);
            if(element.setCapture)
                element.setCapture();
        }, useCapture)
        
    }
}