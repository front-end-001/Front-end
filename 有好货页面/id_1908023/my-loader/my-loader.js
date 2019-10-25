module.exports = function (source, map) {
  const sourceArr = source.split('');

  // 没有任何一个方式可以表示 EOF，所以用Symble的唯一性来表示
  const EOF = Symbol('EOF');

  let currentToken = null;
  let currentAttribute = null;

  function emit(type, content) {
    console.log(type, content);
  }

  // 初始状态是data状态，即什么都没有的状态
  function data(c) {
    // 进入到 data 状态后，就开始分析第一个字符
    if (c === '<') {
      // 如果第一个字符是 <，那么改变状态，转到 tagOpen 状态，就离开了当前 data 状态
      return tagOpen;
    } else if (c === 'EOF') {
      emit('EOF', c);
      return ;
    } else {
      emit({
        type: 'Text', 
        content: c
      });
    }
  }

  function tagOpen(c) {
    if (c === '/') {
      return endTagOpen;
    } else if (c.match(/[a-zA-Z]/)) {
      currentToken = {
        type: 'startTag',
        tagName: '',
      }
      // reconsume 再一次
      return tagName(c);
    }
  }

  function tagName(c) {
    if (c.match(/[\t\n\f]/)) {
      return beforeAtrributeName;
    } else if (c === '/') {
      return selfClosingStartTag;
    } else if (c.match(/[A-Z]/)) {
      currentToken.tagName += c.toLowerCase();
      return tagName;
    } else if (c === '>') {
      emit(currentToken);
      currentToken = null;
      return data;
    } else {
      currentToken.tagName += c;
      return tagName;
    }
  }
  
  function beforeAtrributeName(c) {
    if (c.match(/[\t\n\f]/)) {
      return beforeAtrributeName;
    } else if (c === '/' || c === '>' || c === EOF) {
      return afterAttributeName(c);
    } else if (c === '=') {
      
    } else {
      currentAttribute = {
        name: '',
        value: '',
      }
      return attributeName;
    }
  }

  function attributeName(c) {
    if (c.match(/[\t\n\f]/) || c === '/' || c === '>' || c === EOF) {
      return afterAttributeName(c);
    } else if (c === '=') {
      return beforeAttributeName;
    } else if (c === "\u0000") {
    } else if (c === "\"" || c === "\'" || c === "<") {

    } else {
      currentAttribute.name += c;
      return attributeName;
    }
  }

  function beforeAttributeValue(c) {
    if (c.match(/[\t\n\f]/) || c === '/' || c === '>' || c === EOF) {
      return beforeAttributeValue;
    } else if (c === "\"") {
      return doubleQuotedAttributeName;
    } else if (c === "\'") {
      return singleQuotedAttributeName;
    } else if (c === ">") {
      // return data;
    } else {
      return unquotedAttributeName(c);
    }
  }

  function doubleQuotedAttributeName(c) {

  }

  function singleQuotedAttributeName(c) {
    
  }
  
  function unquotedAttributeName(c) {
    
  }

  function afterAttributeName(c) {

  }
  
  function selfClosingStartTag(c) {
    if (c.match(/[\t\n\f]/)) {
      return beforeAtrributeName;
    } else if (c === '/') {
      return selfClosingStartTag;
    } else if (c.match(/[A-Z]/)) {
      currentToken.tagName += c.toLowerCase();
      return tagName;
    } else if (c === '>') {
      emit(currentToken);
      currentToken = null;
      return data;
    } else {
      currentToken.tagName += c;
      return tagName;
    }
  }

  // 设置状态机的初始状态，一个接收器
  let state = data;



  for (let c of sourceArr) {
    state = state(c);
  }

  state(EOF);

  return "`" + source + "`";
}