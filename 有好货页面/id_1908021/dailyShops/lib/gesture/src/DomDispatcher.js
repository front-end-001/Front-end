export default class DomDispatcher{
    constructor(element){
        this.events = [];
    }
    handle(event){
        console.log(event);
    }
}