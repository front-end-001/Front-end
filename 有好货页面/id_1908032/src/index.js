import { create } from './create';
import App from './App';
import { happen } from './util';
import api from './api/shop';

// 初始化方法
void async function(){
    let [result] = await Promise.all([api.fetchRecommand(), happen(document, 'DOMContentLoaded')]);
    let data = await result.json();
    let app = <App data={ data }></App>
    app.appendTo(document.body);
}();

