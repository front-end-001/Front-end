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
/******/ 	return __webpack_require__(__webpack_require__.s = "./shop/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./carousel/gesture/gesture.js":
/*!*************************************!*\
  !*** ./carousel/gesture/gesture.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar initGesture = function initGesture(main) {\n  // down - start move up - end\n  // 1. 抽象出鼠标移动拖拽的事件; 将移动端和pc端的抽象\n  // 2. 判断何时拖拽结束\n  // 3. 实现\"拖拽结束\"的逻辑\n  var start = function start(e, context) {\n    console.log('start', e.clientX, e.clientY);\n    context.startX = e.clientX;\n    context.startY = e.clientY;\n    context.isTap = true;\n    context.isPan = false;\n    context.flickTime = new Date();\n  };\n\n  var move = function move(e, context) {\n    console.log('move', e.clientX, e.clientY);\n    var dx = e.clientX - context.startX;\n    var dy = e.clientY - context.startY;\n\n    if (dx * dx + dy * dy > 100) {\n      context.isTap = false;\n\n      if (!context.isPan) {\n        if (Math.abs(dx) > Math.abs(dy)) {\n          context.isVertical = false;\n          context.isHorizontal = true;\n        } else {\n          context.isVertical = true;\n          context.isHorizontal = false;\n        }\n\n        var panstartE = new Event(\"panstart\");\n        panstartE.startX = context.startX;\n        panstartE.startY = context.startY;\n        main.dispatchEvent(panstartE);\n        context.isPan = true;\n      }\n    }\n\n    if (context.isPan) {\n      var panE = new Event(\"pan\");\n      panE.dx = dx;\n      panE.dy = dy;\n      panE.isHorizontal = context.isHorizontal;\n      panE.isVertical = context.isVertical;\n      main.dispatchEvent(panE);\n    }\n  };\n\n  var end = function end(e, context) {\n    if (context.isTap) {\n      main.dispatchEvent(new Event(\"tap\"));\n    }\n\n    var dx = e.clientX - context.startX,\n        dy = e.clientY - context.startY;\n    var v = Math.sqrt(dx * dx + dy * dy) / Date.now() - context.flickTime;\n\n    if (context.isPan && v > 0.3) {\n      context.isFlick = true;\n      var flickE = new Event(\"flick\");\n      main.dispatchEvent(flickE);\n    } else {\n      context.isFlick = false;\n    }\n\n    if (context.isPan) {\n      var panendE = new Event(\"panEnd\");\n      panendE.dx = dx;\n      panendE.dy = dy;\n      panendE.isFlick = context.isFlick;\n      panendE.isHorizontal = context.isHorizontal;\n      panendE.isVertical = context.isVertical;\n      main.dispatchEvent(panendE);\n      console.log('end pan', context.startX);\n    }\n  };\n\n  var cancel = function cancel(e, context) {\n    if (context.isPan) {\n      main.dispatchEvent(new Event(\"pancancel\"));\n    }\n  };\n\n  var mousemove = function mousemove(e) {\n    move(e, contexts[mouseSymbol]);\n  };\n\n  var mouseup = function mouseup(e) {\n    document.removeEventListener(\"mousemove\", mousemove);\n    document.removeEventListener(\"mouseup\", mouseup);\n    end(e, contexts[mouseSymbol]);\n    delete contexts[mouseSymbol];\n  };\n\n  var contexts = Object.create(null);\n  var mouseSymbol = Symbol(\"mouse\");\n\n  var mousedown = function mousedown(e) {\n    document.addEventListener(\"mousemove\", mousemove);\n    document.addEventListener(\"mouseup\", mouseup);\n    contexts[mouseSymbol] = Object.create(null);\n    start(e, contexts[mouseSymbol]);\n  };\n\n  main.addEventListener(\"mousedown\", mousedown);\n\n  var touchStart = function touchStart(e) {\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = e.changedTouches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  };\n\n  var touchmove = function touchmove(e) {\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n      for (var _iterator2 = e.changedTouches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _didIteratorError2 = true;\n      _iteratorError2 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n          _iterator2[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError2) {\n          throw _iteratorError2;\n        }\n      }\n    }\n  };\n\n  var touchend = function touchend(e) {\n    var _iteratorNormalCompletion3 = true;\n    var _didIteratorError3 = false;\n    var _iteratorError3 = undefined;\n\n    try {\n      for (var _iterator3 = e.changedTouches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _didIteratorError3 = true;\n      _iteratorError3 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n          _iterator3[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError3) {\n          throw _iteratorError3;\n        }\n      }\n    }\n  };\n\n  var touchcancel = function touchcancel(e) {\n    var _iteratorNormalCompletion4 = true;\n    var _didIteratorError4 = false;\n    var _iteratorError4 = undefined;\n\n    try {\n      for (var _iterator4 = e.changedTouches[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _didIteratorError4 = true;\n      _iteratorError4 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion4 && _iterator4[\"return\"] != null) {\n          _iterator4[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError4) {\n          throw _iteratorError4;\n        }\n      }\n    }\n  };\n\n  main.addEventListener(\"touchstart\", touchStart);\n  main.addEventListener(\"touchmove\", touchmove);\n  main.addEventListener(\"touchend\", touchend);\n  main.addEventListener(\"touchcancel\", touchcancel);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (initGesture);\n\n//# sourceURL=webpack:///./carousel/gesture/gesture.js?");

/***/ }),

/***/ "./shop/component/div.js":
/*!*******************************!*\
  !*** ./shop/component/ScrollContainer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ScrollContainer; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"property\");\n\nvar ScrollContainer =\n/*#__PURE__*/\nfunction () {\n  function ScrollContainer() {\n    _classCallCheck(this, ScrollContainer);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this.init();\n  }\n\n  _createClass(ScrollContainer, [{\n    key: \"init\",\n    value: function init() {\n      this.container = document.createElement('div');\n    }\n  }, {\n    key: \"appendTo\",\n    value: function appendTo(body) {\n      body.appendChild(this.container);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name === 'style') {\n        this.container.setAttribute('style', value);\n        return;\n      }\n\n      return this[ATTRIBUTE_SYMBOL].name = value;\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this[ATTRIBUTE_SYMBOL].name;\n    }\n  }]);\n\n  return ScrollContainer;\n}();\n\n\n\n//# sourceURL=webpack:///./shop/component/ScrollContainer.js?");

/***/ }),

/***/ "./shop/component/tab.js":
/*!*******************************!*\
  !*** ./shop/component/TabContainer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return TabContainer; });\n/* harmony import */ var _carousel_gesture_gesture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../carousel/gesture/gesture.js */ \"./carousel/gesture/gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"property\");\n\n\nvar TabContainer =\n/*#__PURE__*/\nfunction () {\n  function TabContainer() {\n    _classCallCheck(this, TabContainer);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this.init();\n  }\n\n  _createClass(TabContainer, [{\n    key: \"init\",\n    value: function init() {\n      this.container = document.createElement('div');\n      this.container.style.overflow = 'hidden';\n      this.container.style.whiteSpace = 'nowrap';\n      this.container.style.height = '100%';\n      this.headerContainer = document.createElement('div');\n      this.contentContainer = document.createElement('div');\n      this.container.appendChild(this.headerContainer);\n      this.container.appendChild(this.contentContainer);\n      return true;\n    }\n  }, {\n    key: \"appendTo\",\n    value: function appendTo(body) {\n      body.appendChild(this.container);\n    }\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.contentContainer);\n      console.log(this.contentContainer);\n\n      for (var i = 0; i < this.contentContainer.children.length; i++) {\n        this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n\n      var title = child.getAttribute('title');\n      var header = document.createElement('div');\n      header.innerText = title;\n      this.headerContainer.appendChild(header);\n      this.headers.push(header);\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name === 'style') {\n        this.container.setAttribute('style', value);\n        this.container.style.overflow = 'hidden';\n        this.container.style.whiteSpace = 'noWrap';\n        this.container.style.height = '100%';\n        return;\n      }\n\n      return this[ATTRIBUTE_SYMBOL].name = value;\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this[ATTRIBUTE_SYMBOL].name;\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children || [];\n    }\n  }, {\n    key: \"headers\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].headers || [];\n    }\n  }]);\n\n  return TabContainer;\n}();\n\n\n\n//# sourceURL=webpack:///./shop/component/TabContainer.js?");

/***/ }),

/***/ "./shop/index.js":
/*!***********************!*\
  !*** ./shop/index.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/tab */ \"./shop/component/TabContainer.js\");\n/* harmony import */ var _component_div__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/div */ \"./shop/component/ScrollContainer.js\");\n\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class();\n\n  for (var a in attributes) {\n    object.setAttribute(a, attributes[a]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var c = _children[_i];\n    object.appendChild(c);\n  }\n\n  return object;\n}\n\nvar tab = myCreate(_component_tab__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n  style: \"width: 500px;height:300px;\"\n}, myCreate(_component_div__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  title: '推荐',\n  style: \"width:500px;height:300px;background-color:blue\"\n}), myCreate(_component_div__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  title: '有趣的店',\n  style: \"width: 500px;height:300px;background-color:green\"\n}), myCreate(_component_div__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  title: '好店',\n  style: \"width: 500px;height:300px;background-color:red\"\n}));\ntab.appendTo(document.getElementById('container'));\n\n//# sourceURL=webpack:///./shop/index.js?");

/***/ })

/******/ });
