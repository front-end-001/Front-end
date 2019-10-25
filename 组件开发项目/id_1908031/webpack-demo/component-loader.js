module.exports = function (source, map) {
	// source 目前是my.component中定义的东西
	source = source.split("");

	let stack = [{type: 'document', children: []}];
	let currentTextNode = null;


	function emit(token) {
		let top = stack[stack.length - 1];

		if (token.type === 'startTag') {
			let element = {
				type: 'element',
				children: [],
				attributes: []
			};

			element.tagName = token.tagName;

			for (let p in token) {
				if (p !== 'type' || p !== 'tagName') {
					element.attributes.push({
						name: p,
						value: token[p]
					});
				}
			}

			top.children.push(element);

			if (!token.isSelfClosing) {
				stack.push(element);
			}
			currentTextNode = null;
		} else if (token.type === 'endTag') {
			if (top.tagName !== token.tagName) {
				throw new Error("Tag start end doesn't match!");
			} else {
				stack.pop();
			}
		} else if(token.type === 'text'){
			if(currentTextNode === null){
				currentTextNode = {
					type: 'text',
					content: ''
				};
				top.children.push(token);
			}
			currentTextNode.content += token.content;
		}
	}


	/////////////////////////////////////////////////////

	// 状态机
	const EOF = Symbol("EOF");

	let currentToken = null;

	let currentAttribute = null;


	function data(c) {
		if (c === '<') {
			return tagOpen;
		} else if (c === EOF) {
			emit({
				type: 'EOF',
				content: c
			});
			return;
		} else {
			emit({
				type: 'text',
				content: c
			});
			return data;
		}
	}

	function tagOpen(c) {
		if (c === '/') {
			return endTagOpen;
		} else if (c.match(/^[a-zA-Z]$/)) {
			currentToken = {
				type: 'startTag',
				tagName: ''
			};
			return tagName(c);
		} else {
			emit({
				type: 'text',
				content: c
			});
			return;
		}
	}

	function tagName(c) {
		if (c.match(/^[\t\n\f ]$/)) {
			return beforeAttributeName;
		} else if (c === '/') {
			return selfClosingStartTag;
		} else if (c.match(/^[A-Z]$/)) {
			currentToken.tagName += c;
			return tagName;
		} else if (c === '>') {
			emit(currentToken);
			return data;
		} else {
			currentToken.tagName += c;
			return tagName;
		}
	}

	function beforeAttributeName(c) {
		if (c.match(/^[\t\n\f ]$/)) {
			return beforeAttributeName;
		} else if (c === '/' || c === '>' || c === EOF) {
			return afterAttributeName;
		} else if (c === '=') {

		} else {
			currentAttribute = {
				name: '',
				value: ''
			};
			return attributeName(c);
		}
	}

	function attributeName(c) {
		if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
			return afterAttributeName(c);
		} else if (c === '=') {
			return beforeAttributeValue;
		} else if (c === '\u0000') {

		} else if (c === '\'' || c === '"' || c === '<') {

		} else {
			currentAttribute.name += c;
			return attributeName;
		}
	}

	function beforeAttributeValue(c) {
		if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
			return beforeAttributeValue;
		} else if (c === '\'') {
			return singleQuotedAttributeValue;
		} else if (c === '"') {
			return doubleQuotedAttributeValue;
		} else if (c === '>') {
			// return data;
		} else {
			return UnquotedAttributeValue(c);
		}
	}

	function singleQuotedAttributeValue(c) {
		if (c === '\'') {
			currentToken[currentAttribute.name] = currentAttribute.value;
			return afterQuotedAttributeValue;
		} else if (c === '\u0000') {

		} else if (c === EOF) {

		} else {
			currentAttribute.value += c;
			return singleQuotedAttributeValue;
		}
	}

	function doubleQuotedAttributeValue(c) {
		if (c === '"') {
			currentToken[currentAttribute.name] = currentAttribute.value;
			return afterQuotedAttributeValue;
		} else if (c === '\u0000') {

		} else if (c === EOF) {

		} else {
			currentAttribute.value += c;
			return doubleQuotedAttributeValue;
		}
	}

	function afterQuotedAttributeValue(c) {
		if (c.match(/^[\t\n\f ]$/)) {
			return beforeAttributeName;
		} else if (c === '/') {
			return selfClosingStartTag;
		} else if (c === '>') {
			currentToken[currentAttribute.name] = currentAttribute.value;
			return data;
		} else if (c === EOF) {

		} else {
			currentAttribute.value += c;
			return doubleQuotedAttributeValue;
		}
	}

	function UnquotedAttributeValue(c) {
		if (c.match(/^[\t\n\f ]$/)) {
			currentToken[currentAttribute.name] = currentAttribute.value;
			return beforeAttributeName;
		} else if (c === '/') {
			currentToken[currentAttribute.name] = currentAttribute.value;
			return selfClosingStartTag;
		} else if (c === '>') {
			currentToken[currentAttribute.name] = currentAttribute.value;
			emit(currentToken);
			return data;
		} else if (c === '\u0000') {

		} else if (c === '"' || c === '\'' || c === '<' || c === '=' || c === '`') {

		} else if (c === EOF) {

		} else {
			currentAttribute.value += c;
			return doubleQuotedAttributeValue;
		}
	}

	function selfClosingStartTag(c) {
		if (c === '>') {
			currentToken.isSelfClosing = true;
			emit(currentToken);
			return data;
		} else if (c === 'EOF') {

		} else {

		}
	}

	function endTagOpen(c) {
		if (c.match(/^[a-zA-Z]$/)) {
			currentToken = {
				type: 'endTag',
				tagName: ''
			};
			return tagName(c);
		} else if (c === '>') {

		} else if (c === EOF) {

		} else {

		}
	}

	function afterAttributeName(c) {
		if (c.match(/^[\t\n\f ]$/)) {
			return afterAttributeName;
		} else if (c === '/') {
			return selfClosingStartTag;
		} else if (c === '=') {
			return beforeAttributeValue;
		} else if (c === '>') {
			currentToken[currentAttribute.name] = currentAttribute.value;
			emit(currentToken);
			return data;
		} else if (c === EOF) {

		} else {
			currentToken[currentAttribute.name] = currentAttribute.value;
			currentAttribute = {
				name: '',
				value: ''
			};
			return attributeName(c);
		}
	}

	///////////////////////////////////////////////////////////////


	let state = data;


	for (let c of source) {
		state = state(c);
	}

	state(EOF);

	let tree = stack[0];
	let template = tree.children.filter( e => e.tagName === 'template')[0];

	let rootElement = template.children.filter( e => e.type === 'element')[0];


	function generateCode(node) {
		if(node.type === 'element'){
			return (
				`
				let element = new ${node.tagName};
				${element.attributes.map(attr => `element.setAttribute(${JSON.stringify(attr.name)}, ${JSON.stringify(attr.value)})`).join("")}
				if(stack.length > 0){
					stack[stack.length - 1].appendChild(element)
				}
				stack.push(element);
				${node.children ? node.children.map(child => generateCode(child)).join("") : ''}
				stack,pop()
				`
			);
		} else if(node.type === 'text') {
			return (
				`
				let element = new Text(${JSON.stringify(node.content)});
				if(stack.length > 0){
					stack[stack.length - 1].appendChild(element)
				}
				`
			)
		}
	}

	return "`" + source + "`";
};
