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

/***/ "../component/Div.js":
/*!***************************!*\
  !*** ../component/Div.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Div; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROTERTY_SYMBOL = Symbol('width');\nvar ATTRIBUTE_SYMBOL = Symbol('attrubute');\nvar STATE_SYMBOL = Symbol('state');\nvar EVENT_SYMBOL = Symbol('event');\n\nvar Div =\n/*#__PURE__*/\nfunction () {\n  function Div() {\n    _classCallCheck(this, Div);\n\n    this[PROTERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROTERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(Div, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child;\n    } // lifecycle\n\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement('div'); // this[STATE_SYMBOL].hue = 0;\n      // this.root.style.backgroundColor = `hsl(${this[STATE_SYMBOL].hue}, 100%, 50%)`;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"updated\",\n    value: function updated() {}\n  }, {\n    key: \"beforeDestroyed\",\n    value: function beforeDestroyed() {}\n  }, {\n    key: \"desroyed\",\n    value: function desroyed() {} // 无法实现\n    // method\n    // property\n\n  }, {\n    key: \"getAttribute\",\n    // attribute\n    value: function getAttribute(name) {\n      if (name == 'style') {\n        return this.root.setAttribute('style', value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'style') {\n        this.root.setAttribute('style', value);\n        this.root.style.whiteSpace = 'nowrap';\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventLister\",\n    value: function addEventLister(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          // event.call(this);\n          event();\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROTERTY_SYMBOL].children;\n    }\n  }, {\n    key: \"width\",\n    set: function set(value) {\n      return this[PROTERTY_SYMBOL].width = value;\n    }\n  }]);\n\n  return Div;\n}();\n\n\n\n//# sourceURL=webpack:///../component/Div.js?");

/***/ }),

/***/ "../component/Tab.js":
/*!***************************!*\
  !*** ../component/Tab.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tab; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROTERTY_SYMBOL = Symbol('width');\nvar ATTRIBUTE_SYMBOL = Symbol('attrubute');\nvar STATE_SYMBOL = Symbol('state');\nvar EVENT_SYMBOL = Symbol('event');\n\nvar Tab =\n/*#__PURE__*/\nfunction () {\n  function Tab() {\n    _classCallCheck(this, Tab);\n\n    this[PROTERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROTERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(Tab, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n\n      for (var i = 0; i < this.root.children.length; i++) {\n        this.root.children[i].style.width = \"100%\";\n        this.root.children[i].style.height = \"100%\";\n        this.root.children[i].style.display = 'inline-block';\n      }\n    } // lifecycle\n\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement('div');\n      this[STATE_SYMBOL].hue = 0;\n      this.root.style.backgroundColor = \"hsl(\".concat(this[STATE_SYMBOL].hue, \", 100%, 50%)\");\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"updated\",\n    value: function updated() {}\n  }, {\n    key: \"beforeDestroyed\",\n    value: function beforeDestroyed() {}\n  }, {\n    key: \"desroyed\",\n    value: function desroyed() {} // 无法实现\n    // method\n    // property\n\n  }, {\n    key: \"getAttribute\",\n    // attribute\n    value: function getAttribute(name) {\n      if (name == 'style') {\n        return this.root.setAttribute('style', value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'style') {\n        this.root.setAttribute('style', value); // this.root.style.display = 'flex';\n        // this.root.style.overflow = 'hidden';\n        // this.root.style.flexWrap = 'nowrap';\n\n        this.root.style.whiteSpace = 'nowrap';\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventLister\",\n    value: function addEventLister(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          // event.call(this);\n          event();\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROTERTY_SYMBOL].children;\n    }\n  }, {\n    key: \"width\",\n    set: function set(value) {\n      return this[PROTERTY_SYMBOL].width = value;\n    }\n  }]);\n\n  return Tab;\n}();\n\n\n\n//# sourceURL=webpack:///../component/Tab.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib.js */ \"./lib.js\");\n\nvar a = 'asdadds'; // console.log(a);\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./lib.js":
/*!****************!*\
  !*** ./lib.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_Tab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/Tab.js */ \"../component/Tab.js\");\n/* harmony import */ var _component_Div_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../component/Div.js */ \"../component/Div.js\");\n// import Carousel from '../component/Carousel.js';\n\n\n\nfunction myCreate(Class, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  console.log(children);\n  var object = new Class();\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n    object.appendChild(child);\n  }\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  return object;\n} // class Component {\n// }\n\n\nvar c = myCreate(_component_Tab_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n  style: \"width:300px;height:300px\"\n}, myCreate(_component_Div_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  style: \"background-color:lightblue\"\n}), myCreate(_component_Div_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  style: \"background-color:lightgreen\"\n}), myCreate(_component_Div_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  style: \"background-color:pink\"\n}));\nc.appendTo(document.body);\n\n//# sourceURL=webpack:///./lib.js?");

/***/ })

/******/ });