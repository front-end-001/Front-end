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

/***/ "./carousel.js":
/*!*********************!*\
  !*** ./carousel.js ***!
  \*********************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Carousel\", function() { return Carousel; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar WIDTH_SYMBOL = Symbol(\"width\");\nvar ATTRIBUTE_SYMBOL = Symbol(\"attribute\");\nvar EVENT_SYMBOL = Symbol(\"event\");\nvar STATE_SYMBOL = Symbol(\"state\");\nvar Carousel =\n/*#__PURE__*/\nfunction () {\n  function Carousel(data) {\n    _classCallCheck(this, Carousel);\n\n    this[WIDTH_SYMBOL] = Object.create(null);\n    this[ATTRIBUTE_SYMBOL] = Object.create(null);\n    this[EVENT_SYMBOL] = Object.create(null);\n    this[STATE_SYMBOL] = Object.create(null);\n    this.setAttribute(\"data\", data);\n    this.created();\n  }\n\n  _createClass(Carousel, [{\n    key: \"getAttribute\",\n    value: function getAttribute(name) {\n      return this[ATTRIBUTE_SYMBOL][name];\n    }\n  }, {\n    key: \"setAttribute\",\n    value: function setAttribute(name, value) {\n      return this[ATTRIBUTE_SYMBOL][name] = value;\n    }\n  }, {\n    key: \"addEventListener\",\n    value: function addEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        this[EVENT_SYMBOL][type] = new Set();\n      }\n\n      this[EVENT_SYMBOL][type].add(listener);\n    }\n  }, {\n    key: \"removeEventListener\",\n    value: function removeEventListener(type, listener) {\n      if (!this[EVENT_SYMBOL][type]) {\n        return;\n      }\n\n      this[EVENT_SYMBOL][type][\"delete\"](listener);\n    }\n  }, {\n    key: \"triggerEvent\",\n    value: function triggerEvent(type) {\n      var _iteratorNormalCompletion = true;\n      var _didIteratorError = false;\n      var _iteratorError = undefined;\n\n      try {\n        for (var _iterator = this[EVENT_SYMBOL][type][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n          var event = _step.value;\n          event.call(this);\n        }\n      } catch (err) {\n        _didIteratorError = true;\n        _iteratorError = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n            _iterator[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError) {\n            throw _iteratorError;\n          }\n        }\n      }\n    }\n  }, {\n    key: \"appendTo\",\n    value: function appendTo(element) {\n      element.appendChild(this._container);\n      this.mounted();\n    }\n  }, {\n    key: \"created\",\n    value: function created() {\n      this._container = document.createElement(\"div\");\n\n      this._container.classList.add(\"carousel\");\n\n      this._handler = null;\n      this.data = this.getAttribute(\"data\");\n      console.log(this.data);\n    }\n  }, {\n    key: \"mounted\",\n    value: function mounted() {\n      var i = this.data.length;\n      var _iteratorNormalCompletion2 = true;\n      var _didIteratorError2 = false;\n      var _iteratorError2 = undefined;\n\n      try {\n        for (var _iterator2 = this.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {\n          var image = _step2.value;\n          var e = document.createElement(\"img\");\n          e.src = image;\n          e.style.zIndex = i--;\n\n          this._container.appendChild(e);\n        }\n      } catch (err) {\n        _didIteratorError2 = true;\n        _iteratorError2 = err;\n      } finally {\n        try {\n          if (!_iteratorNormalCompletion2 && _iterator2[\"return\"] != null) {\n            _iterator2[\"return\"]();\n          }\n        } finally {\n          if (_didIteratorError2) {\n            throw _iteratorError2;\n          }\n        }\n      }\n\n      var children = Array.prototype.slice.call(this._container.children);\n      var position = 0;\n      var offsetTimeStart = 0;\n      var tl = new Timeline();\n\n      var nextPic = function nextPic() {\n        var nextPosition = position + 1;\n        nextPosition = nextPosition % children.length;\n        var _ref = [children[position], children[nextPosition]],\n            current = _ref[0],\n            next = _ref[1];\n        offsetTimeStart = Date.now();\n        next.style.transform = \"translate(\".concat(500 - 500 * nextPosition, \"px)\");\n        console.log(\"current: \", position, current.style.transform);\n        console.log(\"next: \", nextPosition, next.style.transform);\n        console.log(\"\");\n        tl.restart();\n        tl.addAnimation(new DOMElementStyleElemAnimation(current, \"transform\", 0, -500 * position, 1000, -500 - 500 * position, function (v) {\n          return \"translateX(\".concat(v, \"px)\");\n        }));\n        tl.addAnimation(new DOMElementStyleElemAnimation(next, \"transform\", 0, 500 - 500 * nextPosition, 1000, -500 * nextPosition, function (v) {\n          return \"translateX(\".concat(v, \"px)\");\n        }));\n        position = nextPosition;\n        nextPicTimer = setTimeout(nextPic, 3000);\n      };\n\n      var nextPicTimer = setTimeout(nextPic, 3000);\n      var offset = 0;\n\n      this._container.addEventListener(\"mousedown\", function (event) {\n        tl.pause();\n        var currentTime = Date.now();\n\n        if (currentTime - offsetTimeStart < 1000) {\n          offset = 500 - ease((currentTime - offsetTimeStart) / 1000) * 500;\n        } else {\n          offset = 0;\n        }\n\n        console.log(\"offset: \", offset);\n        clearTimeout(nextPicTimer);\n      });\n\n      enableGesture(this._container);\n\n      this._container.addEventListener(\"pan\", function (event) {\n        console.log(\"pan\");\n        if (event.isVertical) return; // 如果垂直分量大，就不移动\n\n        var current = children[position];\n        var nextPosition = (position + 1) % children.length;\n        var lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block\n\n        var next = children[nextPosition];\n        var last = children[lastPosition];\n        last.style.transition = \"ease 0s\";\n        last.style.transform = \"translate(\".concat(-500 - 500 * lastPosition + event.dx + offset, \"px)\");\n        current.style.transition = \"ease 0s\";\n        current.style.transform = \"translate(\".concat(-500 * position + event.dx + offset, \"px)\");\n        next.style.transition = \"ease 0s\";\n        next.style.transform = \"translate(\".concat(500 - 500 * nextPosition + event.dx + offset, \"px)\");\n      });\n\n      this._container.addEventListener(\"panend\", function (event) {\n        if (event.isVertical) return;\n        console.log(\"original postion: \", position);\n        var isLeft;\n\n        if (event.isFlick && event.isHorizontal) {\n          if (event.dx > 0) {\n            position = position - 1;\n            isLeft = true;\n          }\n\n          if (event.dx < 0) {\n            position = position + 1;\n            isLeft = false;\n          }\n        } else {\n          if (event.dx > 250) {\n            position = position - 1;\n            isLeft = true;\n          } else if (event.dx < -250) {\n            position = position + 1;\n            isLeft = false;\n          } else if (event.dx > 0) {\n            isLeft = false;\n          } else {\n            isLeft = true;\n          }\n        }\n\n        position = (children.length + position) % children.length;\n        console.log(\"new postion: \", position);\n        var current = children[position];\n        var nextPosition = (position + 1) % children.length;\n        var lastPosition = (children.length + position - 1) % children.length; // 避免小数，因此补一个length的block\n\n        var next = children[nextPosition];\n        var last = children[lastPosition];\n        /*\r\n         *\r\n         * [0,1,2,3]\r\n         * 这里的 current 假设为0， last为3 ,next 为1， 那需要图片放到 正确的 last，cur，next位置\r\n         * 则需要 3 移动到 0 的左边， 即-2000的位置， 而 1 本来就在 0  的右边，则不需要移动\r\n         *\r\n         */\n\n        if (!isLeft) {\n          // 如果左边的不进入，则不用进行transition\n          last.style.transition = \"\";\n        } else {\n          last.style.transition = \"ease 0s\";\n        }\n\n        last.style.transform = \"translate(\".concat(-500 - 500 * lastPosition, \"px)\");\n        current.style.transition = \"ease 0s\";\n        current.style.transform = \"translate(\".concat(-500 * position, \"px)\");\n\n        if (isLeft) {\n          next.style.transition = \"\";\n        } else {\n          next.style.transition = \"ease 0s\";\n        }\n\n        next.style.transform = \"translate(\".concat(500 - 500 * nextPosition, \"px)\");\n      });\n\n      this._container.addEventListener(\"mousedown\", function (event) {\n        return event.preventDefault();\n      });\n\n      this._container.addEventListener(\"pressstart\", function (event) {\n        console.log(\"pressstart\");\n      });\n\n      this._container.addEventListener(\"pressend\", function (event) {\n        console.log(\"pressend\");\n      });\n\n      this._container.addEventListener(\"presscancel\", function (event) {\n        console.log(\"presscancel\");\n      });\n    }\n  }, {\n    key: \"unmounted\",\n    value: function unmounted() {}\n  }, {\n    key: \"update\",\n    value: function update() {}\n  }]);\n\n  return Carousel;\n}();\n\n//# sourceURL=webpack:///./carousel.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ \"./carousel.js\");\n\n\nfunction myCreate(Class, attributes) {\n  var object = new Class();\n\n  for (var name in attributes) {\n    object.setAttribute(name, attributes[name]);\n  }\n\n  return object;\n}\n\nvar c = myCreate(_carousel__WEBPACK_IMPORTED_MODULE_0__[\"Carousel\"], {\n  width: \"100\"\n});\nc.appendTo(document.body);\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });