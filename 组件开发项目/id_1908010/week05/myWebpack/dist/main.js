/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Div.js":
/*!****************!*\
  !*** ./Div.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Div; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n * @Author: 玉皇大亮\n * @since: 2019-09-07 10:16:56\n * @LastAuthor: Do not edit\n * @lastTime: 2019-09-08 15:15:16\n * @message: 组件设计 健壮 高可用 \n */\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Div =\n/*#__PURE__*/\nfunction () {\n  function Div(config) {\n    _classCallCheck(this, Div);\n\n    //config的设计\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this.didCreated();\n  }\n\n  _createClass(Div, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.didMounted();\n    } // lifeCycle\n\n  }, {\n    key: \"didCreated\",\n    value: function didCreated() {\n      this.root = document.createElement('div');\n    }\n  }, {\n    key: \"didMounted\",\n    value: function didMounted() {//绑定事件\n    }\n  }, {\n    key: \"didUnmounted\",\n    value: function didUnmounted() {}\n  }, {\n    key: \"didUpdate\",\n    value: function didUpdate() {}\n  }, {\n    key: \"didDestroyed\",\n    value: function didDestroyed() {//无法实现\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    } // 设计Attribute\n\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == 'style') {\n        return this.root.getAttribute('style');\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'style') {\n        this.root.setAttribute('style', value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      //this[EVENT_SYMBOL][type] = listener //不可以这样写，事件多头机制 不允许！！！\n      if (!this[EVENT_SYMBOL][type]) {\n        // this[EVENT_SYMBOL][type] = []\n        this[EVENT_SYMBOL][type] = new Set();\n      } // this[EVENT_SYMBOL][type].push(listener)\n\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return; //宽松设计\n        // throw new Error('no such event') //严格设计\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener); //利用set的优势\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this); //event() 也可以，但这样更严谨，如果不用箭头函数，可以正确找到this\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Div;\n}();\n\n\n\n//# sourceURL=webpack:///./Div.js?");

/***/ }),

/***/ "./TeacherTab.js":
/*!***********************!*\
  !*** ./TeacherTab.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tab; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n * @Author: 玉皇大亮\n * @since: 2019-09-07 10:16:56\n * @LastAuthor: Do not edit\n * @lastTime: 2019-09-08 15:29:47\n * @message: 组件设计 健壮 高可用 \n */\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Tab =\n/*#__PURE__*/\nfunction () {\n  //是否可以抽象出来一部分作为基类？\n  function Tab(config) {\n    _classCallCheck(this, Tab);\n\n    //config的设计\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); //如果要设计toString，这样不会去找原型链\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].headers = [];\n    this.didCreated();\n  }\n\n  _createClass(Tab, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.didMounted();\n    } // lifeCycle\n\n  }, {\n    key: \"didCreated\",\n    value: function didCreated() {\n      this.root = document.createElement('div');\n      this.headerContainer = document.createElement('div');\n      this.contentContainer = document.createElement('div');\n      this.contentContainer.style.height = '100%';\n      this.root.appendChild(this.headerContainer);\n      this.root.appendChild(this.contentContainer);\n    }\n  }, {\n    key: \"didMounted\",\n    value: function didMounted() {//绑定事件\n    }\n  }, {\n    key: \"didUnmounted\",\n    value: function didUnmounted() {}\n  }, {\n    key: \"didUpdate\",\n    value: function didUpdate() {}\n  }, {\n    key: \"didDestroyed\",\n    value: function didDestroyed() {//无法实现\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      var title = child.getAttribute('tab-title') || '';\n      this[PROPERTY_SYMBOL].headers.push(title);\n      var header = document.createElement('header');\n      header.innerText = title;\n      this.headerContainer.appendChild(header);\n      child.appendTo(this.contentContainer);\n\n      for (var i = 0; i < this.contentContainer.children.length; i++) {\n        this.contentContainer.children[i].style.width = \"100%\";\n        this.contentContainer.children[i].style.height = \"100%\";\n        this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n    } // 设计Attribute\n\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == 'style') {\n        return this.root.getAttribute('style');\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'style') {\n        this.contentContainer.setAttribute('style', value);\n        this.contentContainer.style.whiteSpace = 'nowrap';\n        this.contentContainer.style.overflow = 'hidden';\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    } // demo\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      //this[EVENT_SYMBOL][type] = listener //不可以这样写，事件多头机制 不允许！！！\n      if (!this[EVENT_SYMBOL][type]) {\n        // this[EVENT_SYMBOL][type] = []\n        this[EVENT_SYMBOL][type] = new Set();\n      } // this[EVENT_SYMBOL][type].push(listener)\n\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return; //宽松设计\n        // throw new Error('no such event') //严格设计\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener); //利用set的优势\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this); //event() 也可以，但这样更严谨，如果不用箭头函数，可以正确找到this\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }, {\n    key: \"width\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].width;\n    },\n    set: function set(value) {\n      return this[PROPERTY_SYMBOL].width = value; //return 为了和等号的语义相同\n    }\n  }]);\n\n  return Tab;\n}();\n\n\n\n//# sourceURL=webpack:///./TeacherTab.js?");

/***/ }),

