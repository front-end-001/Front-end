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

/***/ "../gesture.js":
/*!*********************!*\
  !*** ../gesture.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return enableGesture; });\nfunction enableGesture(main) {\n  var start = function start(point, context) {\n    console.log('start');\n    context.startX = point.clientX;\n    context.startY = point.clientY;\n    context.isTap = true;\n    context.isPan = false;\n    context.isPress = false;\n    context.pressHandler = setTimeout(function () {\n      context.isPress = true;\n      context.isTap = false;\n      var e = new Event('press');\n      main.dispatchEvent(e);\n      context.pressHandler = null;\n    }, 500);\n    context.startTime = Date.now();\n  };\n\n  var move = function move(point, context) {\n    console.log('move');\n    var dx = point.clientX - context.startX;\n    var dy = point.clientY - context.startY;\n\n    if (dx * dx + dy * dy > 100) {\n      if (context.pressHandler !== null) {\n        clearTimeout(context.pressHandler);\n        context.pressHandler = null;\n      } else {\n        context.isPress = false;\n        var e = new Event('presscancel');\n        main.dispatchEvent(e);\n      }\n\n      context.isTap = false;\n\n      if (!context.isPan) {\n        if (Math.abs(dx) > Math.abs(dy)) {\n          context.isVertical = false;\n          context.isHorizontal = true;\n        } else {\n          context.isVertical = true;\n          context.isHorizontal = false;\n        }\n\n        var _e = new Event('panstart');\n\n        main.dispatchEvent(_e);\n        _e.startX = context.startX;\n        _e.startY = context.startY;\n        context.isPan = true;\n      }\n    }\n\n    if (context.isPan) {\n      var _e2 = new Event('pan');\n\n      _e2.dx = dx;\n      _e2.dy = dy;\n      _e2.isHorizontal = context.isHorizontal;\n      _e2.isVertical = context.isVertical;\n      main.dispatchEvent(_e2);\n    }\n  };\n\n  var end = function end(point, context) {\n    var dx = point.clientX - context.startX,\n        dy = point.clientY - context.startY;\n    var speed = Math.sqrt(dx * dx + dy * dy) / (Date.now() - context.startTime);\n\n    if (context.isPan && speed > 0.3) {\n      context.isFlick = true;\n      var e = new Event('flick');\n      e.dx = dx;\n      e.dy = dy;\n      main.dispatchEvent(e);\n    } else {\n      context.isFlick = false;\n    }\n\n    if (context.pressHandler !== null) {\n      clearTimeout(context.pressHandler);\n    }\n\n    if (context.isTap) {\n      var _e3 = new Event('tap');\n\n      main.dispatchEvent(_e3);\n    }\n\n    if (context.isPan) {\n      var _e4 = new Event('panend');\n\n      _e4.dx = point.clientX - context.startX;\n      _e4.dy = point.clientY - context.startY;\n      _e4.isFlick = context.isFlick;\n      _e4.isHorizontal = context.isHorizontal;\n      _e4.isVertical = context.isVertical;\n      main.dispatchEvent(_e4);\n    }\n\n    if (context.isPress) {\n      var _e5 = new Event('pressend');\n\n      main.dispatchEvent(_e5);\n    }\n\n    console.log('end');\n  };\n\n  var cancel = function cancel(point, context) {\n    if (context.isPan) {\n      var e = new Event('pancancel');\n      main.dispatchEvent(e);\n    }\n\n    if (context.isPress) {\n      var _e6 = new Event('presscancel');\n\n      main.dispatchEvent(_e6);\n    }\n  };\n\n  var contexts = Object.create(null);\n  var mouseSymbol = Symbol('mouse');\n\n  var mousedown = function mousedown(event) {\n    event.preventDefault();\n    document.addEventListener('mousemove', mousemove);\n    document.addEventListener('mouseup', mouseup);\n    contexts[mouseSymbol] = Object.create(null);\n    start(event, contexts[mouseSymbol]);\n  };\n\n  var mousemove = function mousemove(event) {\n    event.preventDefault();\n    move(event, contexts[mouseSymbol]);\n  };\n\n  var mouseup = function mouseup(event) {\n    document.removeEventListener('mousemove', mousemove);\n    document.removeEventListener('mouseup', mouseup);\n    end(event, contexts[mouseSymbol]);\n    delete contexts[mouseSymbol];\n  };\n\n  main.addEventListener('mousedown', mousedown);\n\n  var touchstart = function touchstart(event) {\n    event.preventDefault();\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = event.changedTouches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var touch = _step.value;\n        contexts[touch.identifier] = Object.create(null);\n        start(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  };\n\n  var touchmove = function touchmove(event) {\n    event.preventDefault();\n    var _iteratorNormalCompletion2 = true;\n    var _didIteratorError2 = false;\n    var _iteratorError2 = undefined;\n\n    try {\n      for (var _iterator2 = event.changedTouches[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n        var touch = _step2.value;\n        move(touch, contexts[touch.identifier]);\n      }\n    } catch (err) {\n      _didIteratorError2 = true;\n      _iteratorError2 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n          _iterator2[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError2) {\n          throw _iteratorError2;\n        }\n      }\n    }\n  };\n\n  var touchend = function touchend(event) {\n    var _iteratorNormalCompletion3 = true;\n    var _didIteratorError3 = false;\n    var _iteratorError3 = undefined;\n\n    try {\n      for (var _iterator3 = event.changedTouches[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n        var touch = _step3.value;\n        end(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _didIteratorError3 = true;\n      _iteratorError3 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n          _iterator3[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError3) {\n          throw _iteratorError3;\n        }\n      }\n    }\n  };\n\n  var touchcancel = function touchcancel(event) {\n    var _iteratorNormalCompletion4 = true;\n    var _didIteratorError4 = false;\n    var _iteratorError4 = undefined;\n\n    try {\n      for (var _iterator4 = event.changedTouches[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {\n        var touch = _step4.value;\n        cancel(touch, contexts[touch.identifier]);\n        delete contexts[touch.identifier];\n      }\n    } catch (err) {\n      _didIteratorError4 = true;\n      _iteratorError4 = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion4 && _iterator4[\"return\"] != null) {\n          _iterator4[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError4) {\n          throw _iteratorError4;\n        }\n      }\n    }\n  };\n\n  main.addEventListener('touchstart', touchstart);\n  main.addEventListener('touchmove', touchmove);\n  main.addEventListener('touchend', touchend);\n  main.addEventListener('touchcancel', touchcancel);\n}\n\n//# sourceURL=webpack:///../gesture.js?");

/***/ }),

