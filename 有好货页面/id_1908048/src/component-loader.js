module.exports = function(source, map){
    source = source.split("");
    const EOF = Symbol("EOF");
    let currentToken = null;
    let currentAttribute = null;
    function emit(type, content){
        console.log(type, content);
    }
    function data(c){
        if (c=="<"){
            return tagOpen;
        } else if (c =="EOF"){
            emit("EOF",c);
            return ;
        } else {
            emit({
                type:"Text",
                content:c
            });
            return;
        }
    }
    function tagOpen(c) {
        if (c == "/") {
            return endTagOpen;
        } else if (c.match(/^[a-zA-Z]$/)) {
            currentToken ={
                type: "startTag",
                tagName: ""
            }
            return tagName(c);
        } else {
            emit("Text", c);
            return;
        }
    }
    function tagName(c) {
        if (c.match(/^[\t\n\f ]$/)){
            return beforeAttributeName;
        } else if (c =="/"){
            return selfClosingStartTag;
        } else if (c.match(/^[A-Z]$/)) {
            currentToken.tagName += c.toLowerCase();
            return tagName;
        } else if (c == ">") {
            emit(currentToken);
            currentToken = null;
            return data;
        } else {
            currentToken.tagName += c;
            return tagName;
        }
    }
    function beforeAttributeName(c) {
        if (c.match(/^[\t\n\f ]$/ || c == "/" || c == ">")) {
            return beforeAttributeName;
        } else if (c == "=") {
            return beforeAttributeValue;
        } else if (c=="\u0000"){
            return ;
        } else if (c == "\"" || c=="'" || c=="<"){
            return;
        } else {
            currentAttribute.name +=c;
            return attributeName;
        }
    }

    function attributeName(c) {
        if (c.match(/^[\t\n\f ]$/)) {
            return afterAttributeName;
        } else if (c == "/" || c == ">") {
            return afterAttributeName;
        } else if (c == "=") {
            return;
        } else {
            currentAttribute = {
                name: "",
                value: ""
            };
            return attributeName;
        }
    }

    function beforeAttributeValue(c) {
        if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">") {
            return afterAttributeName;
        } else if (c == "\"") {
            return doubleQuotedAttributeValue;
        } else if (c == "'") {
            return singleQuotedAttributeValue;
        } else if (c==">"){
        //  return;  
        } else {
            return unquotedAttributeValue;
        }
    }
    function doubleQuotedAttributeValue(c) {
        if (c=="\""){
            currentToken[currentAttribute.name] = currentAttribute.value;
            return beforeAttributeName
        } else if (c=="\u0000"){

        } else if (c==EOF){
            
        } else {
            currentAttribute.value+=c;
            return doubleQuotedAttributeValue;
        }
    }
    function singleQuotedAttributeValue(c) {
        if (c == "'") {
            currentToken[currentAttribute.name] = currentAttribute.value;
            return beforeAttributeName
        } else if (c == "\u0000") {

        } else if (c == EOF) {

        } else {
            currentAttribute.value += c;
            return singleQuotedAttributeValue;
        }
    }
    function unquotedAttributeValue(c) {
        if (c.match(/^[\t\n\f ]$/ || c=="/" || c==">")){
            currentToken[currentAttribute.name] = currentAttribute.value;
            return beforeAttributeValue;
        }else if (c == "\u0000") {

        } else if (c == EOF) {

        } else {
            currentAttribute.value += c;
            return unquotedAttributeName;
        }
    }
    function afterQutedAttributeValue(){
        if (c.match(/^[\t\n\f ]$/)) {
            return beforeQutedAttributeValue;
        } else if (c=="/"){
            return selfClosingStartTag;
        }

    }
    function selfClosingStartTag(c){
        if (c==">"){
            currentToken.isSelfClosing = true;
            emit(currentToken);
            return data;
        }

    }
    let state = data;
    for (let c of source){
        state = state(c);
    }
    console.log(source);
    return "'"+source+"'";
}