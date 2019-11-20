(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function cubicBezier(p1x, p1y, p2x, p2y) {
    var ZERO_LIMIT = 1e-6; // Calculate the polynomial coefficients,
    // implicit first and last control points are (0,0) and (1,1).

    var ax = 3 * p1x - 3 * p2x + 1;
    var bx = 3 * p2x - 6 * p1x;
    var cx = 3 * p1x;
    var ay = 3 * p1y - 3 * p2y + 1;
    var by = 3 * p2y - 6 * p1y;
    var cy = 3 * p1y;

    function sampleCurveDerivativeX(t) {
      // `ax t^3 + bx t^2 + cx t' expanded using Horner 's rule.
      return (3 * ax * t + 2 * bx) * t + cx;
    }

    function sampleCurveX(t) {
      return ((ax * t + bx) * t + cx) * t;
    }

    function sampleCurveY(t) {
      return ((ay * t + by) * t + cy) * t;
    } // Given an x value, find a parametric value it came from.


    function solveCurveX(x) {
      var t2 = x;
      var derivative;
      var x2; // https://trac.webkit.org/browser/trunk/Source/WebCore/platform/animation
      // First try a few iterations of Newton's method -- normally very fast.
      // http://en.wikipedia.org/wiki/Newton's_method

      for (var i = 0; i < 8; i++) {
        // f(t)-x=0
        x2 = sampleCurveX(t2) - x;

        if (Math.abs(x2) < ZERO_LIMIT) {
          return t2;
        }

        derivative = sampleCurveDerivativeX(t2); // == 0, failure

        /* istanbul ignore if */

        if (Math.abs(derivative) < ZERO_LIMIT) {
          break;
        }

        t2 -= x2 / derivative;
      } // Fall back to the bisection method for reliability.
      // bisection
      // http://en.wikipedia.org/wiki/Bisection_method


      var t1 = 1;
      /* istanbul ignore next */

      var t0 = 0;
      /* istanbul ignore next */

      t2 = x;
      /* istanbul ignore next */

      while (t1 > t0) {
        x2 = sampleCurveX(t2) - x;

        if (Math.abs(x2) < ZERO_LIMIT) {
          return t2;
        }

        if (x2 > 0) {
          t1 = t2;
        } else {
          t0 = t2;
        }

        t2 = (t1 + t0) / 2;
      } // Failure


      return t2;
    }

    function solve(x) {
      return sampleCurveY(solveCurveX(x));
    }

    return solve;
  }

  var ease = cubicBezier(0.25, 0.1, 0.25, 1);

  var StyleNumberAnimation =
  /*#__PURE__*/
  function () {
    function StyleNumberAnimation(el, property, startTime, startValue, endTime, endValue, converter) {
      _classCallCheck(this, StyleNumberAnimation);

      this._el = el;
      this._property = property;
      this._startTime = startTime;
      this._startValue = startValue;
      this._endTime = endTime;
      this._endValue = endValue;
      this._converter = converter;
      this._needFixKeyFrame = false;
      this._finish = false;
    }

    _createClass(StyleNumberAnimation, [{
      key: "tick",
      value: function tick(t) {
        if (t >= this._endTime) {
          if (this._needFixKeyFrame) {
            t = this._endTime;
            this._needFixKeyFrame = false;
            this._finish = true;
          } else {
            return;
          }
        } else if (t <= this._startTime) {
          if (this._needFixKeyFrame) {
            t = this._startTime;
            this._needFixKeyFrame = false;
            this._finish = true;
          } else {
            return;
          }
        } else {
          this._needFixKeyFrame = true;
        }

        this._el.style[this._property] = this._converter(ease((t - this._startTime) / (this._endTime - this._startTime)) * (this._endValue - this._startValue) + this._startValue);
      }
    }, {
      key: "finish",
      get: function get() {
        return this._finish;
      }
    }]);

    return StyleNumberAnimation;
  }();

  var Timeline =
  /*#__PURE__*/
  function () {
    // inited, started, paused
    function Timeline() {
      _classCallCheck(this, Timeline);

      this._animations = []; // 记录timeline的状态, inited, started, paused

      this._pauseTime = 0; // 记录总暂停时间累加

      this._rate = 1;
      this._startPoint = 0;
      this.status = 'inited';
      this._startTime = null;
      this.num = 0;
    }

    _createClass(Timeline, [{
      key: "start",
      value: function start() {
        var _this = this;

        if (this.status === 'started') return;
        this.status = 'started';

        if (!this._startTime) {
          this._startTime = Date.now();
        }

        var startTime = Date.now(); // 记录开始时间

        this._tick = function () {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _this._animations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var animation = _step.value;

              if (!animation.finish) {
                console.log(startTime);
                console.log('动画间隔:', Date.now() - startTime);
                animation.tick((Date.now() - startTime - _this._pauseTime) * _this._rate + _this._startPoint);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (_this._tick) {
            console.log('执行下一帧');
            requestAnimationFrame(_this._tick);
          } else {
            console.log('this._tick为null');
          }
        }; // 每一帧需要执行的函数


        requestAnimationFrame(this._tick); // 执行一帧动画
      }
    }, {
      key: "restart",
      value: function restart() {
        var _this2 = this; // TODO: restart的前一帧会出现继续使用上一个startTime的情况


        if (this._tick) {
          this._tick = null;
          this._resumeTick = null;
          console.log('清空this._tick');
        }

        this._startTime = null;
        this.status = 'inited'; // this.start();

        if (this.num === 0) {
          requestAnimationFrame(function () {
            console.log('重新执行');

            _this2.start();
          });
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        if (this.status !== 'started') return;
        this._pauseStart = Date.now(); // 记录暂停时间戳

        this.status = 'paused';
        this._resumeTick = this._tick; // 缓存_tickFunc

        this._tick = null; // 清空_tickFunc，requestAnimationFrame的执行依赖于_tickFunc是否有值
      }
    }, {
      key: "remuse",
      value: function remuse() {
        if (this.status !== 'paused') return;
        this.status = 'started';
        this._pauseTime += Date.now() - this._pauseStart; // 累加暂停时间

        this._tick = this._resumeTick; // 重新为_tick赋值

        requestAnimationFrame(this._tick); // 进行下一帧动画
      }
    }, {
      key: "addAnimation",
      value: function addAnimation(animation) {
        this._animations.push(animation);
      } // removeAnimation(animation) {}

    }, {
      key: "clearAnimations",
      value: function clearAnimations() {
        console.log('clearAnimations');
        this._animations = [];
      }
    }, {
      key: "clearTick",
      value: function clearTick() {
        if (this._tick) {
          this._tick = null;
          this._resumeTick = null;
        }
      }
    }, {
      key: "startPoint",
      set: function set(value) {
        this._startPoint = value;
      },
      get: function get() {
        return this._startPoint;
      }
    }, {
      key: "rate",
      set: function set(value) {
        this._rate = value;
      },
      get: function get() {
        return this._rate;
      }
    }]);

    return Timeline;
  }();

  console.log(Timeline, StyleNumberAnimation);

}());
//# sourceMappingURL=index.js.map