/***/ "./Div.js":
/*!****************!*\
  !*** ./Div.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Div; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRTiBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Div =\n/*#__PURE__*/\nfunction () {\n  function Div() {\n    _classCallCheck(this, Div);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRTiBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].headers = [];\n    this.created();\n  }\n\n  _createClass(Div, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    } // lifecyle\n\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement('div');\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {} // methods\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n\n      for (var i = 0; i < this.root.children.length; i++) {\n        this.root.children[i].style.width = '100%';\n        this.root.children[i].style.height = '100%';\n      }\n    } // properties\n\n  }, {\n    key: \"getAttribute\",\n    // attributes\n    value: function getAttribute(name) {\n      if (name == 'style') {\n        return this.root.getAttribute('style');\n      }\n\n      return this[ATTRTiBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'style') {\n        this.root.setAttribute('style', value);\n      }\n\n      return this[ATTRTiBUTE_SYMBOL][name] = value;\n    } // event\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Div;\n}();\n\n\n\n//# sourceURL=webpack:///./Div.js?");

/***/ }),

/***/ "./Tab.js":
/*!****************!*\
  !*** ./Tab.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tab; });\n/* harmony import */ var _gesture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../gesture.js */ \"../gesture.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRTiBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Tab =\n/*#__PURE__*/\nfunction () {\n  function Tab() {\n    _classCallCheck(this, Tab);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRTiBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].headers = [];\n    this[STATE_SYMBOL].h = 0;\n    this.created();\n  }\n\n  _createClass(Tab, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    } // lifecyle\n\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement('div');\n      this.root.classList.add('tab');\n      this.headerContainer = document.createElement('div');\n      this.headerContainer.classList.add('header-container');\n      this.contentContainer = document.createElement('div');\n      this.contentContainer.classList.add('content-container');\n      this.contentContainer.style.whiteSpace = 'nowrap';\n      this.contentContainer.style.overflow = 'hidden';\n      this.contentContainer.style.height = '100%';\n      this.root.appendChild(this.headerContainer);\n      this.root.appendChild(this.contentContainer);\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {\n      var children = Array.prototype.slice.call(this.contentContainer.children);\n      var position = 0;\n      Object(_gesture_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.contentContainer);\n      var transformX = -375 * position; // \n\n      this.contentContainer.addEventListener('pan', function (event) {\n        if (event.isVertical) {\n          return;\n        }\n\n        var _iteratorNormalCompletion = true;\n        var _didIteratorError = false;\n        var _iteratorError = undefined;\n\n        try {\n          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n            var child = _step.value;\n            child.style.transition = '';\n            child.style.transform = \"translate(\".concat(transformX + event.dx, \"px)\");\n          }\n        } catch (err) {\n          _didIteratorError = true;\n          _iteratorError = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n              _iterator[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError) {\n              throw _iteratorError;\n            }\n          }\n        }\n      });\n      this.contentContainer.addEventListener('panend', function (event) {\n        console.log(event);\n\n        if (event.isFlick) {\n          event.dx > 0 ? position-- : position++;\n        } else {\n          // 四舍五入回弹效果\n          position = -Math.round((transformX + event.dx) / 375);\n        } // 控制边界元素回弹\n\n\n        position = Math.max(0, Math.min(position, children.length - 1));\n        transformX = -500 * position;\n        var _iteratorNormalCompletion2 = true;\n        var _didIteratorError2 = false;\n        var _iteratorError2 = undefined;\n\n        try {\n          for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n            var child = _step2.value;\n            child.style.transition = 'ease .5s';\n            child.style.transform = \"translate(\".concat(transformX, \"px)\");\n          }\n        } catch (err) {\n          _didIteratorError2 = true;\n          _iteratorError2 = err;\n        } finally {\n          try {\n            if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n              _iterator2[\"return\"]();\n            }\n          } finally {\n            if (_didIteratorError2) {\n              throw _iteratorError2;\n            }\n          }\n        }\n      });\n    }\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {} // methods\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      var title = child.getAttribute('tab-title') || '';\n      this[PROPERTY_SYMBOL].headers.push(title);\n      var header = document.createElement('header');\n      header.style.display = 'inline-block';\n      header.innerHTML = title;\n      this.headerContainer.appendChild(header);\n      child.appendTo(this.contentContainer);\n\n      for (var i = 0; i < this.contentContainer.children.length; i++) {\n        this[STATE_SYMBOL].h += 20;\n        this.contentContainer.children[i].style.width = '100%';\n        this.contentContainer.children[i].style.height = '100%';\n        this.contentContainer.children[i].style.display = 'inline-block';\n        this.contentContainer.children[i].style.backgroundColor = \"hsl(\".concat(this[STATE_SYMBOL].h, \", 60%, 80%)\");\n      }\n    } // properties\n\n  }, {\n    key: \"getAttribute\",\n    // attributes\n    value: function getAttribute(name) {\n      if (name == 'style') {\n        return this.root.getAttribute('style');\n      }\n\n      return this[ATTRTiBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == 'style') {\n        this.root.setAttribute('style', value);\n      }\n\n      return this[ATTRTiBUTE_SYMBOL][name] = value;\n    } // event\n\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion3 = true;\n      var _didIteratorError3 = false;\n      var _iteratorError3 = undefined;\n\n      try {\n        for (var _iterator3 = this[EVENT_SYMBOL][type][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {\n          var event = _step3.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError3 = true;\n        _iteratorError3 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion3 && _iterator3[\"return\"] != null) {\n            _iterator3[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError3) {\n            throw _iteratorError3;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Tab;\n}();\n\n\n\n//# sourceURL=webpack:///./Tab.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tab */ \"./Tab.js\");\n/* harmony import */ var _Div__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Div */ \"./Div.js\");\n\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class();\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var child in children) {\n    object.appendChild(children[child]);\n  }\n\n  return object;\n}\n\nvar c = myCreate(_Tab__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n  style: \"width: 100%;height: 300px;\"\n}, myCreate(_Div__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"推荐\"\n}), myCreate(_Div__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"有趣的店\"\n}), myCreate(_Div__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"品牌新店\"\n}));\nc.appendTo(document.body);\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });