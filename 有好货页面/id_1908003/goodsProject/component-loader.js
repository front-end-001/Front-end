module.exports = function(source, map) {
  console.log(source);
  const sourceChart = source.split('');
  const EOF = Symbol('EOF');
  let currentToken = null;
  let currentAttribute = null;

  function emit(c, b) {
    debugger;
    console.log(c, b);
  }

  function data(c) {
    if (c === '<') {
      return tagOpen;
    }
    if (c === "EOF") {
      emit('EOF', c);
      return '';
    }
    emit({
      type: 'Text',
      content: c,
    });
  }

  function tagOpen(c) {
    if (c === '<') {
      return endTagOpen;
    }
    if (c.match(/^[a-zA-Z]$/)) {
      currentToken = {
        type: 'startTag',
        tagName: '',
      }
      return tagName;
    }
  }

  function tagName(c) {
    if (c.match(/^[t/n/f]/)) {
      return beforeAttrbuteName;
    }
    if (c === '/') {
      return selfClosingStartTag;
    }
    if (c.match(/^[A-Z]/)) {
      currentToken.tagName += c.toLower();
      return;
    }    
    if (c === '>') {
      emit(currentToken);
      currentToken = null;
      return data;
    }
    currentToken.tagName += c;
  }

  function beforeAttrbuteName(c) {
    if (c.match(/^[t/n/f]/)) {
      return beforeAttrbuteName;
    }
    if (c === '/' || c === '>' || c === EOF) {
      return afterAttributeName(c)
    }
    if (c === '=') {
      // error
      return;
    }
    currentAttribute = {
      name: '',
      value: '',
    }
    return attributeName;
  }

  function attributeName(c) {
    if (c.match(/^[t/n/f]/) || c === '/' || c === '>' || c === EOF) {
      return afterAttrbuteName;
    }
    if (c === '=') {
      return beforeAttributeValue;
    }
    if (c === '\u0000') {
      return
    }
    if (c === '"' || c === "'" || c === '<') {
      return
    }
    currentAttribute.name += c;
  }

  function beforeAttributeValue(c) {
    if (c.match(/^[t/n/f]/) || c === '/' || c === '>' || c === EOF) {
      return beforeAttributeValue;
    }
    if (c === '"') {
      return doubleQuotedAttributeValue;
    }
    if (c === "'") {
      return singleQuotedAttributeValue;
    }
    if (c === '>') {
      return data;
    }
    return unquotedAttributeValue;
  }

  function doubleQuotedAttributeValue(c) {
    if (c === '"') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return afterQuotedAttributeValue;
    }
    if (c === '\u0000') {
      return
    }
    if (c === EOF) {
      return
    }

    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }

  function singleQuotedAttributeValue(c) {
    if (c === "'") {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return afterQuotedAttributeValue;
    }
    if (c === '\u0000') {
      return
    }
    if (c === EOF) {
      return
    }

    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }

  function afterQuotedAttributeValue(c) {
    if (c.match(/^[t/n/f]/)) {
      return beforeAttrbuteName;
    }
    if (c === '/') {
      return selfClosingStartTag;
    }
    if (c === '>') {
      return data;
    }
  }

  // todo:
  function unquotedAttributeValue(c) {
    if (c.match(/^[t/n/f]/)) {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return beforeAttrbuteName;
    }
    if (c === '/') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return selfClosingStartTag;
    }
    if (c === '>') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    }
    if (c === '\u0000') {
      return
    }
    if (c === '"' || c === '\'' || c === '<' || c === '=' || c === '`') {
      return
    }
    if (c === EOF) {
      return
    }
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }

  function selfClosingStartTag(c) {
    if (c === '>') {
      currentToken.isSelfClosing = true;
      emit(currentToken);
      return data;
    }
    if (c === EOF) {
      return
    }
  }

  function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
      currentToken =  {
        type: 'endTag',
        tagName: '',
      }
      return tagName;
    }
    if (c === '>') {
      return;
    }

    if (c === EOF) {
      return;
    }
  }

  let state = data;
  for (let chart of sourceChart) {
    state = state(chart);
  }

  state(EOF);
  return '"' + source + '"';
};