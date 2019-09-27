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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry/entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css-animation-lib/algorithm/CubeBezier.ts":
/*!*******************************************************!*\
  !*** ./src/css-animation-lib/algorithm/CubeBezier.ts ***!
  \*******************************************************/
/*! exports provided: default, linear, ease, easeIn, easeOut, easeInOut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return cubeBezierGenerator; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"linear\", function() { return linear; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ease\", function() { return ease; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeIn\", function() { return easeIn; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeOut\", function() { return easeOut; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"easeInOut\", function() { return easeInOut; });\nfunction cubeBezierGenerator(_a) {\r\n    var p1x = _a.p1x, p1y = _a.p1y, p2x = _a.p2x, p2y = _a.p2y;\r\n    var ZERO_LIMIT = 1e-6;\r\n    // Calculate the polynomial coefficients,\r\n    // implicit first and last control points are (0,0) and (1,1).\r\n    var ax = 3 * p1x - 3 * p2x + 1;\r\n    var bx = 3 * p2x - 6 * p1x;\r\n    var cx = 3 * p1x;\r\n    var ay = 3 * p1y - 3 * p2y + 1;\r\n    var by = 3 * p2y - 6 * p1y;\r\n    var cy = 3 * p1y;\r\n    function sampleCurveDerivativeX(t) {\r\n        // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.\r\n        return (3 * ax * t + 2 * bx) * t + cx;\r\n    }\r\n    function sampleCurveX(t) {\r\n        return ((ax * t + bx) * t + cx) * t;\r\n    }\r\n    function sampleCurveY(t) {\r\n        return ((ay * t + by) * t + cy) * t;\r\n    }\r\n    // Given an x value, find a parametric value it came from.\r\n    function solveCurveX(x) {\r\n        var t2 = x;\r\n        var derivative;\r\n        var x2;\r\n        // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation\r\n        // First try a few iterations of Newton's method -- normally very fast.\r\n        // http://en.wikipedia.org/wiki/Newton's_method\r\n        for (var i = 0; i < 8; i++) {\r\n            // f(t)-x=0\r\n            x2 = sampleCurveX(t2) - x;\r\n            if (Math.abs(x2) < ZERO_LIMIT) {\r\n                return t2;\r\n            }\r\n            derivative = sampleCurveDerivativeX(t2);\r\n            // == 0, failure\r\n            /* istanbul ignore if */\r\n            if (Math.abs(derivative) < ZERO_LIMIT) {\r\n                break;\r\n            }\r\n            t2 -= x2 / derivative;\r\n        }\r\n        // Fall back to the bisection method for reliability.\r\n        // bisection\r\n        // http://en.wikipedia.org/wiki/Bisection_method\r\n        var t1 = 1;\r\n        /* istanbul ignore next */\r\n        var t0 = 0;\r\n        /* istanbul ignore next */\r\n        t2 = x;\r\n        /* istanbul ignore next */\r\n        while (t1 > t0) {\r\n            x2 = sampleCurveX(t2) - x;\r\n            if (Math.abs(x2) < ZERO_LIMIT) {\r\n                return t2;\r\n            }\r\n            if (x2 > 0) {\r\n                t1 = t2;\r\n            }\r\n            else {\r\n                t0 = t2;\r\n            }\r\n            t2 = (t1 + t0) / 2;\r\n        }\r\n        // Failure\r\n        return t2;\r\n    }\r\n    function solve(x) {\r\n        return sampleCurveY(solveCurveX(x));\r\n    }\r\n    return solve;\r\n}\r\nvar linear = cubeBezierGenerator({ p1x: 0, p1y: 0, p2x: 1, p2y: 1 });\r\nvar ease = cubeBezierGenerator({ p1x: 0.25, p1y: 0.1, p2x: 0.25, p2y: 1 });\r\nvar easeIn = cubeBezierGenerator({ p1x: 0.42, p1y: 0, p2x: 1, p2y: 1 });\r\nvar easeOut = cubeBezierGenerator({ p1x: 0, p1y: 0, p2x: 0.58, p2y: 1 });\r\nvar easeInOut = cubeBezierGenerator({ p1x: 0.42, p1y: 0, p2x: 0.58, p2y: 1 });\r\n\n\n//# sourceURL=webpack:///./src/css-animation-lib/algorithm/CubeBezier.ts?");

/***/ }),

