 class server {
    constructor(){
        this._url = null
        this._parmas = null
        this._request = new XMLHttpRequest()
    }
    getRequest(url,parmas){
        this._url = url
        this._parmas = parmas
        this._request.open('GET',this._url,true)
        this._request.send() 
        return new Promise((resolve, reject)=> { 
            this.onRead(resolve, reject)
        })
    }
     onRead(resolve, reject){
         this._request.onreadystatechange = ()=>{
            if (this._request.readyState == 4 || this._request.readyState.readyState == 200){
                return resolve(JSON.parse(this._request.responseText))
            }
        }
    }

}


const  URL_OBJ = {
    InterestingPageDataTypeAll: 'https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeAll',
    NewPageData: 'https://static001.geekbang.org/univer/classes/js_dev/data/getNewPageData',
    RecommendationPageData:'https://static001.geekbang.org/univer/classes/js_dev/data/getRecommendationPageData'
}

const URL_FUNC = {}
let keys = Object.keys(URL_OBJ)
for(let key of keys){
    URL_FUNC[key] = (parmas='')=>{
        let s = new server()
        return s.getRequest(URL_OBJ[key], parmas)//Promise
    }
}

export default URL_FUNC