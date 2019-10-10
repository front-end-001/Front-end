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

/***/ "./Card.js":
/*!*****************!*\
  !*** ./Card.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Card; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar Card =\n/*#__PURE__*/\nfunction () {\n  function Card(config) {\n    _classCallCheck(this, Card);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.text = config || \"\";\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(Card, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.root.innerText = this.text;\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Card;\n}();\n\n\n\n//# sourceURL=webpack:///./Card.js?");

/***/ }),

/***/ "./ScrollView.js":
/*!***********************!*\
  !*** ./ScrollView.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ScrollView; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar ScrollView =\n/*#__PURE__*/\nfunction () {\n  function ScrollView(config) {\n    _classCallCheck(this, ScrollView);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(ScrollView, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.root.addEventListener(\"touchmove\", function (e) {\n        e.cancelBubble = true;\n        e.stopImmediatePropagation();\n      }, {\n        passive: false\n      });\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {\n      // 判断展示哪个content 将展示的translate过来\n      console.log(\"mounted this.root\", this.root); // for (let i = 0; i < this.parentElement.children.length; i++) {\n      //   if (\n      //     this.getAttribute(\"key\") ===\n      //     this.parentElement.children[i].getAttribute(\"key\")\n      //   ) {\n      //     this.setAttribute(\"active\", true);\n      //     this.style.fontWeight = \"bold\";\n      //     this.classList.add(\"tab-active\");\n      //     this.parentElement.children[i].children[0].style.display = \"block\";\n      //   } else {\n      //     this.parentElement.children[i].setAttribute(\"active\", false);\n      //     this.parentElement.children[i].style.fontWeight = \"normal\";\n      //     this.parentElement.children[i].classList.remove(\"tab-active\");\n      //     this.parentElement.children[i].children[0].style.display = \"none\";\n      //   }\n      // }\n    }\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      if (name == \"class\") {\n        this.root.setAttribute(\"class\", value);\n      }\n\n      if (name == \"key\") {\n        this.root.setAttribute(\"key\", value);\n      }\n\n      if (name == \"active\") {\n        this.root.setAttribute(\"active\", value);\n      }\n\n      this.root.style.overflow = \"auto\";\n      this.root.style.whiteSpace = \"normal\";\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return ScrollView;\n}();\n\n\n\n//# sourceURL=webpack:///./ScrollView.js?");

/***/ }),

/***/ "./Tab.js":
/*!****************!*\
  !*** ./Tab.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Tab; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar Tab =\n/*#__PURE__*/\nfunction () {\n  function Tab(config) {\n    _classCallCheck(this, Tab);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this[PROPERTY_SYMBOL].children = [];\n    this[PROPERTY_SYMBOL].tabs = [];\n    this.created();\n  }\n\n  _createClass(Tab, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      console.log(2222, element);\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"div\");\n      this.headerContainer = document.createElement(\"div\");\n      this.headerContainer.classList.add(\"tabs-title\");\n      this.headerContainer.style.display = \"flex\";\n      this.contentContainer = document.createElement(\"div\");\n      this.contentContainer.classList.add(\"tabs-content\");\n      this.contentContainer.style.whiteSpace = \"nowrap\";\n      this.contentContainer.style.overflow = \"hidden\";\n      this.contentContainer.style.height = \"100%\";\n      this.root.appendChild(this.headerContainer);\n      this.root.appendChild(this.contentContainer);\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      var title = child.getAttribute(\"tab-title\") || \"\";\n      this[PROPERTY_SYMBOL].tabs.push(title);\n      var tab = document.createElement(\"div\");\n      tab.innerText = title;\n      tab.classList.add(\"tab\");\n      tab.style.padding = \"5px 10px\";\n      tab.style.display = \"flex\";\n      tab.style.flexDirection = \"column\";\n      tab.style.alignItems = \"center\";\n      var tabBar = document.createElement(\"div\");\n      tabBar.style.backgroundColor = \"#fff\";\n      tabBar.style.width = \"1.5em\";\n      tabBar.style.height = \"2px\";\n      tabBar.style.borderRadius = \"2px\";\n\n      if (child.getAttribute(\"active\")) {\n        tab.style.fontWeight = \"bold\";\n        tabBar.style.display = \"block\";\n      } else {\n        tabBar.style.display = \"none\";\n        tab.style.fontWeight = \"normal\";\n      }\n\n      tab.appendChild(tabBar);\n      var key = child.getAttribute(\"key\");\n\n      if (!key) {\n        throw \"tab的key值不能为空\";\n      }\n\n      if (child.getAttribute(\"active\")) {\n        this.activeTabKey = child.getAttribute(\"key\");\n      }\n\n      tab.setAttribute(\"key\", key);\n      this.headerContainer.appendChild(tab);\n      console.log(11111111111, this.contentContainer);\n      child.appendTo(this.contentContainer);\n\n      for (var i = 0; i < this.contentContainer.children.length; i++) {\n        this.contentContainer.children[i].style.width = \"100%\";\n        this.contentContainer.children[i].style.height = \"100%\";\n        this.contentContainer.children[i].style.display = \"inline-block\";\n      }\n\n      var contents = this.contentContainer;\n      tab.addEventListener(\"touchstart\", function () {\n        console.log(\"====当前key======\");\n        console.log(this.getAttribute(\"key\"));\n        console.log(\"===============\");\n        this.activeTabKey = this.getAttribute(\"key\");\n\n        for (var _i = 0; _i < this.parentElement.children.length; _i++) {\n          if (this.getAttribute(\"key\") === this.parentElement.children[_i].getAttribute(\"key\")) {\n            this.setAttribute(\"active\", true);\n            this.style.fontWeight = \"bold\";\n            this.classList.add(\"tab-active\");\n            this.parentElement.children[_i].children[0].style.display = \"block\";\n          } else {\n            this.parentElement.children[_i].setAttribute(\"active\", false);\n\n            this.parentElement.children[_i].style.fontWeight = \"normal\";\n\n            this.parentElement.children[_i].classList.remove(\"tab-active\");\n\n            this.parentElement.children[_i].children[0].style.display = \"none\";\n          }\n        }\n\n        console.log(\"contents\", contents); // 便利每个子元素 如果key与tab选中的key相同 则将active设置为true 给予显示 \n        // 否则隐藏 并且将active设置为false\n\n        for (var _i2 = 0; _i2 < contents.children.length; _i2++) {\n          if (this.getAttribute(\"key\") === contents.children[_i2].getAttribute(\"key\")) {\n            contents.children[_i2].setAttribute(\"active\", true);\n\n            contents.children[_i2].style.width = \"100%\";\n            contents.children[_i2].style.height = \"100%\";\n            contents.children[_i2].style.display = \"inline-block\";\n          } else {\n            contents.children[_i2].setAttribute(\"active\", false);\n\n            contents.children[_i2].style.width = \"100%\";\n            contents.children[_i2].style.height = \"100%\";\n            contents.children[_i2].style.display = \"none\";\n          }\n        }\n      });\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Tab;\n}();\n\n\n\n//# sourceURL=webpack:///./Tab.js?");

/***/ }),

