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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Div.js":
/*!********************!*\
  !*** ./src/Div.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Div; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar Div =\n/*#__PURE__*/\nfunction () {\n  function Div(config) {\n    _classCallCheck(this, Div);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); //存attribute用Object.create(null)，与其他代码没有关系\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(Div, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Div;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Div.js?");

/***/ }),

/***/ "./src/Scroll.js":
/*!***********************!*\
  !*** ./src/Scroll.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ScrollView; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar ScrollView =\n/*#__PURE__*/\nfunction () {\n  function ScrollView(config) {\n    _classCallCheck(this, ScrollView);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); //存attribute用Object.create(null)，与其他代码没有关系\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(ScrollView, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.root.addEventListener(\"touchmove\", function (e) {\n        e.cancelBubble = true;\n        e.stopImmediatePropagation();\n      }, {\n        passive: false\n      });\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return ScrollView;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Scroll.js?");

/***/ }),

/***/ "./src/Tab.js":
/*!********************!*\
  !*** ./src/Tab.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TabView; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar TabView =\n/*#__PURE__*/\nfunction () {\n  function TabView(config) {\n    _classCallCheck(this, TabView);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); //存attribute用Object.create(null)，与其他代码没有关系\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].headers = [];\n    this.created();\n  }\n\n  _createClass(TabView, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.root.style.display = \"flex\";\n      this.headerContainer = document.createElement(\"div\");\n      this.contentContainer = document.createElement(\"div\");\n      this.contentContainer.style.whiteSpace = \"nowrap\";\n      this.contentContainer.style.overflow = \"hidden\";\n      this.contentContainer.style.flex = \"1\";\n      this.headerContainer.style.height = \"93px\";\n      this.root.appendChild(this.headerContainer);\n      this.root.appendChild(this.contentContainer);\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      var title = child.getAttribute(\"tab-title\") || \"\";\n      this[PROPERTY_SYMBOL].headers.push(title);\n      var header = document.createElement(\"div\");\n      header.innerText = title;\n      header.style.display = \"inline-block\";\n      header.style.height = \"93px\";\n      header.style.fontFamily = \"PingFang SC\";\n      header.style.fontSize = \"46px\";\n      header.style.margin = \"20px 35px 0 35px\";\n      this.headerContainer.appendChild(header);\n      child.appendTo(this.contentContainer);\n\n      for (var i = 0; i < this.contentContainer.children.length; i++) {\n        this.contentContainer.children[i].style.width = \"100%\";\n        this.contentContainer.children[i].style.height = \"100%\";\n        this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n        this.root.style.display = \"flex\";\n        this.root.style.flexDirection = \"column\";\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return TabView;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Tab.js?");

/***/ }),

/***/ "./src/Text.js":
/*!*********************!*\
  !*** ./src/Text.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Text; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar Text =\n/*#__PURE__*/\nfunction () {\n  function Text(config) {\n    _classCallCheck(this, Text);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); //存attribute用Object.create(null)，与其他代码没有关系\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.text = config || \"\";\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(Text, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.root.innerText = this.text;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Text;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Text.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tab.js */ \"./src/Tab.js\");\n/* harmony import */ var _Scroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Scroll.js */ \"./src/Scroll.js\");\n/* harmony import */ var _Div_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Div.js */ \"./src/Div.js\");\n/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Text.js */ \"./src/Text.js\");\n\n\n\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class();\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child === \"string\") {\n      object.appendChild(new _Text_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"](child));\n    } else {\n      object.appendChild(child);\n    }\n  }\n\n  return object;\n}\n\nvar c = myCreate(_Tab_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n  style: \"width:100%;height:100%;\"\n}, myCreate(_Scroll_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"推荐\",\n  style: \"-webkit-overflow-scrolling:touch;overflow:scroll;background-color:lightblue;white-space:normal;font-size:50px\"\n}, \"test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test\"), myCreate(_Scroll_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"有趣的店\",\n  style: \"background-color:lightgreen\"\n}), myCreate(_Scroll_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"品牌新店\",\n  style: \"background-color:red\"\n}));\nc.appendTo(document.body);\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });