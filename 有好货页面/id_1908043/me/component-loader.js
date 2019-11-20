module.exports = function (source, map) {
    console.log(source)

    let currentAttribute = null

    function data(c) {
        if (c == '<') {
            return tagOpen;
        }
        if (c == '/') {
            return tagName;
        } else {
            emit('Text', c)
            return;
        }
    }

    function tagOpen(c) {
        if (c == '/') {
            return endTagOpen;
        } else if (c.match(/^[a-zA-Z]$/)) {
            currentTokn = {
                type: 'startTag',
                tagName: ''
            }

            return tagName(c);
        } else {
            emit('Text', c)
            return;
        }
    }

    function tagName(c) {
        if (c.match(/^[\t\n\f]$/)) {
            return beforeAttributeName;
        } else if (c == '/') {
            return selfClosingStartTag;
        } else if (c.match(/^[a-zA-Z]$/)) {
            currentTokn.tagName += c.toLowerCase();
            return tagName;
        } else if (c == '>') {
            emit(currentTokn);
            currentTokn = null;
            return data;
        } else {
            currentTokn.tagName += c;
            return tagName;
        }
    }

    function beforeAttributeName(c) {
        if (c.match(/^[\t\n\f]$/)) {
            return beforeAttributeName;
        } else if (c == '/' || c == '>' || c == EOF) {
            return afterAttributeName(c);
        } else if (c == '=') {

        } else {
            currentAttribute = {
                name: '',
                value: ''
            }
            return attributeName
        }
    }

    function attributeName(c) {
        if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
            return afterAttributeName(c);
        } else if (c == '=') {
            return beforeAttributeValue;
        } else if (c == '\u0000') {

        } else if (c == "\"" || c == "'" || c == "<") {

        } else {
            attributeName += c
            return attributeName
        }
    }

    return '`' + source + '`'
}