/***/ "./src/css-animation-lib/algorithm/InterpolationAlg.ts":
/*!*************************************************************!*\
  !*** ./src/css-animation-lib/algorithm/InterpolationAlg.ts ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Type */ \"./src/css-animation-lib/algorithm/Type.ts\");\n/* harmony import */ var _CubeBezier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CubeBezier */ \"./src/css-animation-lib/algorithm/CubeBezier.ts\");\n\r\n\r\nvar InterpolationAlg = /** @class */ (function () {\r\n    function InterpolationAlg() {\r\n    }\r\n    InterpolationAlg.getValue = function (curT, startT, endT, startVal, endVal, type, cusParam) {\r\n        if (type === void 0) { type = _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].linear; }\r\n        if (cusParam === void 0) { cusParam = [0, 0, 1, 1]; }\r\n        var progress = (curT - startT) / (endT - startT);\r\n        var dVal = endVal - startVal;\r\n        var displacement;\r\n        switch (type) {\r\n            case _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].linear:\r\n                displacement = Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"linear\"])(progress) * dVal;\r\n            case _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ease:\r\n                displacement = Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"ease\"])(progress) * dVal;\r\n            case _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].easeIn:\r\n                displacement = Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"easeIn\"])(progress) * dVal;\r\n            case _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].easeOut:\r\n                displacement = Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"easeOut\"])(progress) * dVal;\r\n            case _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].easeInOut:\r\n                displacement = Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"easeInOut\"])(progress) * dVal;\r\n            case _Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].custom:\r\n                displacement =\r\n                    Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ p1x: cusParam[0], p1y: cusParam[1], p2x: cusParam[2], p2y: cusParam[3] })(progress) *\r\n                        dVal;\r\n            default:\r\n                displacement = Object(_CubeBezier__WEBPACK_IMPORTED_MODULE_1__[\"linear\"])(progress) * dVal;\r\n        }\r\n        return displacement + startVal;\r\n    };\r\n    return InterpolationAlg;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (InterpolationAlg);\r\n\n\n//# sourceURL=webpack:///./src/css-animation-lib/algorithm/InterpolationAlg.ts?");

/***/ }),

/***/ "./src/css-animation-lib/algorithm/Type.ts":
/*!*************************************************!*\
  !*** ./src/css-animation-lib/algorithm/Type.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar AlgType;\r\n(function (AlgType) {\r\n    AlgType[\"linear\"] = \"linear\";\r\n    AlgType[\"ease\"] = \"ease\";\r\n    AlgType[\"easeIn\"] = \"easeIn\";\r\n    AlgType[\"easeOut\"] = \"easeOut\";\r\n    AlgType[\"easeInOut\"] = \"easeInOut\";\r\n    AlgType[\"custom\"] = \"custom\";\r\n})(AlgType || (AlgType = {}));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AlgType);\r\n\n\n//# sourceURL=webpack:///./src/css-animation-lib/algorithm/Type.ts?");

/***/ }),

/***/ "./src/css-animation-lib/animation/DOMElementStyleAnimation.ts":
/*!*********************************************************************!*\
  !*** ./src/css-animation-lib/animation/DOMElementStyleAnimation.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _algorithm_Type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../algorithm/Type */ \"./src/css-animation-lib/algorithm/Type.ts\");\n\r\nvar DOMElementStyleAnimation = /** @class */ (function () {\r\n    function DOMElementStyleAnimation() {\r\n        var _this = this;\r\n        this._property = '';\r\n        this.updateElemStyle = function (value) {\r\n            // TODO pollyfill\r\n            if (_this._element) {\r\n                _this._element.style[_this._property] = _this._converter(value);\r\n            }\r\n        };\r\n        this.fixKeyFrame = function (t) {\r\n            // terrible\r\n            if (t > _this._endTime) {\r\n                if (!_this._fixKeyFrame)\r\n                    return false;\r\n                else {\r\n                    t = _this._endTime;\r\n                    _this._finished = true;\r\n                    _this._fixKeyFrame = false;\r\n                }\r\n            }\r\n            else if (t < _this._startTime) {\r\n                if (!_this._fixKeyFrame)\r\n                    return false;\r\n                else {\r\n                    t = _this._startTime;\r\n                    _this._fixKeyFrame = false;\r\n                }\r\n            }\r\n            else {\r\n                _this._fixKeyFrame = true;\r\n            }\r\n            return true;\r\n        };\r\n        this.tick = function (t) { };\r\n        this._element = null;\r\n        this._animationType = _algorithm_Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].linear;\r\n        this._startTime = 0;\r\n        this._endTime = 1;\r\n        this._startValue = 0;\r\n        this._endValue = 1;\r\n        this._converter = function (val) { return val.toString(); };\r\n        this._finished = false;\r\n        this._fixKeyFrame = false;\r\n    }\r\n    Object.defineProperty(DOMElementStyleAnimation.prototype, \"finished\", {\r\n        get: function () {\r\n            return this._finished;\r\n        },\r\n        set: function (value) {\r\n            this._finished = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return DOMElementStyleAnimation;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (DOMElementStyleAnimation);\r\n\n\n//# sourceURL=webpack:///./src/css-animation-lib/animation/DOMElementStyleAnimation.ts?");

