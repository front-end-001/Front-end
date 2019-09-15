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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Div; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import '../swiper_under/gesture'\n// import '../swiper_under/ainimate'\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Div =\n/*#__PURE__*/\nfunction () {\n  function Div(config) {\n    _classCallCheck(this, Div);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); // 跟原型上自带的方法不发生冲突；\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.created();\n    this[PROPERTY_SYMBOL].children = [];\n  }\n\n  _createClass(Div, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement('div');\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      switch (name) {\n        case 'style':\n          this.root.setAttribute('style', value);\n          break;\n\n        default:\n          break;\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"trigerEvent\",\n    value: function trigerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].width;\n    }\n  }]);\n\n  return Div;\n}();\n\n\n\n//# sourceURL=webpack:///./src/Div.js?");

/***/ }),

/***/ "./src/TabView.js":
/*!************************!*\
  !*** ./src/TabView.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tab; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import '../swiper_under/gesture'\n// import '../swiper_under/ainimate'\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Tab =\n/*#__PURE__*/\nfunction () {\n  function Tab(config) {\n    _classCallCheck(this, Tab);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); // 跟原型上自带的方法不发生冲突；\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.created();\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].headers = [];\n  }\n\n  _createClass(Tab, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.root.style.height = \"100%\";\n      this.root.style.display = 'flex';\n      this.root.style.flexDirection = 'column';\n      this.headerContainer = document.createElement(\"div\");\n      this.headerContainer.style.height = \"46px\";\n      this.contentContainer = document.createElement(\"div\");\n      this.contentContainer.style.whiteSpace = \"nowrap\";\n      this.contentContainer.style.flex = 1;\n      this.contentContainer.style.overflow = \"hidden\";\n      this.root.appendChild(this.headerContainer);\n      this.root.appendChild(this.contentContainer);\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      var title = child.getAttribute(\"tab-title\") || \"\";\n      this[PROPERTY_SYMBOL].headers.push(title);\n      var header = document.createElement(\"div\");\n      header.style.display = \"inline-block\";\n      header.style.margin = \"10px 18px 0px\";\n      header.innerText = title;\n      this.headerContainer.appendChild(header);\n      child.appendTo(this.contentContainer);\n\n      for (var i = 0; i < this.contentContainer.children.length; i++) {\n        this.contentContainer.children[i].style.width = \"100%\";\n        this.contentContainer.children[i].style.height = \"100%\";\n        this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      switch (name) {\n        case 'style':\n          return this.root.getAttribute('style');\n          break;\n\n        default:\n          break;\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      switch (name) {\n        case 'style':\n          this.root.setAttribute('style', value);\n          break;\n\n        default:\n          break;\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"trigerEvent\",\n    value: function trigerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Tab;\n}();\n\n\n\n//# sourceURL=webpack:///./src/TabView.js?");

/***/ }),

