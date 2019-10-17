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
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./myDiv.js":
/*!******************!*\
  !*** ./myDiv.js ***!
  \******************/
/*! exports provided: MyDiv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MyDiv\", function() { return MyDiv; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar MyDiv =\n/*#__PURE__*/\nfunction () {\n  function MyDiv() {\n    _classCallCheck(this, MyDiv);\n\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(MyDiv, [{\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name === \"style\") {\n        return this._container.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name === \"style\") {\n        this._container.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this._container);\n      this.mounted();\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this[PROPERTY_SYMBOL].children.push(child); // 把header单独拿出来，作为TAB的title，不用独立设置div\n\n      var title = child.getAttribute(\"tab-title\") || \"default-title\";\n      this[PROPERTY_SYMBOL].headers.push(title);\n      var header = document.createElement(\"header\");\n      header.innerText = title;\n\n      this._headerContainer.push(header); // 把div设置成contentContainer的子元素\n\n\n      child.appendTo(this._contentContainer); // set css style;\n\n      child.style.width = \"100%\";\n      child.style.height = \"100%\";\n      child.style.display = \"inline-block\";\n      /* //  这里其实没有必要循环设置，唯一的好处就是怕被别的地方覆盖\n      for(let i = 0; i < this._contentContainer.children.length; i ++) {\n          this.contentContainer.children[i].style.width = \"100%\";\n          this.contentContainer.children[i].style.height = \"100%\";\n          this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n      */\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this._container = document.createElement(\"div\");\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return MyDiv;\n}();\n\n//# sourceURL=webpack:///./myDiv.js?");

/***/ }),

/***/ "./myTab.js":
/*!******************!*\
  !*** ./myTab.js ***!
  \******************/
/*! exports provided: MyTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MyTab\", function() { return MyTab; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar MyTab =\n/*#__PURE__*/\nfunction () {\n  function MyTab() {\n    _classCallCheck(this, MyTab);\n\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].headers = [];\n  }\n\n  _createClass(MyTab, [{\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name === \"style\") {\n        return this._container.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name === \"style\") {\n        this._container.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      this.created();\n      element.appendChild(this._container);\n      this.mounted();\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this[PROPERTY_SYMBOL].children.push(child); // 把header单独拿出来，作为TAB的title，不用独立设置div\n\n      var title = child.getAttribute(\"tab-title\") || \"default-title\";\n      this[PROPERTY_SYMBOL].headers.push(title);\n      var header = document.createElement(\"header\");\n      header.innerText = title;\n\n      this._headerContainer.push(header); // 把div设置成contentContainer的子元素\n\n\n      child.appendTo(this._contentContainer); // set css style;\n\n      child.style.width = \"100%\";\n      child.style.height = \"100%\";\n      child.style.display = \"inline-block\";\n      /* //  这里其实没有必要循环设置，唯一的好处就是怕被别的地方覆盖\n      for(let i = 0; i < this._contentContainer.children.length; i ++) {\n          this.contentContainer.children[i].style.width = \"100%\";\n          this.contentContainer.children[i].style.height = \"100%\";\n          this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n      */\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this._container = document.createElement(\"div\");\n      this._headerContainer = document.createElement(\"div\");\n      this._contentContainer = document.createElement(\"div\");\n      this._contentContainer.style.whiteSpace = \"nowrap\";\n      this._contentContainer.style.overflow = \"hidden\";\n      this._contentContainer.style.height = \"100%\";\n\n      this._container.appendChild(this._headerContainer);\n\n      this._container.appendChild(this._contentContainer);\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return MyTab;\n}();\n\n//# sourceURL=webpack:///./myTab.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _myTab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./myTab.js */ \"./myTab.js\");\n/* harmony import */ var _myDiv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./myDiv.js */ \"./myDiv.js\");\n\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class();\n\n  for (var name in attributes) {\n    // 遍历属性\n    object.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n    // 遍历集合类元素，如array， set等\n    object.appendChild(child);\n  }\n\n  return object;\n}\n\nvar c = myCreate(_myTab_js__WEBPACK_IMPORTED_MODULE_0__[\"MyTab\"], {\n  style: \"width:100%, height:100%\"\n}, myCreate(_myDiv_js__WEBPACK_IMPORTED_MODULE_1__[\"MyDiv\"], {\n  \"tab-title\": \"推荐\",\n  style: \"background-color:lightblue;\"\n}), myCreate(_myDiv_js__WEBPACK_IMPORTED_MODULE_1__[\"MyDiv\"], {\n  \"tab-title\": \"有趣的店\",\n  style: \"background-color:lightgreen;\"\n}), myCreate(_myDiv_js__WEBPACK_IMPORTED_MODULE_1__[\"MyDiv\"], {\n  \"tab-title\": \"品牌新店\",\n  style: \"background-color:pink;\"\n}));\nc.appendTo(document.body);\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });