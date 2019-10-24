module.exports = function(source, map) {
    const splitSource = source.split("")
    console.log(typeof splitSource)
    for (const s of splitSource) {
        console.log(s)
    }
    let currentTextNode = null
    const stack = [{ type: 'document', children: [] }]
    function emit (token) {
        const top = stack[stack.length - 1]
        if (token.type === 'startTag') {
            const element = {
                type: 'element',
                children: []
            }
            for (const t of token) {
                if (t !== 'type') {
                    element[t] = token[t]
                }
            }
            top.children.push(element)
            if (!token.isSelfClosing) {
                stack.push(element)
            }
            return
        }
        if (token.type === 'endTag') {
            if(top.tagName !== token.tagName) {
                throw new Error('error')
            }
            stack.pop()
            currentTextNode = null
            return
        }
        if (token.type === 'text') {
            if (!currentTextNode) {
                currentTextNode = {
                    type: 'text',
                    content: ''
                }
                top.children.push(token)
            }
            currentTextNode.content += token.constructor
        }
    }

    // -----begin
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
    // --- end
    const template = stack[0].children.filter(e => e.tagName === 'template')[0]
    // const rootElement = template.children.filter(e => e.type === 'element')[0]
    function generateCode (node) {
        if (node.type === 'element') {
            console.log(node)
        }
    }
    return ''
}
