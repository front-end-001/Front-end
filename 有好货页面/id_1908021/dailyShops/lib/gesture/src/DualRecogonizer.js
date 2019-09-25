import Recogonizer from "./Recogonizer.js";



export default class DualRecogonizer extends Recogonizer{

    start(pointer, pointers) {
        if(pointers.size>2) {
            this.emit("dualcancel", {pointer, pointers});
        }
        if(pointers.size == 2) {
            let i = pointers.values();
            let p1 = i.next().value;
            let p2 = i.next().value;
            //console.log(p1);

            this.startPoints = {p1: Object.assign({},p1), p2: Object.assign({},p2)};
            this.emit("dualstart", {pointer, pointers});
        }
    }
    move(pointer, pointers) {
        if(pointers.size == 2) {
            let {p1, p2} = this.startPoints;
            let p3 = pointers.get(p1.identifier);
            let p4 = pointers.get(p2.identifier);

            let scale = Math.sqrt(Math.pow(p3.x - p4.x, 2) + Math.pow(p3.y - p4.y, 2)) /
                Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            //console.log(p1,p2,p3,p4);
            
            let rotate = Math.atan2(p4.y - p3.y, p4.x - p3.x) - Math.atan2(p2.y - p1.y, p2.x - p1.x);
            
            
            //scale = 1;
            //rotate = 0;

            let translate = {
                x: p3.x - scale * p1.x * Math.cos(rotate) + scale * p1.y * Math.sin(rotate), 
                y: p3.y - scale * p1.y * Math.cos(rotate) - scale * p1.x * Math.sin(rotate)
            };
            //console.log("**************")
            //console.log(calc(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y).matrix);
            let transform = [
                [scale * Math.cos(rotate), -scale * Math.sin(rotate), translate.x ],
                [scale * Math.sin(rotate), scale * Math.cos(rotate), translate.y ],
                [0, 0, 1]
            ]
            //console.log(transform);
            this.emit("dual", {pointer, pointers, scale, rotate, translate, transform});
        }
    }
    end(pointer, pointers){
        if(pointers.size == 1) {
            this.emit("dualend", {pointer, pointers});
        }
    }
    cancel(pointer, pointers){
        if(pointers.size == 1) {
            this.emit("dualcancel", {pointer, pointers});
        }
    }
}