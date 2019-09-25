export default class Recogonizer {
    constructor(consumer, DPR = 1) {
        this.consumer = consumer;
        this.DPR = DPR;
    }
    emit(name, props){
        var event = Object.create(props, {
            type: { value: name }
        });
        if(this.consumer && this.consumer.handle)
            Promise.resolve().then(()=>this.consumer.handle(event));
        if(this.consumer && typeof this.consumer == "function")
            Promise.resolve().then(()=>this.consumer.call(null, event));
    }
    start(pointer) {
        
    }
    move(pointer) {

    }
    end(pointer){

    }
    cancel(pointer){

    }
}