/***/ "./component.js":
/*!**********************!*\
  !*** ./component.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Component; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/*\n * @Author: 玉皇大亮\n * @since: 2019-09-07 10:16:56\n * @LastAuthor: Do not edit\n * @lastTime: 2019-09-07 18:52:29\n * @message: 组件设计 健壮 高可用 \n */\n// method1\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Component =\n/*#__PURE__*/\nfunction () {\n  //是否可以抽象出来一部分作为基类？\n  function Component(config) {\n    _classCallCheck(this, Component);\n\n    //config的设计\n    //js 改变\n    this[PROPERTY_SYMBOL] = Object.create(null); //html 改变\n\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); //如果要设计toString，这样不会去找原型链\n    //外部传入\n\n    this[EVENT_SYMBOL] = Object.create(null); //内部变量\n\n    this[STATE_SYMBOL] = Object.create(null); // this.onWidthChange = null;\n\n    this.didCreated();\n  }\n\n  _createClass(Component, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.didMounted();\n    } // lifeCycle\n\n  }, {\n    key: \"didCreated\",\n    value: function didCreated() {\n      this.root = document.createElement('div');\n      this.root.style.width = '500px';\n      this.root.style.height = '500px'; // this.root.style.backgroundColor = 'blue'\n\n      this[STATE_SYMBOL].h = 0; //色相\n\n      this.root.style.backgroundColor = \"hsl(\".concat(this[STATE_SYMBOL].h, \", 60%, 70%)\"); // 色相 纯度 明度\n    }\n  }, {\n    key: \"didMounted\",\n    value: function didMounted() {\n      var _this = this;\n\n      //绑定事件\n      this.root.addEventListener('click', function () {\n        _this[STATE_SYMBOL].h += 30;\n        _this.root.style.backgroundColor = \"hsl(\".concat(_this[STATE_SYMBOL].h, \", 60%, 70%)\");\n      });\n    }\n  }, {\n    key: \"didUnmounted\",\n    value: function didUnmounted() {}\n  }, {\n    key: \"didUpdate\",\n    value: function didUpdate() {}\n  }, {\n    key: \"didDestroyed\",\n    value: function didDestroyed() {//无法实现\n    }\n  }, {\n    key: \"getAttribute\",\n    // 设计Attribute\n    value: function getAttribute(name) {\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      // 如果想名字分流 ifelse or switch\n      if (name == 'width') {\n        this.width = value; // html的单向同步设计\n        // if (this.onWidthChange) {\n        //     this.onWidthChange();\n        // }\n        // this.triggerEvent('widthChange') //如果想在设置attr时候，调用触发事件，可以这样用\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    } // demo\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      //this[EVENT_SYMBOL][type] = listener //不可以这样写，事件多头机制 不允许！！！\n      if (!this[EVENT_SYMBOL][type]) {\n        // this[EVENT_SYMBOL][type] = []\n        this[EVENT_SYMBOL][type] = new Set();\n      } // this[EVENT_SYMBOL][type].push(listener)\n\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return; //宽松设计\n        // throw new Error('no such event') //严格设计\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener); //利用set的优势\n      // let events = this[EVENT_SYMBOL][type];\n      // for(let i = 0; i < events.length; i++) {\n      //     if (events[i] == listener) {\n      //         //events.splice(i, 1); // O(n) 操作\n      //         let tmp = events[i]; //更好的设计，放到数组最后，然后pop()\n      //         event[i] = events[events.length - 1];\n      //         events[events.length - 1] = tmp;\n      //         events.pop();\n      //     }\n      // }\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this); //event() 也可以，但这样更严谨，如果不用箭头函数，可以正确找到this\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"log\",\n    value: function log() {\n      console.log('width:', this.width);\n    }\n  }, {\n    key: \"property\",\n    get: function get() {\n      return this.property;\n    },\n    set: function set(value) {\n      this.property = value;\n    }\n  }, {\n    key: \"width\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].width;\n    },\n    set: function set(value) {\n      return this[PROPERTY_SYMBOL].width = value; //return 为了和等号的语义相同\n    }\n  }]);\n\n  return Component;\n}();\n\n\n\n//# sourceURL=webpack:///./component.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib.js */ \"./lib.js\");\n\nconsole.log(\"bac\");\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib.js":
/*!****************!*\
  !*** ./lib.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component.js */ \"./component.js\");\n/* harmony import */ var _TeacherTab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TeacherTab.js */ \"./TeacherTab.js\");\n/* harmony import */ var _Div_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Div.js */ \"./Div.js\");\n\n\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class(); // console.log(arguments);\n  // const array = Array.from(attributes)\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n    object.appendChild(child);\n  }\n\n  return object;\n} // let a = <Component width=\"100\"></Component>\n\n\nvar a = myCreate(_TeacherTab_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  style: \"height: 500px; width: 500px;\"\n}, myCreate(_Div_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"\\u63A8\\u8350\",\n  style: \"background-color: lightblue;\"\n}), myCreate(_Div_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"\\u6709\\u8DA3\\u7684\\u5E97\",\n  style: \"background-color: red;\"\n}), myCreate(_Div_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"\\u54C1\\u724C\\u65B0\\u5E97\",\n  style: \"background-color: yellow;\"\n}), myCreate(_Div_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"\\u53D1\\u73B0\",\n  style: \"background-color: purple;\"\n}));\na.appendTo(document.body);\n\n//# sourceURL=webpack:///./lib.js?");

/***/ })

/******/ });