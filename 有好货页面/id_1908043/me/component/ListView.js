import { myCreate } from '../create';
import Div from "./Div.js";
import {PROPERTY, ATTRIBUTE, EVENT, STATE } from '../symbol';
import BaseComponent from './BaseComponent'
import './ListView.css'


export default class ListView extends BaseComponent {
    appendTo(element){
        element.appendChild(this.root);

        element = <div><img style="width:130px;height:130px;"></img>abc</div>


        this.mounted();
    }

    created(){
        this.root = document.createElement("div");
        this.root.className = 'listview';
        this.render().appendTo(this.root);
    }

    setAttribute(name, value){
        if(name == "style") {
            this.root.setAttribute("style", value);
        }
        if(name == "data") {
            this[ATTRIBUTE][name] = value;

            this.root.innerHTML = "";
            this.render().appendTo(this.root);

            return value;
        }
        return this[ATTRIBUTE][name] = value;
    }

    render () {
        let data = this[ATTRIBUTE]["data"] || [];
        // return <div>123131231233</div>;

        // return <div>
        //     {
        //         data.map(item => (
        //             <div class="item">
        //                 {item.name}
        //                 <img src={item.icon} alt="" class="item-titleLineImg" />
        //             </div>
        //         ))
        //     }
        // </div>

        return <div>
            {
                data.map(item => (
                    <div class="item">
                        <div class="title">
                            <div class="title-left">
                                <img src={item.icon} alt="" />
                                <div class="text">
                                    {item.name}
                                    <span class="icon">天猫</span>
                                </div>
                            </div>
                            <div class="title-enter">进店</div>
                            </div>
                            <div class="preview">
                            <div
                                class="big-area"
                                style={`background-image: url(${item.items[0].image})`}
                            />
                            <div class="small-area">
                                <div
                                class="small-img"
                                style={`background-image: url(${item.items[1].image})`}
                                />
                                <div
                                class="small-img"
                                style={`background-image: url(${item.items[2].image})`}
                                />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    }
}