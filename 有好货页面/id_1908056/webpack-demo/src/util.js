/**
 * 包装事件为Promise
 * @param {*} object dom对象
 * @param {*} type 事件类型
 * @param {*} config 
 */
export function happen(object, type, config){
    return new Promise(reslove => {
        object.addEventListener(type, reslove, config);
    })
}

/**
 * 包装ajax请求
 * @param {*} options 
 */
export function http(options){
    let { url, method, params, body, headers } = options;
    if(!url) return Promise.resolve({Msg: '不存在url'});
    method = method || 'get';
    method = method .toLowerCase();

    if(params && (params instanceof Object)){
        let paramsArr = [];
        for(let key in params){
            paramsArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        }
        url = `${url}?${paramsArr.join('&')}`
    }

    return fetch(url, { method, body, headers });
}

/**
 * 判断dom是否已经滚动到底部
 * @param {*} ele 
 */
export function getRect(ele){
    let inHeight=window.innerHeight,
        rect=ele.getBoundingClientRect();

    rect.isVisible = rect.top-inHeight<0;  // 是否在可视区域
    rect.isBottom = rect.bottom-inHeight<=0;
    return rect;
}