/***/ "./src/component.js":
/*!**************************!*\
  !*** ./src/component.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Carousel; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n// import '../swiper_under/gesture'\n// import '../swiper_under/ainimate'\nvar PROPERTY_SYMBOL = Symbol('property');\nvar ATTRIBUTE_SYMBOL = Symbol('attribute');\nvar EVENT_SYMBOL = Symbol('event');\nvar STATE_SYMBOL = Symbol('state');\n\nvar Carousel =\n/*#__PURE__*/\nfunction () {\n  function Carousel(config) {\n    _classCallCheck(this, Carousel);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null); // 跟原型上自带的方法不发生冲突；\n\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.created();\n  }\n\n  _createClass(Carousel, [{\n    key: \"appendChilden\",\n    value: function appendChilden(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement('div');\n      this.root.className = 'carousel';\n      this.root.style.overflow = 'hidden';\n      this.root.style.whiteSpace = 'nowrap';\n      this.root.style.outline = '1px solid blue';\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {\n      var _this = this;\n\n      var ImgsUrl = this.ImgsUrl || [];\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = ImgsUrl[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var img = _step.value;\n          var e = document.createElement(\"img\");\n          e.src = img;\n          e.style.width = \"100%\";\n          this.root.appendChild(e);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n\n      var children = Array.prototype.slice.call(this.root.children);\n      var position = 0;\n\n      var nextFrame = function nextFrame() {\n        var nextPosition = position + 1;\n        if (!_this.loop && nextPosition > 3) return;\n        nextPosition = nextPosition % children.length;\n        var current = children[position],\n            next = children[nextPosition]; // 将next放到正确的位置上\n\n        next.style.transition = \"ease 0s\";\n        next.style.transform = \"translate(\".concat(100 - 100 * nextPosition, \"%)\");\n        setTimeout(function () {\n          // 把current挪出视口\n          current.style.transition = \"ease 0.5s\";\n          current.style.transform = \"translate(\".concat(-100 - 100 * position, \"%)\"); // 把next挪进视口\n\n          next.style.transition = \"ease 0.5s\";\n          next.style.transform = \"translate(\".concat(-100 * nextPosition, \"%)\");\n          position = nextPosition;\n        }, 16);\n        setTimeout(nextFrame, _this.duration);\n      };\n\n      if (this.autoPlay) {\n        setTimeout(function () {\n          nextFrame();\n        }, this.duration);\n      } // enableGesture(this.root);\n      // let x =0\n      // this.root.addEventListener(\"pan\", event => {\n      //     //console.log(\"pan\")\n      //     if(event.isVertical)\n      //         return;\n      //     for(let child of children) {\n      //         child.style.transition = \"ease 0s\";\n      //         child.style.transform = `translated(${event.dx + x}px`;\n      //     }\n      // })\n      // this.root.addEventListener(\"panend\", event => {\n      //     if(event.isVertical)\n      //         return;\n      //     if(event.isFlick && Math.abs(event.dx) > Math.abs(event.dy)){\n      //         if(event.dx > 0) {\n      //             position = position - 1;\n      //         }\n      //         if(event.dx < 0) {\n      //             position = position + 1;\n      //         }\n      //     } else {\n      //         position = -(Math.round((x + event.dx) / 500));\n      //     }\n      //     position = position%children.length\n      //     // position = Math.max(0, Math.min(position, children.length - 1));\n      //     console.log(position)\n      //     if(position===0){\n      //         for(let child of children) {\n      //             child.style.transition = \"ease 0s\";\n      //             child.style.transform = `translate(${-(position-1) * 500}px)`;\n      //         }\n      //         children[children.length-1].style.transition = \"ease 0s\";\n      //         children[children.length-1].style.transform = `translate(${-position * 500}px)`;\n      //         setTimeout(()=>{\n      //             for(let child of children) {\n      //                 child.style.transition = \"ease 0.5s\";\n      //                 child.style.transform = `translate(${-position * 500}px)`;\n      //             } \n      //         },16)\n      //     }else{\n      //         for(let child of children) {\n      //             child.style.transition = \"ease 0.5s\";\n      //             child.style.transform = `translate(${-position * 500}px)`;\n      //         }\n      //     }\n      //     x = -position * 500;\n      // })\n\n    }\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      switch (name) {\n        case 'ImgsUrl':\n          this.ImgsUrl = value;\n          break;\n\n        case 'width':\n          this.width = value;\n          break;\n\n        case 'height':\n          this.height = value;\n          break;\n\n        case 'autoPlay':\n          this.autoPlay = value;\n          break;\n\n        case 'duration':\n          this.duration = value;\n          break;\n\n        case 'loop':\n          this.loop = value;\n          break;\n\n        default:\n          break;\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"trigerEvent\",\n    value: function trigerEvent(type) {\n      var _iteratorNormalCompletion2 = true;\n      var _didIteratorError2 = false;\n      var _iteratorError2 = undefined;\n\n      try {\n        for (var _iterator2 = this[EVENT_SYMBOL][type][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n          var event = _step2.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n            _iterator2[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError2) {\n            throw _iteratorError2;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"width\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].width;\n    },\n    set: function set(value) {\n      this.root.style.width = value + 'px';\n      return this[PROPERTY_SYMBOL].width = value;\n    }\n  }, {\n    key: \"height\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].height;\n    },\n    set: function set(value) {\n      this.root.style.height = value + 'px';\n      return this[PROPERTY_SYMBOL].height = value;\n    }\n  }, {\n    key: \"autoPlay\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].autoPlay;\n    },\n    set: function set(value) {\n      return this[PROPERTY_SYMBOL].autoPlay = value;\n    }\n  }, {\n    key: \"duration\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].duration || 3000;\n    },\n    set: function set(value) {\n      return this[PROPERTY_SYMBOL].duration = value;\n    }\n  }, {\n    key: \"ImgsUrl\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].ImgsUrl;\n    },\n    set: function set(value) {\n      return this[PROPERTY_SYMBOL].ImgsUrl = value;\n    }\n  }, {\n    key: \"loop\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].loop;\n    },\n    set: function set(value) {\n      return this[PROPERTY_SYMBOL].loop = value;\n    }\n  }]);\n\n  return Carousel;\n}();\n\n\n\n//# sourceURL=webpack:///./src/component.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script */ \"./src/script.js\");\n\nconsole.log(22222);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ \"./src/component.js\");\n/* harmony import */ var _TabView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabView */ \"./src/TabView.js\");\n/* harmony import */ var _Div__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Div */ \"./src/Div.js\");\n\n\n\n\nfunction myCreate(Class, attributes) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  console.log(arguments);\n  var object = new Class();\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n    object.appendChild(child);\n  }\n\n  return object;\n}\n\nvar ImgsUrl = [\"https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg\", \"https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg\", \"https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg\", \"https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg\"]; // var c = <Carousel width=\"300\"ImgsUrl={ImgsUrl}autoPlay=\"true\">\n// </Carousel>\n\nvar c = myCreate(_TabView__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null, myCreate(_Div__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"推荐\",\n  style: \"background:#8bc34a\"\n}), myCreate(_Div__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"有趣的店\",\n  style: \"background:#03a9f4\"\n}), myCreate(_Div__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n  \"tab-title\": \"品牌新店\",\n  style: \"background:pink\"\n}));\nc.appendTo(document.body);\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ })

/******/ });