/***/ }),

/***/ "./src/css-animation-lib/animation/DOMElementStyleNumberAnimation.ts":
/*!***************************************************************************!*\
  !*** ./src/css-animation-lib/animation/DOMElementStyleNumberAnimation.ts ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _algorithm_Type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../algorithm/Type */ \"./src/css-animation-lib/algorithm/Type.ts\");\n/* harmony import */ var _algorithm_InterpolationAlg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../algorithm/InterpolationAlg */ \"./src/css-animation-lib/algorithm/InterpolationAlg.ts\");\n/* harmony import */ var _DOMElementStyleAnimation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOMElementStyleAnimation */ \"./src/css-animation-lib/animation/DOMElementStyleAnimation.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\n\r\n\r\nvar DOMElementStyleNumberAnimation = /** @class */ (function (_super) {\r\n    __extends(DOMElementStyleNumberAnimation, _super);\r\n    function DOMElementStyleNumberAnimation(element, property, startTime, startValue, endTime, endValue, converter, animationType) {\r\n        if (startTime === void 0) { startTime = 0; }\r\n        if (startValue === void 0) { startValue = 0; }\r\n        if (endTime === void 0) { endTime = 1; }\r\n        if (endValue === void 0) { endValue = 1; }\r\n        if (animationType === void 0) { animationType = _algorithm_Type__WEBPACK_IMPORTED_MODULE_0__[\"default\"].linear; }\r\n        var _this = _super.call(this) || this;\r\n        _this.tick = function (t) {\r\n            if (!_this.fixKeyFrame(t))\r\n                return;\r\n            _this.updateElemStyle(_this.getValue(t));\r\n        };\r\n        _this.getValue = function (t) {\r\n            return _algorithm_InterpolationAlg__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getValue(t, _this._startTime, _this._endTime, _this._startValue, _this._endValue, _this._animationType);\r\n        };\r\n        _this._element = element;\r\n        _this._property = property;\r\n        _this._startTime = startTime;\r\n        _this._endTime = endTime;\r\n        _this._startValue = startValue;\r\n        _this._endValue = endValue;\r\n        _this._converter = converter;\r\n        _this._animationType = animationType;\r\n        return _this;\r\n    }\r\n    return DOMElementStyleNumberAnimation;\r\n}(_DOMElementStyleAnimation__WEBPACK_IMPORTED_MODULE_2__[\"default\"]));\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (DOMElementStyleNumberAnimation);\r\n\n\n//# sourceURL=webpack:///./src/css-animation-lib/animation/DOMElementStyleNumberAnimation.ts?");

/***/ }),