/***/ "./Text.js":
/*!*****************!*\
  !*** ./Text.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Text; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar PROPERTY_SYMBOL = Symbol(\"property\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\n\nvar Text =\n/*#__PURE__*/\nfunction () {\n  function Text(config) {\n    _classCallCheck(this, Text);\n\n    this[PROPERTY_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.text = config || \"\";\n    this[PROPERTY_SYMBOL].children = [];\n    this.created();\n  }\n\n  _createClass(Text, [{\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this.root);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this.root = document.createElement(\"span\");\n      this.root.innerText = this.text;\n      this[STATE_SYMBOL].h = 0;\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {}\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      this.children.push(child);\n      child.appendTo(this.root);\n    }\n  }, {\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      if (name == \"style\") {\n        return this.root.getAttribute(\"style\");\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      if (name == \"style\") {\n        this.root.setAttribute(\"style\", value);\n      }\n\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) this[EVENT_SYMBOL][type] = new Set();\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      if (!this[EVENT_SYMBOL][type]) return;\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"children\",\n    get: function get() {\n      return this[PROPERTY_SYMBOL].children;\n    }\n  }]);\n\n  return Text;\n}();\n\n\n\n//# sourceURL=webpack:///./Text.js?");

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Tab_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tab.js */ \"./Tab.js\");\n/* harmony import */ var _ScrollView_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ScrollView.js */ \"./ScrollView.js\");\n/* harmony import */ var _Text_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Text.js */ \"./Text.js\");\n/* harmony import */ var _Card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Card.js */ \"./Card.js\");\n // import Div from \"./Div.js\";\n\n\n\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class();\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n\n    if (typeof child === \"string\") {\n      object.appendChild(new _Text_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](child));\n    } else {\n      object.appendChild(child);\n    }\n  }\n\n  return object;\n}\n\nvar c = myCreate(_Tab_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n  style: \"width:100%;height:calc(100% - 70px);position: relative; top: 70px;\",\n  \"class\": \"myTab\"\n}, myCreate(_ScrollView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"推荐\",\n  \"class\": \"mytab-content-box\",\n  key: \"recommend\",\n  active: true\n}, \"\\u63A8\\u8350\", myCreate(_Card_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, \"123123\")), myCreate(_ScrollView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"有趣的店\",\n  style: \"\",\n  \"class\": \"mytab-content-box\",\n  key: \"interest\"\n}, \"\\u6709\\u8DA3\\u7684\\u5E97\", myCreate(_Card_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, \"qqqqqq\")), myCreate(_ScrollView_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n  \"tab-title\": \"品牌新店\",\n  style: \"\",\n  \"class\": \"mytab-content-box\",\n  key: \"newShops\"\n}, \"\\u54C1\\u724C\\u65B0\\u5E97\", myCreate(_Card_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null, \"wwwww\")));\nvar header = document.getElementById(\"header\");\nconsole.log(\"header\", header);\nc.appendTo(header);\n\n//# sourceURL=webpack:///./script.js?");

/***/ })

/******/ });