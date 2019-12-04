module.exports = function(source, map) {
    sourceArray = source.split("");

    let EOF = Symbol("EOF");

    let currentToken = Object.create(null);

    function emit(type, content) {
        console.log(type, content);
    }

    function data(c) {
        if (c == '<') {
            return tagOpen;
        } else if (c == "EOF") {
            emit("EOF", c);
            return;
        } else {
            emit("Text", c);
            return;
        }
    }



    function tagOpen(c) {
        if (c == '/') {
            return endTagOpen;
        } else if (c.match(/^[a-zA-Z]$/)) {
            currentToken = {
                type: "startTag",
                tagName: ""
            }

            return TagName(c);
        } else {
            emit("Text", c);
            return;
        }
    }


    function tagName(c) {
        if (c.match(/^[\t\n\f ]$/)) {
            return beforeAttributeName;
        } else if (c == "/") {
            return selfClosingStartTag;
        } else if (c.match(/^[A-Z]$/)) {
            currentToken.tagName += c.toLowerCase();
            return tagName;
        } else if(c == ">") {
            emit(currentToken);
            currentToken = null;
            return data;
        }else{
            currentToken += c;
            return tagName;
        }
    }


    function beforeAttributeName(c) {
        if (c.match(/^[\t\n\f ]$/)) {
            return beforeAttributeName;
        } else if (c == "/") {
            return selfClosingStartTag;
        } else if (c.match(/^[A-Z]$/)) {
            currentToken.tagName += c.toLowerCase();
            return tagName;
        } else if(c == ">") {
            emit(currentToken);
            currentToken = null;
            return data;
        }else{
            currentToken += c;
            return tagName;
        }
    }




    let state = data;


    for (let c of source) {
        state = state(c);
    }



}
