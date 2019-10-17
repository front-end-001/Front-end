/**
 * @file component-loader.js
 * 编写一个 loader  https://www.webpackjs.com/contribute/writing-a-loader/
 * 不要用es高级语法，否则还要为这个文件配babel-loader，因为这里是直接执行
 */

/**
 * @param {} source
 * @param {} map
 * @return {string}
 */
module.exports = function(source, map) {
  // console.log(source, map);
  source = source.split('');

  /* 语法解析部分 */

  let stack = [{
    type: 'document',
    children: []
  }];
  let currentTextNode = null;

  
  /**
   * @param  {object} token
   */
  function emit(token) {
    // console.log(type, content);
    let top = stack[stack.length - 1];
  
    // 开始标签
    if (token.type == 'startTag') {
      let element = {
        type: 'element',
        children: [],
        attributes: []
      };

      element.tagName = token.tagName;

      for (let p in token) {
        if (p != 'type' || p != 'tagName') {
          element.attributes.push({
            name: p,
            value: token[p]
          });
        }
      }

      top.children.push(element);

      if (!token.isSelfClosingTag) {
        stack.push(element);
      }

      currentTextNode = null;
    } else if (token.type == 'endTag') {
      if (top.tagName != token.tagName) {
        console.log(top.tagName, token.tagName);
        throw new Error("Tag start end doesn't match ");
      } else {
        stack.pop();
      }
      currentTextNode = null;
    } else if (token.type == 'text') {
      if (currentTextNode == null) {
        currentTextNode = {
          type: 'text',
          content: ''
        };
        top.children.push(token);
      }
      currentTextNode.content += token.content;
    }
  }


  /* 词法解析部分，将字符流转为token流 */

  const EOF = Symbol('EOF');

  let currentToken = null;

  let currentAttribute = null;

  //  Data state
  function data(c) {
    if (c == '<') {
      return tagOpen;
    } else if (c == EOF) {
      emit({
        type: 'EOF'
      });
      return;
    } else {
      // 文本节点，当作一个token提交
      emit({
        type: 'text',
        content: c
      });
      return data;
    }
  }

  // tagOpen状态
  function tagOpen(c) {
    if (c == '/') {
      return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
      currentToken = {
        type: 'startTag',
        tagName: ''
      };
      return tagName(c);
    } else {
      // 文本节点，当作一个token提交
      emit({
        type: 'text',
        content: c
      });
      return;
    }
  }

  // tagName state
  function tagName(c) {
    // '\n'.charcodeAt().toString(0)
    // javascript form feed  html四大空白
    if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
    } else if (c == '/') {
      // 自闭合标签
      return selfClosingStartTag
    } else if (c.match(/^[A-Z]$/)) {
      currentToken.tagName += c; //.toLowerCase();
      return tagName;
    } else if (c == '>') {
      // 标签名结束
      // emit之后，将currentToken清空
      emit(currentToken);
      return data;
    } else {
      currentToken.tagName += c;
      return tagName;
    }
  }

  // 状态机是线性的
  function beforeAttributeName(c) {
    // '\n'.charcodeAt().toString(0)
    // javascript form feed  html四大空白
    if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName
    } else if (c == '/' || c == '>' || c == EOF) {
      // after attribute name
      return afterAttributeName(c);
    } else if (c == '=') {
      // 暂不处理错误
    } else {
      currentAttribute = {
        name: '',
        value: ''
      };
      // reconsume
      return attributeName(c);
    }
  }

  // 状态机是线性的
  function afterAttributeName(c) {
    // '\n'.charcodeAt().toString(0)
    // javascript form feed  html四大空白
    if (c.match(/^[\t\n\f ]$/)) {
      // ignore
      return afterAttributeName;
    } else if (c == '/') {
      // after attribute name
      return selfClosingStartTag;
    } else if (c == '=') {
      // 暂不处理错误
      return beforeAttributeValue;
    } else if (c == '>') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    } else if (c == EOF) {

    } else {
      // 先把旧属性放上去
      currentToken[currentAttribute.name] = currentAttribute.value;
      // 然后创建新属性
      currentAttribute = {
        name: '',
        value: ''
      };
      // reconsume
      return attributeName(c);
    }
  }

  function attributeName(c) {
    // '\n'.charcodeAt().toString(0)
    // javascript form feed  html四大空白
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
      return afterAttributeName(c);
    } else if (c == '=') {
      return beforeAttributeValue;
    } else if (c == '\u0000') {
      // 暂不处理
    } else if (c == '"' || c == '\'' || c == '<') {
      // 暂不处理
    } else {
      currentAttribute.name += c;
      return attributeName;
    }
  }

  function beforeAttributeValue(c) {
    // '\n'.charcodeAt().toString(0)
    // javascript form feed  html四大空白
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
      return beforeAttributeValue;
    } else if (c == '"') {
      return  doubleQuotedAttributeValue;
    } else if (c == '\'') {
      return  singleQuotedAttributeValue;
    } else if (c == '>') {
      // 暂不处理
      // return data;
    } else {
      return unquotedAttributeValue(c);
    }
  }

  function doubleQuotedAttributeValue(c) {
    if (c == '"') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return afterQuotedAttributeValue;
    } else if (c == '\u0000') {

    } else if (c == EOF) {
      
    } else {
      currentAttribute.value += c;
      return doubleQuotedAttributeValue;
    }
  }

  function singleQuotedAttributeValue(c) {
    if (c == '\'') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return afterQuotedAttributeValue;
    } else if (c == '\u0000') {

    } else if (c == EOF) {
      
    } else {
      currentAttribute.value += c;
      return singleQuotedAttributeValue;
    }
  }

  function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      return beforeAttributeName;
    } else if (c == '/') {
      // 自闭合标签
      return selfClosingStartTag
    } else if (c == '>') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    } else if (c == EOF) {

    } else {
      currentAttribute.value += c;
      return doubleQuotedAttributeValue;
    }
  }

  function unquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
      currentToken[currentAttribute.name] = currentAttribute.value;
      return beforeAttributeName;
    } else if (c == '/') {
      // 自闭合标签
      currentToken[currentAttribute.name] = currentAttribute.value;
      return selfClosingStartTag
    } else if (c == '>') {
      currentToken[currentAttribute.name] = currentAttribute.value;
      emit(currentToken);
      return data;
    } else if (c == '\u0000') {

    } else if (c == '"' || c == '\'' || c == '<' || c == '=' || c == '`') {

    } else if (c == EOF) {
      
    } else {
      currentAttribute.value += c;
      return doubleQuotedAttributeValue;
    }
  }

  // Self-closing start tag state
  function selfClosingStartTag(c) {
    if (c == '>') {
      currentToken.isSelfClosingTag = true;
      emit(currentToken);
      return data;
    } else if (c == 'EOF') {

    } else {

    }
  }

  // End tag open state
  function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
      currentToken = {
        type: 'endTag',
        tagName: ''
      }
      return tagName(c);
    } else if (c == '>') {

    } else if (c == EOF) {

    } else {

    }
  }

  /* 执行 */

  let state = data;

  // console.log('state', state);

  for (let c of source) {
    // console.log(c, state.name);
    state = state(c);
  }

  state(EOF);

  // console.log(stack[0]);

  // let tree = stack[0];

  let template = stack[0].children.filter(e => e.tagName == 'template')[0];
  // console.log(template);

  let rootElement = template.children.filter(e => e.type == 'element')[0];

  // console.log(rootElement);

  // 生成js代码
  function generateCode(node) {
    console.log('node', node);
    if (node.type == 'element') {
      return (
`
element = new ${node.tagName};
${node.attributes.map(attr => `element.setAttribute(${JSON.stringify(attr.name)}, ${JSON.stringify(attr.value)})\n`).join('')}
if (stack.length > 0) {
  stack[stack.length - 1].appendChild(element);
}
stack.push(element);
${
  node.children ? node.children.map(child => generateCode(child)).join('') : ''
}
root = stack.pop();
`
      );
    }
    
    if (node.type == 'text') {
      return (
        `
        element = new Text(JSON.stringify(node.content));
        if (stack.length > 0) {
          stack[stack.length - 1].appendChild(element);
        }
        `
      );
    }
  }

  return `
import Div from './components/Div.js';
import TabView from './components/TabView.js';
import ScrollView from './components/ScrollView.js';
import RecommendListView from './components/RecommendListView.js';
import CarouselView from './components/CarouselView.js';
import FavoriteView from './components/FavoriteView.js';
import Wrapper from "./components/Wrapper.js";

let root = null;
let stack = [];
let element;
`
  + generateCode(rootElement)
  + 'export default root;\n';
}