/***/ "./src/css-animation-lib/animation/Timeline.ts":
/*!*****************************************************!*\
  !*** ./src/css-animation-lib/animation/Timeline.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar TimeLineStatus;\r\n(function (TimeLineStatus) {\r\n    TimeLineStatus[\"initial\"] = \"initial\";\r\n    TimeLineStatus[\"started\"] = \"started\";\r\n    TimeLineStatus[\"paused\"] = \"paused\";\r\n})(TimeLineStatus || (TimeLineStatus = {}));\r\nvar emptyFunc = function () { };\r\n/**\r\n * TimeLine\r\n *\r\n * @class TimeLine\r\n */\r\nvar TimeLine = /** @class */ (function () {\r\n    function TimeLine() {\r\n        var _this = this;\r\n        this._tick = emptyFunc;\r\n        this._resumeTick = emptyFunc;\r\n        this.pause = function () {\r\n            if (_this.status !== TimeLineStatus.started)\r\n                return;\r\n            _this.status = TimeLineStatus.paused;\r\n            _this._resumeTick = _this._tick;\r\n            _this._tick = emptyFunc;\r\n            _this._pauseStart = Date.now();\r\n        };\r\n        this.resume = function () {\r\n            if (_this.status !== TimeLineStatus.paused)\r\n                return;\r\n            _this._pauseTime += Date.now() - _this._pauseStart;\r\n            _this._tick = _this._resumeTick;\r\n            requestAnimationFrame(_this._tick);\r\n        };\r\n        this.addAnimation = function (animation) {\r\n            _this._animations.push(animation);\r\n        };\r\n        this.start = function () {\r\n            if (_this.status === TimeLineStatus.started)\r\n                return;\r\n            _this.status = TimeLineStatus.started;\r\n            _this._pauseTime = 0;\r\n            var startTime = Date.now();\r\n            _this._tick = function () {\r\n                for (var _i = 0, _a = _this._animations; _i < _a.length; _i++) {\r\n                    var animation = _a[_i];\r\n                    if (!animation.finished) {\r\n                        animation.tick((Date.now() - _this._pauseTime - startTime) * _this._rate + _this._startPoint);\r\n                    }\r\n                }\r\n                requestAnimationFrame(_this._tick);\r\n                // if (this._tick) {\r\n                //   requestAnimationFrame(this._tick);\r\n                // }\r\n            };\r\n            requestAnimationFrame(_this._tick);\r\n        };\r\n        this.removeAnimation = function () { };\r\n        this.restart = function () {\r\n            if (_this._tick) {\r\n                _this._tick = emptyFunc;\r\n                _this._resumeTick = emptyFunc;\r\n            }\r\n            _this.status = TimeLineStatus.initial;\r\n            requestAnimationFrame(function () {\r\n                _this.start();\r\n            });\r\n        };\r\n        this._animations = [];\r\n        this._rate = 1;\r\n        this._pauseStart = 0;\r\n        this._pauseTime = 0;\r\n        this._startPoint = 0;\r\n        this.status = TimeLineStatus.initial;\r\n    }\r\n    Object.defineProperty(TimeLine.prototype, \"rate\", {\r\n        get: function () {\r\n            return this._rate;\r\n        },\r\n        set: function (value) {\r\n            this._rate = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    Object.defineProperty(TimeLine.prototype, \"startPoint\", {\r\n        get: function () {\r\n            return this._startPoint;\r\n        },\r\n        set: function (value) {\r\n            this._startPoint = value;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return TimeLine;\r\n}());\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (TimeLine);\r\n\n\n//# sourceURL=webpack:///./src/css-animation-lib/animation/Timeline.ts?");

/***/ }),

/***/ "./src/entry/entry.ts":
/*!****************************!*\
  !*** ./src/entry/entry.ts ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_animation_lib_animation_Timeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-animation-lib/animation/Timeline */ \"./src/css-animation-lib/animation/Timeline.ts\");\n/* harmony import */ var _css_animation_lib_animation_DOMElementStyleNumberAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css-animation-lib/animation/DOMElementStyleNumberAnimation */ \"./src/css-animation-lib/animation/DOMElementStyleNumberAnimation.ts\");\n/* harmony import */ var _css_animation_lib_algorithm_Type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css-animation-lib/algorithm/Type */ \"./src/css-animation-lib/algorithm/Type.ts\");\n\r\n\r\n\r\nvar tl = new _css_animation_lib_animation_Timeline__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nvar pauseBtn = document.getElementById('pause');\r\nvar resumeBtn = document.getElementById('resume');\r\nif (pauseBtn && resumeBtn) {\r\n    pauseBtn.addEventListener('click', tl.pause);\r\n    resumeBtn.addEventListener('click', tl.resume);\r\n}\r\ntl.addAnimation(new _css_animation_lib_animation_DOMElementStyleNumberAnimation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.getElementById('ball'), 'top', 0, 0, 500, 200, function (v) { return v + \"px\"; }, _css_animation_lib_algorithm_Type__WEBPACK_IMPORTED_MODULE_2__[\"default\"].easeIn));\r\ntl.addAnimation(new _css_animation_lib_animation_DOMElementStyleNumberAnimation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.getElementById('ball'), 'left', 500, 0, 1000, 200, function (v) { return v + \"px\"; }, _css_animation_lib_algorithm_Type__WEBPACK_IMPORTED_MODULE_2__[\"default\"].easeIn));\r\ntl.addAnimation(new _css_animation_lib_animation_DOMElementStyleNumberAnimation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.getElementById('ball'), 'top', 1000, 200, 1500, 0, function (v) { return v + \"px\"; }, _css_animation_lib_algorithm_Type__WEBPACK_IMPORTED_MODULE_2__[\"default\"].easeIn));\r\ntl.addAnimation(new _css_animation_lib_animation_DOMElementStyleNumberAnimation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.getElementById('ball'), 'left', 1500, 200, 2000, 0, function (v) { return v + \"px\"; }, _css_animation_lib_algorithm_Type__WEBPACK_IMPORTED_MODULE_2__[\"default\"].easeIn));\r\ntl.rate = 1;\r\ntl.start();\r\n\n\n//# sourceURL=webpack:///./src/entry/entry.ts?");

/***/ })

/******/ });