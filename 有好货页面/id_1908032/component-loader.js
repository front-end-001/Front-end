module.exports = function (source, map) {
    source = source.split("");

    function emit(type, content){
        console.log(type, content);
    }

    const EOF = Symbol("EOF");

    let currentToken = null;

    let currentAttribute = null;


    function data(c){
        if(c == "<") {
            return tagOpen;
        } else if( c == "EOF") {
            emit("EOF", c);
            return ;
        } else {
            emit({
                type:"Text",
                content:c
            });
            return data;
        }
    }
    function tagOpen(c){
        if(c == "/") {
            return endTagOpen;
        } else if(c.match(/^[a-zA-Z]$/)) {
            currentToken = {
                type: "startTag",
                tagName : ""
            }
            return tagName(c);
        } else {
            emit("Text", c);
            return ;
        }
    }

    function tagName(c) {
        if(c.match(/^[\t\n\f ]$/)) {
            return beforeAttributeName;
        } else if(c == "/") {
            return selfClosingStartTag;
        } else if(c.match(/^[A-Z]$/)) {
            currentToken.tagName += c.toLowerCase();
            return tagName;
        } else if(c == ">") {
            emit(currentToken);
            return data;
        } else {
            currentToken.tagName += c;
            return tagName;
        }
    }
    function beforeAttributeName(c) {
        if(c.match(/^[\t\n\f ]$/)) {
            return beforeAttributeName;
        } else if(c == "/" || c == ">" || c == EOF) {
            return afterAttributeName(c);
        } else if(c == "=") {

        } else {
            currentAttribute = {
                name: "",
                value: ""
            }
            //console.log("currentAttribute", currentAttribute)
            return attributeName(c);
        }
    }

    function attributeName(c) {
        //console.log(currentAttribute);
        if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
            return afterAttributeName(c);
        } else if(c == "=") {
            return beforeAttributeValue;
        } else if(c == "\u0000") {
        
        } else if(c == "\"" || c == "'" || c == "<") {
        
        } else {
            currentAttribute.name += c;
            return attributeName;
        }
    }


    function beforeAttributeValue(c) {
        if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
            return beforeAttributeValue;
        } else if(c == "\"") {
            return doubleQuotedAttributeValue;
        } else if(c == "\'") {
            return singleQuotedAttributeValue;
        } else if(c == ">") {
            //return data;
        } else {
            return UnquotedAttributeValue(c);
        }
    }

    function doubleQuotedAttributeValue(c) {
        if(c == "\"") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            return beforeAttributeName;
        } else if(c == "\u0000") {

        } else if(c == EOF) {
            
        } else {
            currentAttribute.value += c;
            return doubleQuotedAttributeValue
        }
    }


    function singleQuotedAttributeValue(c) {
        if(c == "\'") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            return AfterQuotedAttributeValue;
        } else if(c == "\u0000") {

        } else if(c == EOF) {
            
        } else {
            currentAttribute.value += c;
            return doubleQuotedAttributeValue
        }
    }

    function AfterQuotedAttributeValue (){
        if(c.match(/^[\t\n\f ]$/)) {
            return beforeAttributeName;
        } else if(c == "/") {
            return selfClosingStartTag;
        } else if(c == ">") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            emit(currentToken);
            return data;
        } else if(c == EOF) {
            
        } else {
            currentAttribute.value += c;
            return doubleQuotedAttributeValue
        }
    }


    function UnquotedAttributeValue(c) {
        if(c.match(/^[\t\n\f ]$/)) {
            currentToken[currentAttribute.name] = currentAttribute.value;
            return beforeAttributeName;
        } else if(c == "/") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            return selfClosingStartTag;
        } else if(c == ">") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            emit(currentToken);
            return data;
        } else if(c == "\u0000") {

        } else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

        } else if(c == EOF) {
            
        } else {
            currentAttribute.value += c;
            return doubleQuotedAttributeValue
        }
    }

    function selfClosingStartTag(c){
        if( c == ">") {
            currentToken.isSelfClosing = true;
            emit(currentToken);
            return data;
        } else if(c == "EOF") {

        } else {
            
        }
    }

    function endTagOpen(c){
        if(c.match(/^[a-zA-Z]$/)) {
            currentToken = {
                type: "endTag",
                tagName : ""
            }
            return tagName(c);
        } else if(c == ">") {

        } else if(c == EOF) {
            
        } else {

        }
    }

    function afterAttributeName(c) {
        if(c.match(/^[\t\n\f ]$/)) {
            return afterAttributeName;
        } else if(c == "/") {
            return selfClosingStartTag;
        } else if(c == "=") {
            return beforeAttributeValue;
        } else if(c == ">") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            emit(currentToken);
            return data;
        } else if(c == EOF) {
            
        } else {
            currentToken[currentAttribute.name] = currentAttribute.value;
            currentAttribute = {
                name : "",
                value : ""
            };
            return attributeName(c);
        }
    }


    let state = data;


    for(let c of source) {
        //console.log(c, state.name)
        state = state(c);
    }

    state(EOF);

    return "123";
}
