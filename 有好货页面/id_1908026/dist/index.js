!(function() {
  'use strict';
  var t = function(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  };
  function e(t, e) {
    for (var o = 0; o < e.length; o++) {
      var a = e[o];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        'value' in a && (a.writable = !0),
        Object.defineProperty(t, a.key, a);
    }
  }
  var o = function(t, o, a) {
    return o && e(t.prototype, o), a && e(t, a), t;
  };
  function a(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
  }
  var n = a(function(t) {
    function e(t) {
      return (e =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(t) {
              return typeof t;
            }
          : function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            })(t);
    }
    function o(a) {
      return (
        'function' == typeof Symbol && 'symbol' === e(Symbol.iterator)
          ? (t.exports = o = function(t) {
              return e(t);
            })
          : (t.exports = o = function(t) {
              return t &&
                'function' == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? 'symbol'
                : e(t);
            }),
        o(a)
      );
    }
    t.exports = o;
  });
  var s = function(t) {
    if (void 0 === t)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  };
  var i = function(t, e) {
      return !e || ('object' !== n(e) && 'function' != typeof e) ? s(t) : e;
    },
    r = a(function(t) {
      function e(o) {
        return (
          (t.exports = e = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          e(o)
        );
      }
      t.exports = e;
    }),
    p = a(function(t) {
      function e(o, a) {
        return (
          (t.exports = e =
            Object.setPrototypeOf ||
            function(t, e) {
              return (t.__proto__ = e), t;
            }),
          e(o, a)
        );
      }
      t.exports = e;
    });
  var l = function(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function');
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && p(t, e);
  };
  var d = function(t) {
    if (Array.isArray(t)) {
      for (var e = 0, o = new Array(t.length); e < t.length; e++) o[e] = t[e];
      return o;
    }
  };
  var c = function(t) {
    if (Symbol.iterator in Object(t) || '[object Arguments]' === Object.prototype.toString.call(t))
      return Array.from(t);
  };
  var h = function() {
    throw new TypeError('Invalid attempt to spread non-iterable instance');
  };
  var m = function(t) {
    return d(t) || c(t) || h();
  };
  function u(t, e) {
    var o;
    t.appendChild(
      e instanceof DocumentFragment || e instanceof HTMLElement
        ? e
        : document.createTextNode(
            null == (o = e) ? '' : 'object' === n(o) ? JSON.stringify(o, null, 2) : String(o),
          ),
    );
  }
  function g(t) {
    return t instanceof x;
  }
  var f = Symbol('property'),
    X = Symbol('attribute'),
    _ = Symbol('event'),
    b = Symbol('state'),
    v = Symbol('root'),
    w = Symbol('update'),
    y = Symbol('list'),
    I = Symbol('proxyProps'),
    x = (function() {
      function e(o) {
        t(this, e),
          (this[b] = null),
          (this[f] = o),
          (this[X] = Object.create(null)),
          (this[_] = Object.create(null)),
          (this[v] = document.createDocumentFragment()),
          this[I](),
          (this._mounted = !1);
      }
      return (
        o(e, [
          {
            key: I,
            value: function() {
              this.props = new Proxy(this[f], {
                get: function(t, e) {
                  return t[e];
                },
                set: function(t, e, o, a) {
                  console.log('gengxinle');
                },
              });
            },
          },
          {
            key: 'render',
            value: function() {
              return this[f].children;
            },
          },
          {
            key: 'update',
            value: function() {
              var t = this.render(),
                e = document.createDocumentFragment();
              e.appendChild(this[y]([t])), console.log(e);
              var o = this._childNode[this._childNode.length - 1].nextSibling,
                a = document.createRange();
              a.selectNode(this._childNode[0]);
              var n = a.startOffset;
              a.selectNode(this._childNode[this._childNode.length - 1]);
              var s = a.endOffset;
              a.setStart(this._parentNode, n),
                a.setEnd(this._parentNode, s),
                a.deleteContents(),
                this._parentNode.insertBefore(e, o);
            },
          },
          {
            key: w,
            value: function() {
              console.log('PRIVATE_METHOD_UPDATE');
            },
          },
          {
            key: 'appendTo',
            value: function(t, e) {
              (this._parentNode = e),
                this.appendChild(this.render()),
                (this._childNode = Array.prototype.slice.call(this[v].children).map(function(t) {
                  return t;
                })),
                t.appendChild(this[v]),
                this._mounted
                  ? (this.beforeUpdate(), requestAnimationFrame(this.updated.bind(this)))
                  : (this.beforeMount(),
                    requestAnimationFrame(this.mounted.bind(this)),
                    (this._mounted = !0));
            },
          },
          {
            key: 'appendChild',
            value: function(t) {
              Array.isArray(t) || (t = [t]), this[v].appendChild(this[y](t));
            },
          },
          {
            key: y,
            value: function(t) {
              var e = document.createDocumentFragment(),
                o = !0,
                a = !1,
                n = void 0;
              try {
                for (var s, i = t[Symbol.iterator](); !(o = (s = i.next()).done); o = !0) {
                  var r = s.value;
                  Array.isArray(r)
                    ? e.appendChild(this[y](r))
                    : g(r)
                    ? r.appendTo(e, this[v])
                    : u(e, r);
                }
              } catch (t) {
                (a = !0), (n = t);
              } finally {
                try {
                  o || null == i.return || i.return();
                } finally {
                  if (a) throw n;
                }
              }
              return e;
            },
          },
          { key: 'beforeMount', value: function() {} },
          { key: 'mounted', value: function() {} },
          { key: 'beforeUpdate', value: function() {} },
          { key: 'updated', value: function() {} },
          {
            key: 'getAttribute',
            value: function(t) {
              return 'style' === t ? this._container.getAttribute('style') : this[X][t];
            },
          },
          {
            key: 'setAttribute',
            value: function(t, e) {
              this[X][t] = e;
            },
          },
          {
            key: 'addEventListener',
            value: function(t, e) {
              this[_][t] || (this[_][t] = new Set()), this[_][t].add(e);
            },
          },
          {
            key: 'removeEventListener',
            value: function(t, e) {
              this[_][t] && this[_][t].delete(e);
            },
          },
          {
            key: 'dispatchEvent',
            value: function(t) {
              if (this[_][t]) {
                var e = !0,
                  o = !1,
                  a = void 0;
                try {
                  for (
                    var n, s = this[_][t][Symbol.iterator]();
                    !(e = (n = s.next()).done);
                    e = !0
                  ) {
                    var i = n.value;
                    i.call.apply(i, [this].concat(m(Array.from(arguments).slice(1))));
                  }
                } catch (t) {
                  (o = !0), (a = t);
                } finally {
                  try {
                    e || null == s.return || s.return();
                  } finally {
                    if (o) throw a;
                  }
                }
              }
            },
          },
          {
            key: 'children',
            get: function() {
              return this[f].children;
            },
          },
        ]),
        e
      );
    })(),
    T = (function(e) {
      function a(e, o) {
        var n;
        return (
          t(this, a),
          ((n = i(this, r(a).call(this, o))).type = e),
          (n[v] = document.createElement(e)),
          n
        );
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'getAttribute',
            value: function(t) {
              return this[v].getAttribute(t);
            },
          },
          {
            key: 'setAttribute',
            value: function(t, e) {
              'className' === t ? this[v].setAttribute('class', e) : this[v].setAttribute(t, e);
            },
          },
          {
            key: 'addEventListener',
            value: function(t, e) {
              var o;
              (o = this[v]).addEventListener.apply(o, arguments);
            },
          },
          {
            key: 'removeEventListener',
            value: function(t, e) {
              var o;
              (o = this[v]).removeEventListener.apply(o, arguments);
            },
          },
        ]),
        a
      );
    })(x);
  function C(t, e) {
    e = Object.assign({}, e);
    for (var o = arguments.length, a = new Array(o > 2 ? o - 2 : 0), n = 2; n < o; n++)
      a[n - 2] = arguments[n];
    null !== a && (e.children = a);
    var s = 'string' == typeof t ? new T(t, e) : new t(e);
    for (var i in e)
      'children' !== i &&
        ('function' == typeof e[i] && i.match(/^on([\s\S]+)$/)
          ? s.addEventListener(RegExp.$1.toLowerCase(), e[i])
          : s.setAttribute(i, e[i]));
    return s;
  }
  var k = (function() {
    function t() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : { panDistance: 10, flickSpeed: 0.3, pressDuration: 500, log: !1 };
      !(function(t, e) {
        if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
      })(this, t),
        (this.options = e),
        (this.events = {}),
        (this.log = e.log),
        this.init();
    }
    var e;
    return (
      (e = [
        {
          key: 'init',
          value: function() {
            var t = this,
              e = Object.create(null),
              o = Symbol('mouse');
            (this.events.mousemove = function(a) {
              a.preventDefault(), t.move(a, e[o]);
            }),
              (this.events.mouseend = function(a) {
                document.removeEventListener('mousemove', t.events.mousemove),
                  document.removeEventListener('mouseup', t.events.mouseend),
                  t.end(a, e[o]),
                  delete e[o];
              }),
              (this.events.mousestart = function(a) {
                a.preventDefault(),
                  document.addEventListener('mousemove', t.events.mousemove),
                  document.addEventListener('mouseup', t.events.mouseend),
                  (e[o] = Object.create(null)),
                  t.start(a, e[o]);
              }),
              (this.events.touchstart = function(o) {
                if (o.changedTouches.length > 1) return !1;
                var a = !0,
                  n = !1,
                  s = void 0;
                try {
                  for (
                    var i, r = o.changedTouches[Symbol.iterator]();
                    !(a = (i = r.next()).done);
                    a = !0
                  ) {
                    var p = i.value;
                    (p.currentTarget = o.currentTarget),
                      (e[o.identifier] = Object.create(null)),
                      t.start(p, e[o.identifier]);
                  }
                } catch (t) {
                  (n = !0), (s = t);
                } finally {
                  try {
                    a || null == r.return || r.return();
                  } finally {
                    if (n) throw s;
                  }
                }
              }),
              (this.events.touchmove = function(o) {
                if (o.changedTouches.length > 1) return !1;
                var a = !0,
                  n = !1,
                  s = void 0;
                try {
                  for (
                    var i, r = o.changedTouches[Symbol.iterator]();
                    !(a = (i = r.next()).done);
                    a = !0
                  ) {
                    var p = i.value;
                    t.move(p, e[o.identifier]);
                  }
                } catch (t) {
                  (n = !0), (s = t);
                } finally {
                  try {
                    a || null == r.return || r.return();
                  } finally {
                    if (n) throw s;
                  }
                }
              }),
              (this.events.touchend = function(o) {
                if (o.changedTouches.length > 1) return !1;
                var a = !0,
                  n = !1,
                  s = void 0;
                try {
                  for (
                    var i, r = o.changedTouches[Symbol.iterator]();
                    !(a = (i = r.next()).done);
                    a = !0
                  ) {
                    var p = i.value;
                    t.end(p, e[o.identifier]), delete e[o.identifier];
                  }
                } catch (t) {
                  (n = !0), (s = t);
                } finally {
                  try {
                    a || null == r.return || r.return();
                  } finally {
                    if (n) throw s;
                  }
                }
              }),
              (this.events.touchcancel = function(o) {
                if (o.changedTouches.length > 1) return !1;
                var a = !0,
                  n = !1,
                  s = void 0;
                try {
                  for (
                    var i, r = o.changedTouches[Symbol.iterator]();
                    !(a = (i = r.next()).done);
                    a = !0
                  ) {
                    var p = i.value;
                    t.cancel(p, e[o.identifier]);
                  }
                } catch (t) {
                  (n = !0), (s = t);
                } finally {
                  try {
                    a || null == r.return || r.return();
                  } finally {
                    if (n) throw s;
                  }
                }
              });
          },
        },
        {
          key: 'enable',
          value: function(t) {
            var e = this;
            if (null == t) throw new Error('el is required');
            var o = !1;
            try {
              document.createEvent('TouchEvent'), (o = !0);
            } catch (t) {
              o = !1;
            }
            return (
              o
                ? (t.addEventListener('touchstart', this.events.touchstart, { passive: !1 }),
                  t.addEventListener('touchmove', this.events.touchmove, { passive: !1 }),
                  t.addEventListener('touchend', this.events.touchend),
                  t.addEventListener('touchcancel', this.events.touchcancel))
                : t.addEventListener('mousedown', this.events.mousestart),
              function() {
                t.removeEventListener('mousedown', e.events.mousestart),
                  t.removeEventListener('touchstart', e.events.touchstart),
                  t.removeEventListener('touchmove', e.events.touchmove),
                  t.removeEventListener('touchend', e.events.touchend),
                  t.removeEventListener('touchcancel', e.events.touchcancel);
              }
            );
          },
        },
        {
          key: 'start',
          value: function(t, e) {
            var o = this;
            (e.el = t.currentTarget || t.target),
              (e.startX = t.clientX),
              (e.startY = t.clientY),
              (e.isTap = !0),
              (e.isPan = !1),
              (e.isPress = !1),
              (e.startTime = Date.now()),
              (e.pressHandler = setTimeout(function() {
                (e.isPress = !0), (e.isTap = !1);
                var t = new Event('press');
                o.log && console.log('press'), e.el.dispatchEvent(t), (e.pressHandler = null);
              }, this.options.pressDuration));
          },
        },
        {
          key: 'move',
          value: function(t, e) {
            var o = t.clientX - e.startX,
              a = t.clientY - e.startY;
            if (o * o + a * a > this.options.panDistance * this.options.panDistance) {
              if (null !== e.pressHandler)
                clearTimeout(e.pressHandler), (e.pressHandler = null), (e.isPress = !1);
              else if (e.isPress) {
                e.isPress = !1;
                var n = new Event('presscancel');
                this.log && console.log('presscancel'), e.el.dispatchEvent(n);
              }
              if (((e.isTap = !1), !1 === e.isPan)) {
                (e.isPan = !0),
                  Math.abs(o) > Math.abs(a)
                    ? ((e.isVertical = !1), (e.isHorizontal = !0))
                    : ((e.isVertical = !0), (e.isHorizontal = !1));
                var s = new Event('panstart');
                this.log && console.log('panstart'),
                  (s.startX = e.startX),
                  (s.startY = e.startY),
                  e.el.dispatchEvent(s);
              }
            }
            if (e.isPan) {
              var i = new Event('pan');
              (i.dx = o > 0 ? o - this.options.panDistance : o + this.options.panDistance),
                (i.dy = a),
                (i.isHorizontal = e.isHorizontal),
                (i.isVertical = e.isVertical),
                this.log && console.log('pan'),
                e.el.dispatchEvent(i);
            }
          },
        },
        {
          key: 'end',
          value: function(t, e) {
            if ((null !== e.pressHandler && clearTimeout(e.pressHandler), e.isPress)) {
              var o = new Event('pressend');
              this.log && console.log('pressend'), e.el.dispatchEvent(o);
            }
            if (e.isTap) {
              var a = new Event('tap');
              this.log && console.log('tap'), e.el.dispatchEvent(a);
            }
            var n = t.clientX - e.startX,
              s = t.clientY - e.startY,
              i = Math.sqrt(n * n, s * s) / (Date.now() - e.startTime);
            if (e.isPan && i > this.options.flickSpeed) {
              e.isFlick = !0;
              var r = new Event('flick');
              this.log && console.log('flick'), (r.dx = n), (r.dy = s), e.el.dispatchEvent(r);
            } else e.isFlick = !1;
            if (e.isPan) {
              var p = new Event('panend');
              this.log && console.log('panend'),
                (p.dx = n),
                (p.dy = s),
                (p.isHorizontal = e.isHorizontal),
                (p.isVertical = e.isVertical),
                (p.isFlick = e.isFlick),
                e.el.dispatchEvent(p);
            }
          },
        },
        {
          key: 'cancel',
          value: function(t, e) {
            if (e.isPan) {
              var o = new Event('pancancel');
              e.el.dispatchEvent(o);
            }
            if (e.isPress) {
              var a = new Event('presscancel');
              e.el.dispatchEvent(a);
            }
            if (null !== e.pressHandler) {
              var n = new Event('pancancel');
              e.el.dispatchEvent(n), clearTimeout(e.pressHandler);
            }
          },
        },
      ]) &&
        (function(t, e) {
          for (var o = 0; o < e.length; o++) {
            var a = e[o];
            (a.enumerable = a.enumerable || !1),
              (a.configurable = !0),
              'value' in a && (a.writable = !0),
              Object.defineProperty(t, a.key, a);
          }
        })(t.prototype, e),
      t
    );
  })();
  function S(t, e) {
    if (!(t instanceof e)) throw new TypeError('Cannot call a class as a function');
  }
  function j(t, e) {
    for (var o = 0; o < e.length; o++) {
      var a = e[o];
      (a.enumerable = a.enumerable || !1),
        (a.configurable = !0),
        'value' in a && (a.writable = !0),
        Object.defineProperty(t, a.key, a);
    }
  }
  function N(t, e, o) {
    return e && j(t.prototype, e), o && j(t, o), t;
  }
  var L = (function(t, e, o, a) {
      var n = 1e-6,
        s = 3 * t - 3 * o + 1,
        i = 3 * o - 6 * t,
        r = 3 * t,
        p = 3 * e - 3 * a + 1,
        l = 3 * a - 6 * e,
        d = 3 * e;
      function c(t) {
        return ((s * t + i) * t + r) * t;
      }
      return function(t) {
        return (function(t) {
          return ((p * t + l) * t + d) * t;
        })(
          (function(t) {
            for (var e, o, a, p = t, l = 0; l < 8; l++) {
              if (((o = c(p) - t), Math.abs(o) < n)) return p;
              if (((e = (3 * s * (a = p) + 2 * i) * a + r), Math.abs(e) < n)) break;
              p -= o / e;
            }
            var d = 1,
              h = 0;
            for (p = t; d > h; ) {
              if (((o = c(p) - t), Math.abs(o) < n)) return p;
              o > 0 ? (d = p) : (h = p), (p = (d + h) / 2);
            }
            return p;
          })(t),
        );
      };
    })(0.25, 0.1, 0.25, 1),
    F = (function() {
      function t(e, o, a, n, s, i, r) {
        S(this, t),
          (this._el = e),
          (this._property = o),
          (this._startTime = a),
          (this._startValue = n),
          (this._endTime = s),
          (this._endValue = i),
          (this._converter = r),
          (this._needFixKeyFrame = !1),
          (this._finish = !1);
      }
      return (
        N(t, [
          {
            key: 'tick',
            value: function(t) {
              if (t >= this._endTime) {
                if (!this._needFixKeyFrame) return;
                (t = this._endTime), (this._needFixKeyFrame = !1), (this._finish = !0);
              } else if (t <= this._startTime) {
                if (!this._needFixKeyFrame) return;
                (t = this._startTime), (this._needFixKeyFrame = !1), (this._finish = !0);
              } else this._needFixKeyFrame = !0;
              this._el.style[this._property] = this._converter(
                L((t - this._startTime) / (this._endTime - this._startTime)) *
                  (this._endValue - this._startValue) +
                  this._startValue,
              );
            },
          },
          {
            key: 'finish',
            get: function() {
              return this._finish;
            },
          },
        ]),
        t
      );
    })(),
    O =
      ((function() {
        function t(e, o, a, n, s, i, r) {
          S(this, t),
            (this._el = e),
            (this._property = o),
            (this._startTime = a),
            (this._startValue = n),
            (this._endTime = s),
            (this._endValue = i),
            (this._converter = r),
            (this._needFixKeyFrame = !1),
            (this._finish = !1);
        }
        N(t, [
          {
            key: 'tick',
            value: function(t) {
              if (t >= this._endTime) {
                if (!this._needFixKeyFrame) return;
                (t = this._endTime), (this._needFixKeyFrame = !1), (this._finish = !0);
              } else if (t <= this._startTime) {
                if (!this._needFixKeyFrame) return;
                (t = this._startTime), (this._needFixKeyFrame = !1), (this._finish = !0);
              } else this._needFixKeyFrame = !0;
              for (
                var e = (t - this._startTime) / (this._endTime - this._startTime), o = [], a = 0;
                a < this._endValue.length;
                a++
              )
                o[a] = L(e) * (this._endValue[a] - this._startValue[a]) + this._startValue[a];
              this._el.style[this._property] = this._converter(o);
            },
          },
          {
            key: 'finish',
            get: function() {
              return this._finish;
            },
          },
        ]);
      })(),
      (function() {
        function t() {
          S(this, t),
            (this._animations = []),
            (this._pauseTime = 0),
            (this._rate = 1),
            (this._startPoint = 0),
            (this.status = 'inited'),
            (this._startTime = null),
            (this.num = 0);
        }
        return (
          N(t, [
            {
              key: 'start',
              value: function() {
                var t = this;
                if ('started' !== this.status) {
                  (this.status = 'started'), this._startTime || (this._startTime = Date.now());
                  var e = Date.now();
                  (this._tick = function() {
                    var o = !0,
                      a = !1,
                      n = void 0;
                    try {
                      for (
                        var s, i = t._animations[Symbol.iterator]();
                        !(o = (s = i.next()).done);
                        o = !0
                      ) {
                        var r = s.value;
                        r.finish ||
                          r.tick((Date.now() - e - t._pauseTime) * t._rate + t._startPoint);
                      }
                    } catch (t) {
                      (a = !0), (n = t);
                    } finally {
                      try {
                        o || null == i.return || i.return();
                      } finally {
                        if (a) throw n;
                      }
                    }
                    t._tick && requestAnimationFrame(t._tick);
                  }),
                    requestAnimationFrame(this._tick);
                }
              },
            },
            {
              key: 'restart',
              value: function() {
                var t = this;
                this._tick && ((this._tick = null), (this._resumeTick = null)),
                  (this._startTime = null),
                  (this.status = 'inited'),
                  0 === this.num &&
                    requestAnimationFrame(function() {
                      t.start();
                    });
              },
            },
            {
              key: 'pause',
              value: function() {
                'started' === this.status &&
                  ((this._pauseStart = Date.now()),
                  (this.status = 'paused'),
                  (this._resumeTick = this._tick),
                  (this._tick = null));
              },
            },
            {
              key: 'remuse',
              value: function() {
                'paused' === this.status &&
                  ((this.status = 'started'),
                  (this._pauseTime += Date.now() - this._pauseStart),
                  (this._tick = this._resumeTick),
                  requestAnimationFrame(this._tick));
              },
            },
            {
              key: 'addAnimation',
              value: function(t) {
                this._animations.push(t);
              },
            },
            {
              key: 'clearAnimations',
              value: function() {
                this._animations = [];
              },
            },
            {
              key: 'clearTick',
              value: function() {
                this._tick && ((this._tick = null), (this._resumeTick = null));
              },
            },
            {
              key: 'startPoint',
              set: function(t) {
                this._startPoint = t;
              },
              get: function() {
                return this._startPoint;
              },
            },
            {
              key: 'rate',
              set: function(t) {
                this._rate = t;
              },
              get: function() {
                return this._rate;
              },
            },
          ]),
          t
        );
      })()),
    P = Symbol('attribute'),
    V = Symbol('property'),
    B = Symbol('event'),
    M = Symbol('state'),
    U = new k(),
    H = (function(e) {
      function a(e) {
        var o;
        return (
          t(this, a),
          ((o = i(this, r(a).call(this, e)))[P] = Object.create(null)),
          (o[V] = Object.create(null)),
          (o[B] = Object.create(null)),
          (o[M] = Object.create(null)),
          o
        );
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              console.log('Carousel mounted'), this.init();
            },
          },
          {
            key: 'render',
            value: function() {
              return C(
                'div',
                { class: 'carousel' },
                (
                  this.props.data || [
                    'http://gw.alicdn.com/imgextra/i3/1618197344/O1CN01ojvFXL247bENVZDBI_!!1618197344-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp',
                    'http://gw.alicdn.com/imgextra/i3/626230892/O1CN01a08iOp1ISZp3xGcTx_!!626230892-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp',
                    'http://gw.alicdn.com/imgextra/i1/1739653505/TB2YjeTlDqWBKNjSZFxXXcpLpXa_!!1739653505-0-beehive-scenes.jpg_790x10000Q75.jpg_.webp',
                  ]
                ).map(function(t) {
                  return C(
                    'div',
                    { className: 'carousel_item' },
                    C('img', { src: t.coverPic, alt: '', style: 'width: 100%;height:100%' }),
                    C(
                      'div',
                      { className: 'carousel_item_inner' },
                      C(
                        'div',
                        { className: 'fashionTag', style: t.fashionTag || 'display:none' },
                        t.fashionTag,
                      ),
                      C('div', { className: 'title' }, t.title),
                      C(
                        'div',
                        { className: 'shopName' },
                        C('img', {
                          src:
                            'http://gw.alicdn.com/tfs/TB1UfHJlQCWBuNjy0FaXXXUlXXa-52-48.png_110x10000.jpg_.webp',
                          alt: '',
                          style: 'width:13px;height12px;margin-right:3px',
                        }),
                        t.shopName,
                      ),
                      C(
                        'div',
                        { className: 'shopItem' },
                        t.shopItemVOs.map(function(t) {
                          return C('img', { src: t.itemPic, alt: '' });
                        }),
                      ),
                    ),
                  );
                }),
              );
            },
          },
          {
            key: 'init',
            value: function() {
              var t = this;
              (this._container = document.querySelector('.carousel')),
                (this._width = Number(getComputedStyle(this._container).width.replace('px', ''))),
                (this._container.style.height = (170 * this._width) / 351 + 'px');
              var e = Array.prototype.slice.call(document.querySelector('.carousel').children),
                o = 0,
                a = 0,
                n = new O(),
                s = (U.enable(document.querySelector('.carousel')), 0);
              this._container.addEventListener('mousedown', function(e) {
                e.preventDefault(), n.pause();
                var o = Date.now();
                (s = o - a < 500 ? 500 - 500 * L((o - a) / 500) : 0), clearTimeout(t._handler);
              }),
                this._container.addEventListener('touchstart', function(e) {
                  e.preventDefault(), n.pause();
                  var o = Date.now();
                  (s = o - a < 500 ? 500 - 500 * L((o - a) / 500) : 0), clearTimeout(t._handler);
                }),
                this._container.addEventListener('pan', function(a) {
                  if (!a.isVertical) {
                    var n = (e.length + o - 1) % e.length,
                      i = (o + 1) % e.length,
                      r = e[n],
                      p = e[o],
                      l = e[i];
                    (r.style.transition = 'ease 0s'),
                      (r.style.transform = 'translate(\n          '.concat(
                        -t._width - t._width * n + a.dx + s,
                        'px\n        )',
                      )),
                      (p.style.transition = 'ease 0s'),
                      (p.style.transform = 'translate(\n          '.concat(
                        -t._width * o + a.dx + s,
                        'px\n        )',
                      )),
                      (l.style.transition = 'ease 0s'),
                      (l.style.transform = 'translate(\n          '.concat(
                        t._width - t._width * i + a.dx + s,
                        'px\n        )',
                      ));
                  }
                }),
                this._container.addEventListener('panend', function(a) {
                  if (!a.isVertical) {
                    var n;
                    a.isFlick && Math.abs(a.dx) > Math.abs(a.dy)
                      ? a.dx > 0
                        ? ((o -= 1), (n = !0))
                        : ((o += 1), (n = !1))
                      : a.dx + s >= t._width / 2
                      ? ((o -= 1), (n = !0))
                      : a.dx + s <= -t._width / 2
                      ? ((o += 1), (n = !1))
                      : (n = a.dx + s < 0),
                      (o = (e.length + o) % e.length);
                    var i = e[o],
                      r = (e.length + o - 1) % e.length,
                      p = (o + 1) % e.length,
                      l = e[r],
                      d = e[p];
                    n
                      ? ((d.style.transition = ''), (l.style.transition = 'ease 0s'))
                      : ((d.style.transition = 'ease 0s'), (l.style.transition = '')),
                      (i.style.transition = ''),
                      (l.style.transform = 'translate(\n          '.concat(
                        -t._width - t._width * r,
                        'px\n        )',
                      )),
                      (i.style.transform = 'translate(\n          '.concat(
                        -t._width * o,
                        'px\n        )',
                      )),
                      (d.style.transform = 'translate(\n          '.concat(
                        t._width - t._width * p,
                        'px\n        )',
                      ));
                  }
                }),
                this._container.addEventListener('mousedown', function(t) {
                  t.preventDefault();
                }),
                (this._handler = setTimeout(function s() {
                  var i = (o + 1) % e.length,
                    r = [e[o], e[i]],
                    p = r[0],
                    l = r[1];
                  (l.style.transition = 'ease 0s'),
                    (l.style.transform = 'translate(\n          '.concat(
                      t._width - t._width * i,
                      'px\n        )',
                    )),
                    (a = Date.now()),
                    n.clearAnimations(),
                    n.addAnimation(
                      new F(
                        p,
                        'transform',
                        0,
                        -t._width * o,
                        500,
                        -t._width - t._width * o,
                        function(t) {
                          return 'translateX('.concat(t, 'px)');
                        },
                      ),
                    ),
                    n.addAnimation(
                      new F(
                        l,
                        'transform',
                        0,
                        t._width - t._width * i,
                        500,
                        -t._width * i,
                        function(t) {
                          return 'translateX('.concat(t, 'px)');
                        },
                      ),
                    ),
                    n.restart(),
                    (o = i),
                    (t._handler = setTimeout(s, 3e3));
                }, 3e3));
            },
          },
        ]),
        a
      );
    })(x),
    E = a(function(t) {
      var e = (function(t) {
        var e,
          o = Object.prototype,
          a = o.hasOwnProperty,
          n = 'function' == typeof Symbol ? Symbol : {},
          s = n.iterator || '@@iterator',
          i = n.asyncIterator || '@@asyncIterator',
          r = n.toStringTag || '@@toStringTag';
        function p(t, e, o, a) {
          var n = e && e.prototype instanceof g ? e : g,
            s = Object.create(n.prototype),
            i = new k(a || []);
          return (
            (s._invoke = (function(t, e, o) {
              var a = d;
              return function(n, s) {
                if (a === h) throw new Error('Generator is already running');
                if (a === m) {
                  if ('throw' === n) throw s;
                  return j();
                }
                for (o.method = n, o.arg = s; ; ) {
                  var i = o.delegate;
                  if (i) {
                    var r = x(i, o);
                    if (r) {
                      if (r === u) continue;
                      return r;
                    }
                  }
                  if ('next' === o.method) o.sent = o._sent = o.arg;
                  else if ('throw' === o.method) {
                    if (a === d) throw ((a = m), o.arg);
                    o.dispatchException(o.arg);
                  } else 'return' === o.method && o.abrupt('return', o.arg);
                  a = h;
                  var p = l(t, e, o);
                  if ('normal' === p.type) {
                    if (((a = o.done ? m : c), p.arg === u)) continue;
                    return { value: p.arg, done: o.done };
                  }
                  'throw' === p.type && ((a = m), (o.method = 'throw'), (o.arg = p.arg));
                }
              };
            })(t, o, i)),
            s
          );
        }
        function l(t, e, o) {
          try {
            return { type: 'normal', arg: t.call(e, o) };
          } catch (t) {
            return { type: 'throw', arg: t };
          }
        }
        t.wrap = p;
        var d = 'suspendedStart',
          c = 'suspendedYield',
          h = 'executing',
          m = 'completed',
          u = {};
        function g() {}
        function f() {}
        function X() {}
        var _ = {};
        _[s] = function() {
          return this;
        };
        var b = Object.getPrototypeOf,
          v = b && b(b(S([])));
        v && v !== o && a.call(v, s) && (_ = v);
        var w = (X.prototype = g.prototype = Object.create(_));
        function y(t) {
          ['next', 'throw', 'return'].forEach(function(e) {
            t[e] = function(t) {
              return this._invoke(e, t);
            };
          });
        }
        function I(t) {
          var e;
          this._invoke = function(o, n) {
            function s() {
              return new Promise(function(e, s) {
                !(function e(o, n, s, i) {
                  var r = l(t[o], t, n);
                  if ('throw' !== r.type) {
                    var p = r.arg,
                      d = p.value;
                    return d && 'object' == typeof d && a.call(d, '__await')
                      ? Promise.resolve(d.__await).then(
                          function(t) {
                            e('next', t, s, i);
                          },
                          function(t) {
                            e('throw', t, s, i);
                          },
                        )
                      : Promise.resolve(d).then(
                          function(t) {
                            (p.value = t), s(p);
                          },
                          function(t) {
                            return e('throw', t, s, i);
                          },
                        );
                  }
                  i(r.arg);
                })(o, n, e, s);
              });
            }
            return (e = e ? e.then(s, s) : s());
          };
        }
        function x(t, o) {
          var a = t.iterator[o.method];
          if (a === e) {
            if (((o.delegate = null), 'throw' === o.method)) {
              if (
                t.iterator.return &&
                ((o.method = 'return'), (o.arg = e), x(t, o), 'throw' === o.method)
              )
                return u;
              (o.method = 'throw'),
                (o.arg = new TypeError("The iterator does not provide a 'throw' method"));
            }
            return u;
          }
          var n = l(a, t.iterator, o.arg);
          if ('throw' === n.type)
            return (o.method = 'throw'), (o.arg = n.arg), (o.delegate = null), u;
          var s = n.arg;
          return s
            ? s.done
              ? ((o[t.resultName] = s.value),
                (o.next = t.nextLoc),
                'return' !== o.method && ((o.method = 'next'), (o.arg = e)),
                (o.delegate = null),
                u)
              : s
            : ((o.method = 'throw'),
              (o.arg = new TypeError('iterator result is not an object')),
              (o.delegate = null),
              u);
        }
        function T(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function C(t) {
          var e = t.completion || {};
          (e.type = 'normal'), delete e.arg, (t.completion = e);
        }
        function k(t) {
          (this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(T, this), this.reset(!0);
        }
        function S(t) {
          if (t) {
            var o = t[s];
            if (o) return o.call(t);
            if ('function' == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var n = -1,
                i = function o() {
                  for (; ++n < t.length; )
                    if (a.call(t, n)) return (o.value = t[n]), (o.done = !1), o;
                  return (o.value = e), (o.done = !0), o;
                };
              return (i.next = i);
            }
          }
          return { next: j };
        }
        function j() {
          return { value: e, done: !0 };
        }
        return (
          (f.prototype = w.constructor = X),
          (X.constructor = f),
          (X[r] = f.displayName = 'GeneratorFunction'),
          (t.isGeneratorFunction = function(t) {
            var e = 'function' == typeof t && t.constructor;
            return !!e && (e === f || 'GeneratorFunction' === (e.displayName || e.name));
          }),
          (t.mark = function(t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, X)
                : ((t.__proto__ = X), r in t || (t[r] = 'GeneratorFunction')),
              (t.prototype = Object.create(w)),
              t
            );
          }),
          (t.awrap = function(t) {
            return { __await: t };
          }),
          y(I.prototype),
          (I.prototype[i] = function() {
            return this;
          }),
          (t.AsyncIterator = I),
          (t.async = function(e, o, a, n) {
            var s = new I(p(e, o, a, n));
            return t.isGeneratorFunction(o)
              ? s
              : s.next().then(function(t) {
                  return t.done ? t.value : s.next();
                });
          }),
          y(w),
          (w[r] = 'Generator'),
          (w[s] = function() {
            return this;
          }),
          (w.toString = function() {
            return '[object Generator]';
          }),
          (t.keys = function(t) {
            var e = [];
            for (var o in t) e.push(o);
            return (
              e.reverse(),
              function o() {
                for (; e.length; ) {
                  var a = e.pop();
                  if (a in t) return (o.value = a), (o.done = !1), o;
                }
                return (o.done = !0), o;
              }
            );
          }),
          (t.values = S),
          (k.prototype = {
            constructor: k,
            reset: function(t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = e),
                (this.done = !1),
                (this.delegate = null),
                (this.method = 'next'),
                (this.arg = e),
                this.tryEntries.forEach(C),
                !t)
              )
                for (var o in this)
                  't' === o.charAt(0) && a.call(this, o) && !isNaN(+o.slice(1)) && (this[o] = e);
            },
            stop: function() {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ('throw' === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function(t) {
              if (this.done) throw t;
              var o = this;
              function n(a, n) {
                return (
                  (r.type = 'throw'),
                  (r.arg = t),
                  (o.next = a),
                  n && ((o.method = 'next'), (o.arg = e)),
                  !!n
                );
              }
              for (var s = this.tryEntries.length - 1; s >= 0; --s) {
                var i = this.tryEntries[s],
                  r = i.completion;
                if ('root' === i.tryLoc) return n('end');
                if (i.tryLoc <= this.prev) {
                  var p = a.call(i, 'catchLoc'),
                    l = a.call(i, 'finallyLoc');
                  if (p && l) {
                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                  } else if (p) {
                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                  } else {
                    if (!l) throw new Error('try statement without catch or finally');
                    if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                  }
                }
              }
            },
            abrupt: function(t, e) {
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var n = this.tryEntries[o];
                if (n.tryLoc <= this.prev && a.call(n, 'finallyLoc') && this.prev < n.finallyLoc) {
                  var s = n;
                  break;
                }
              }
              s &&
                ('break' === t || 'continue' === t) &&
                s.tryLoc <= e &&
                e <= s.finallyLoc &&
                (s = null);
              var i = s ? s.completion : {};
              return (
                (i.type = t),
                (i.arg = e),
                s ? ((this.method = 'next'), (this.next = s.finallyLoc), u) : this.complete(i)
              );
            },
            complete: function(t, e) {
              if ('throw' === t.type) throw t.arg;
              return (
                'break' === t.type || 'continue' === t.type
                  ? (this.next = t.arg)
                  : 'return' === t.type
                  ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
                  : 'normal' === t.type && e && (this.next = e),
                u
              );
            },
            finish: function(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var o = this.tryEntries[e];
                if (o.finallyLoc === t) return this.complete(o.completion, o.afterLoc), C(o), u;
              }
            },
            catch: function(t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var o = this.tryEntries[e];
                if (o.tryLoc === t) {
                  var a = o.completion;
                  if ('throw' === a.type) {
                    var n = a.arg;
                    C(o);
                  }
                  return n;
                }
              }
              throw new Error('illegal catch attempt');
            },
            delegateYield: function(t, o, a) {
              return (
                (this.delegate = { iterator: S(t), resultName: o, nextLoc: a }),
                'next' === this.method && (this.arg = e),
                u
              );
            },
          }),
          t
        );
      })(t.exports);
      try {
        regeneratorRuntime = e;
      } catch (t) {
        Function('r', 'regeneratorRuntime = r')(e);
      }
    }),
    A = Symbol('state'),
    R = (function(e) {
      function a(e) {
        var o;
        return (
          t(this, a),
          ((o = i(this, r(a).call(this, e)))[A] = Object.create(null)),
          (o[A].position = 0),
          (o[A].loading = !1),
          o
        );
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              var t = this;
              (this.scrollDom = this._childNode[0].querySelector('.comt-scroll')),
                (this.backTopDom = this._childNode[0].querySelector('.back-top')),
                this.scrollDom.addEventListener(
                  'scroll',
                  (function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
                      o = 0;
                    return function() {
                      var a = Date.now();
                      if (a - o >= e) {
                        o = a;
                        for (var n = arguments.length, s = new Array(n), i = 0; i < n; i++)
                          s[i] = arguments[i];
                        t.apply(this, s);
                      }
                    };
                  })(function(e) {
                    return E.async(function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            t.scrollDom.scrollTop > 275
                              ? (t.backTopDom.style.display = 'block')
                              : (t.backTopDom.style.display = 'none'),
                              t.scrollDom.scrollTop >=
                                t.scrollDom.scrollHeight -
                                  t.scrollDom.getBoundingClientRect().height -
                                  20 &&
                                !t[A].loading &&
                                ((t[A].loading = !0), t.dispatchEvent('scrollbottom', 2));
                          case 2:
                          case 'end':
                            return e.stop();
                        }
                    });
                  }),
                );
            },
          },
          {
            key: 'render',
            value: function() {
              return C(
                'div',
                { className: 'tab_content_item scroll_wrapper' },
                C(
                  'div',
                  { className: 'comt-scroll' },
                  C('div', { className: 'scroll_inner' }, this.props.children),
                  C(
                    'div',
                    { className: 'scroll_footer' },
                    C('div', {
                      style: 'width:31px;height:1px;background-color: rgb(216, 216, 216);',
                    }),
                    C('div', null, '人家是有底线的啦'),
                    C('div', {
                      style: 'width:31px;height:1px;background-color: rgb(216, 216, 216);',
                    }),
                  ),
                ),
                C(
                  'div',
                  { className: 'back-top', onClick: this.backTop.bind(this) },
                  C('img', {
                    src:
                      'http://gw.alicdn.com/tfs/TB1hH4MQVXXXXXhXpXXXXXXXXXX-108-108.png_110x10000.jpg_.webp',
                    alt: '',
                  }),
                ),
              );
            },
          },
          {
            key: 'backTop',
            value: function() {
              var t = this;
              this.timer ||
                (this.timer = setInterval(function() {
                  t.scrollDom.scrollTop > 0
                    ? (t.scrollDom.scrollTop -= t.scrollDom.scrollTop / 10)
                    : ((t.scrollDom.scrollTop = 0),
                      (t.backTopDom.style.display = 'none'),
                      clearInterval(t.timer),
                      (t.timer = null));
                }, 16.6));
            },
          },
        ]),
        a
      );
    })(x),
    D = new k(),
    G = Symbol('attribute'),
    Z = Symbol('property'),
    q = Symbol('event'),
    K = Symbol('state'),
    Q = (function(e) {
      function a(e) {
        var o;
        return (
          t(this, a),
          ((o = i(this, r(a).call(this, e)))[G] = Object.create(null)),
          (o[Z] = Object.create(null)),
          (o[q] = Object.create(null)),
          (o[K] = Object.create(null)),
          (o[K].position = 0),
          o
        );
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              console.log('Tab mounted'),
                (this.tabHeader = document.querySelector('.comt-tab .tab_header')),
                (this.tabBarleftMap = this.getTabBarLeftMap()),
                (this.tabContent = document.querySelector('.comt-tab .tab_content')),
                this.init();
            },
          },
          {
            key: 'render',
            value: function() {
              return C(
                'div',
                { className: 'comt-tab' },
                C(
                  'div',
                  { className: 'tab_header', onClick: this.handleTabClick.bind(this) },
                  C('div', { className: 'tab_bar--active' }),
                  this.props.children.map(function(t, e) {
                    return C('div', { 'data-index': e }, t.props.title);
                  }),
                ),
                C(
                  'div',
                  { className: 'tab_content' },
                  this.props.children.map(function(t) {
                    return t;
                  }),
                ),
              );
            },
          },
          {
            key: 'init',
            value: function() {
              var t = this;
              D.enable(this.tabContent);
              var e = this.tabContent.getBoundingClientRect().width,
                o = !0,
                a = !1,
                n = void 0;
              try {
                for (
                  var s, i = this.tabContent.children[Symbol.iterator]();
                  !(o = (s = i.next()).done);
                  o = !0
                ) {
                  var r = s.value;
                  (r.style.transition = 'ease 0s'),
                    (r.style.transform = 'translate('.concat(-this[K].position * e, 'px)'));
                }
              } catch (t) {
                (a = !0), (n = t);
              } finally {
                try {
                  o || null == i.return || i.return();
                } finally {
                  if (a) throw n;
                }
              }
              this.tabContent.addEventListener('pan', function(e) {
                if ((console.log(111), !e.isVertical)) {
                  var o = t.tabContent.getBoundingClientRect().width,
                    a = e.dx;
                  0 === t[K].position && e.dx > 0 && (a = e.dx / 3),
                    t[K].position === t.tabContent.children.length - 1 &&
                      e.dx < 0 &&
                      (a = e.dx / 3);
                  var n = !0,
                    s = !1,
                    i = void 0;
                  try {
                    for (
                      var r, p = t.tabContent.children[Symbol.iterator]();
                      !(n = (r = p.next()).done);
                      n = !0
                    ) {
                      var l = r.value;
                      (l.style.transition = 'ease 0s'),
                        (l.style.transform = 'translate('.concat(a - t[K].position * o, 'px)'));
                    }
                  } catch (t) {
                    (s = !0), (i = t);
                  } finally {
                    try {
                      n || null == p.return || p.return();
                    } finally {
                      if (s) throw i;
                    }
                  }
                }
              }),
                this.tabContent.addEventListener('panend', function(e) {
                  if (!e.isVertical) {
                    var o = t.tabContent.getBoundingClientRect().width;
                    e.isFlick && Math.abs(e.dx) > Math.abs(e.dy)
                      ? e.dx > 0
                        ? (t[K].position -= 1)
                        : (t[K].position += 1)
                      : e.dx >= o / 2
                      ? (t[K].position -= 1)
                      : e.dx <= -o / 2
                      ? (t[K].position += 1)
                      : e.dx,
                      t[K].position < 0 && (t[K].position = 0),
                      t[K].position > t.tabContent.children.length - 1 &&
                        (t[K].position = t.tabContent.children.length - 1),
                      t.goTo(t[K].position);
                  }
                });
            },
          },
          {
            key: 'handleTabClick',
            value: function(t) {
              null != t.target.dataset.index &&
                ((this[K].position = Number(t.target.dataset.index)), this.goTo(this[K].position));
            },
          },
          {
            key: 'goTo',
            value: function(t) {
              t = Number(t);
              var e = this.tabContent.getBoundingClientRect().width,
                o = !0,
                a = !1,
                n = void 0;
              try {
                for (
                  var s, i = this.tabContent.children[Symbol.iterator]();
                  !(o = (s = i.next()).done);
                  o = !0
                ) {
                  var r = s.value;
                  (r.style.transition = 'ease 0.5s'),
                    (r.style.transform = 'translate('.concat(-t * e, 'px)'));
                }
              } catch (t) {
                (a = !0), (n = t);
              } finally {
                try {
                  o || null == i.return || i.return();
                } finally {
                  if (a) throw n;
                }
              }
              this.changeTabBar();
            },
          },
          {
            key: 'changeTabBar',
            value: function() {
              this.activeBar || (this.activeBar = document.querySelector('.tab_bar--active'));
              var t = this.tabHeader.children,
                e = !0,
                o = !1,
                a = void 0;
              try {
                for (var n, s = t[Symbol.iterator](); !(e = (n = s.next()).done); e = !0) {
                  var i = n.value;
                  Number(i.dataset.index) == this[K].position
                    ? (i.style.fontWeight = 'bold')
                    : (i.style.fontWeight = 'normal');
                }
              } catch (t) {
                (o = !0), (a = t);
              } finally {
                try {
                  e || null == s.return || s.return();
                } finally {
                  if (o) throw a;
                }
              }
              this.activeBar.style.left = this.tabBarleftMap[this[K].position];
            },
          },
          {
            key: 'getTabBarLeftMap',
            value: function() {
              var t = {},
                e = 0;
              return (
                Array.from(this.tabHeader.children)
                  .slice(1)
                  .forEach(function(o, a) {
                    0 === a && (o.style.fontWeight = 'bold'),
                      (t[o.dataset.index] =
                        (Number(getComputedStyle(o).width.replace('px', '')) - 21) / 2 +
                        24 * a +
                        e +
                        'px'),
                      (e += Number(getComputedStyle(o).width.replace('px', '')));
                  }),
                (this.tabHeader.style.width = e + 24 * (this.props.children.length - 1) + 'px'),
                t
              );
            },
          },
        ]),
        a
      );
    })(x),
    z = Symbol('state'),
    Y = (function(e) {
      function a(e) {
        var o;
        return (
          t(this, a),
          ((o = i(this, r(a).call(this, e)))[z] = Object.create(null)),
          (o[z].loading = !1),
          (o[z].position = 2),
          o
        );
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              (this.img = Array.from(this._childNode[0].children)[0]), this.changeActive();
            },
          },
          {
            key: 'render',
            value: function() {
              var t = this.props.data || [];
              return C(
                'div',
                {
                  className: 'switch-button',
                  style: 'width: '.concat(56.67 * t.length, 'px'),
                  onClick: this.buttonClick.bind(this),
                },
                C('img', {
                  src:
                    'http://gw.alicdn.com/tfs/TB1PqAvCwHqK1RjSZFkXXX.WFXa-120-42.png_140x10000.jpg_.webp',
                  alt: '',
                }),
                t.map(function(t, e) {
                  return C('span', { className: 'switch-button_item', 'data-index': e }, t.title);
                }),
              );
            },
          },
          {
            key: 'buttonClick',
            value: function(t) {
              var e = Number(t.target.dataset.index);
              this[z].position === e ||
                isNaN(e) ||
                ((this[z].position = e), this.changeActive(), this.dispatchEvent('click', e));
            },
          },
          {
            key: 'changeActive',
            value: function() {
              var t = this;
              (this.img.style.left = 56.67 * this[z].position - 1 + 'px'),
                Array.from(this._childNode[0].children).forEach(function(e, o) {
                  Number(e.dataset.index) === t[z].position
                    ? e.classList.add('switch-button_item--active')
                    : e.classList.remove('switch-button_item--active');
                });
            },
          },
        ]),
        a
      );
    })(x),
    W = (function(e) {
      function a(e) {
        return t(this, a), i(this, r(a).call(this, e));
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              return E.async(function(t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      console.log('RecommendList mounted');
                    case 1:
                    case 'end':
                      return t.stop();
                  }
              });
            },
          },
          {
            key: 'render',
            value: function() {
              var t = this.props.data || [1];
              return C(
                'div',
                { className: 'recommend-list' },
                (t = t.filter(function(t) {
                  return 'shop' === t.showType;
                })).map(function(t) {
                  return C(
                    'div',
                    { className: 'recommend-item' },
                    C(
                      'div',
                      { className: 'recommend_header' },
                      C(
                        'div',
                        { className: 'recommend_header_left' },
                        C('img', { className: 'avatar', src: t.shopLogo, alt: '加载失败' }),
                      ),
                      C(
                        'div',
                        { className: 'recommend_header_middle' },
                        C('div', { className: 'title' }, t.shopName),
                        C(
                          'div',
                          { className: 'star' },
                          C('img', { src: t.shopLevelImg, alt: 'star' }),
                        ),
                      ),
                      C('div', { className: 'recommend_header_right' }, '进店'),
                    ),
                    C(
                      'div',
                      { className: 'recommend_content' },
                      C(
                        'div',
                        { className: 'recommend_content_desc' },
                        'FANS' === t.shopRecommendReason.type
                          ? C('img', { src: t.shopRecommendReason.icon, alt: 'desc' })
                          : C(
                              'div',
                              { className: 'daren' },
                              C('img', { src: t.shopRecommendReason.icon, alt: 'desc' }),
                              C('img', {
                                className: 'daren-logo',
                                src:
                                  'http://gw.alicdn.com/tfs/TB1EwtbCBLoK1RjSZFuXXXn0XXa-42-42.png_110x10000.jpg_.webp',
                                alt: '',
                              }),
                            ),
                        C('span', { className: 'reason' }, t.shopRecommendReason.text),
                      ),
                      C(
                        'div',
                        { className: 'recommend_content_product' },
                        [t.shopItemVOs.shift()].map(function(t) {
                          return C(
                            'div',
                            { className: 'product_left' },
                            C('img', { src: t.itemPic, alt: '加载失败' }),
                            C('div', { className: 'product_left_inner' }),
                          );
                        }),
                        C(
                          'div',
                          { className: 'product_right' },
                          t.shopItemVOs.map(function(t, e) {
                            return C(
                              'div',
                              { className: 0 === e ? 'product_right_top' : 'product_right_bottom' },
                              C('img', { src: t.itemPic, alt: '加载失败' }),
                              C('div', { className: 'product_right_inner' }),
                            );
                          }),
                        ),
                      ),
                    ),
                    C('div', { className: 'recommend_footer' }, '相似好店>'),
                  );
                }),
              );
            },
          },
        ]),
        a
      );
    })(x),
    J = [
      {
        showType: 'bannerList',
        bannerFeeds: [
          {
            columnId: '9688',
            shopLogo: '//gw.alicdn.com/bao/uploaded//01/51/TB1ZMVVRpXXXXcdXVXXSutbFXXX.jpg',
            contentId: '231849274911',
            shopName: '三蚊鱼',
            algArgs: '231849274911-440041467-ContentPost',
            shopItemVOs: [
              {
                itemId: '605605102337',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i3/440041467/O1CN01ets78q1MhvapScVnF_!!440041467.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=605605102337&rmdChannelCode=goodShop',
              },
              {
                itemId: '581921594145',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/440041467/O1CN01SOodV61MhvVGXf1dL_!!440041467.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=581921594145&rmdChannelCode=goodShop',
              },
              {
                itemId: '576005931355',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i2/440041467/O1CN01V8jp9Y1MhvaEOUHnd_!!0-item_pic.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=576005931355&rmdChannelCode=goodShop',
              },
            ],
            title: '矮星人的夏天！这12家美衣可不止显高',
            shopUrl: '//shop151335791.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"440041467"}',
            postsUrl:
              'https://market.m.taobao.com/apps/market/content/index.html?contentId=231849274911&source=magicshop&wh_weex=true&wx_navbar_transparent=true&business_spm=a1z67.11776583',
            sellerId: '440041467',
            goldShop: '1',
            appId: '8644',
            showType: 'godShop',
            verticalPic:
              'https://img.alicdn.com/imgextra/i4/1709365317/O1CN017vDMfZ1p9EQZJUeKq_!!1709365317-0-daren.jpg',
            coverPic:
              'https://img.alicdn.com/imgextra/i3/1709365317/O1CN01nbaoqc1p9EQcD2kMd_!!1709365317-0-daren.jpg',
            shopId: '151335791',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
          {
            trackInfo:
              '1007.18644.126410.100200300000000:0b931749-6965-4efa-8dbf-3d33c9611ebf:0:202088137271:133849180:9688:2:4:564710820375_538499706995_26491856210:0.000:0:0.002:0:1:0:0:0:0.000',
            columnId: '9688',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded///img.alicdn.com//e4/48/TB1qh2AKFXXXXbdXFXXSutbFXXX.jpg',
            contentId: '202088137271',
            shopName: '哟不烂原创手工',
            algArgs: '202088137271-133849180-ContentPost',
            shopItemVOs: [
              {
                itemId: '564710820375',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i4/133849180/TB2eJ_3AuGSBuNjSspbXXciipXa_!!133849180.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=564710820375&rmdChannelCode=goodShop',
              },
              {
                itemId: '538499706995',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/133849180/TB2JnIAcP7nBKNjSZLeXXbxCFXa_!!133849180.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=538499706995&rmdChannelCode=goodShop',
              },
              {
                itemId: '26491856210',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/133849180/T2c0aBXftbXXXXXXXX_!!133849180.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=26491856210&rmdChannelCode=goodShop',
              },
            ],
            title: '皮带玩转潮搭，和质感手作来场腰间碰撞',
            contentDesc:
              '这是一家原创手工皮具店，不靠捧上天的包装只靠优质的手作，精选优质头层牛皮，带你感受复古与休闲的结合韵味。 ',
            shopUrl: '//shop36766100.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"133849180"}',
            postsUrl:
              'https://market.m.taobao.com/apps/market/content/index.html?contentId=202088137271&source=magicshop&wh_weex=true&wx_navbar_transparent=true&business_spm=a1z67.11776583',
            sellerId: '133849180',
            goldShop: '0',
            appId: '8644',
            showType: 'godShop',
            verticalPic:
              '//img.alicdn.com/imgextra/i2/2155022199/TB2c7tEG3aTBuNjSszfXXXgfpXa_!!2155022199-0-beehive-scenes.jpg',
            coverPic:
              '//img.alicdn.com/imgextra/i3/2155022199/TB2NH5CdXyZBuNjt_jJXXbDlXXa_!!2155022199-0-beehive-scenes.jpg',
            shopId: '36766100',
            detailPic:
              '//img.alicdn.com/imgextra/i2/2155022199/TB2lRQcG4WYBuNjy1zkXXXGGpXa_!!2155022199-0-beehive-scenes.jpg',
            tmall: 'false',
            fashionTag: '皮带手作美学',
            shopLevelImg: '//gtms03.alicdn.com/tps/i3/TB17xgqFXXXXXbMaFXXaYjxHXXX-51-24.png',
          },
        ],
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:ff189c97-badc-4caf-986a-40fdd0c94ef1:0:14536478:14536478:6001:2:1:606537747110_605394637989_605423305335:0.000:0:0.003:0:1:0:0:0:0.000',
        hasSellerCoupon: 'false',
        columnId: '6001',
        shopLogo: '//gw.alicdn.com/bao/uploaded//16/45/TB17fTikL2H8KJjy1zkSutr7pXa.jpg',
        shopName: '你好小金',
        shopRecommendReason: {
          icon: 'https://gw.alicdn.com/tfs/TB1ggdZHAzoK1RjSZFlXXai4VXa-72-72.png',
          text: '好店君：该店已被5.5万人关注，快来关注吧！',
          type: 'FANS',
        },
        algArgs: '14536478-14536478-Item',
        shopItemVOs: [
          {
            itemId: '606537747110',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i4/14536478/O1CN01m3Gk7e1xiyHUCk9Iu_!!14536478.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=606537747110&rmdChannelCode=goodShop',
          },
          {
            itemId: '605394637989',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i4/14536478/O1CN01BqOdeC1xiyHIFGUUP_!!14536478.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=605394637989&rmdChannelCode=goodShop',
          },
          {
            itemId: '605423305335',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i4/14536478/O1CN01qt86Ix1xiyHJbTwHG_!!14536478.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=605423305335&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//nihaoxiaojin.taobao.com/',
        utLogMap: '{"x_object_type":"shop","x_object_id":"14536478"}',
        tags: [
          {
            targetId: '14536478_176',
            like: 'false',
            tagId: '176',
            name: '金牌卖家',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000176&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '14536478',
        goldShop: '1',
        appId: '14255',
        showType: 'shop',
        shopId: '107204309',
        wyswyg: 'false',
        tmall: 'false',
        shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:ff189c97-badc-4caf-986a-40fdd0c94ef1:0:10095607:10095607:6001:2:2:606476088959_607048234309_607625211871:0.000:0:0.002:0:1:0:0:0:0.000',
        hasSellerCoupon: 'false',
        columnId: '6001',
        shopLogo: '//gw.alicdn.com/bao/uploaded//6b/72/TB1MwsSnCMmBKNjSZTESuusKpXa.jpg',
        shopName: '吕陈独立女装店',
        shopRecommendReason: {
          icon:
            'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=XFIyX88yMk7hMH8SXmPzvGgGMGHLMFvYv0Q4MGNSMH8T',
          text:
            '大V推荐： 店主吕舒禾，也就是“吕陈”中的“吕”，曾经是上海本地的女装设计师，做过六年的品牌女装设计师。',
          type: 'DAREN',
        },
        algArgs: '10095607-10095607-Item',
        shopItemVOs: [
          {
            itemId: '606476088959',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i3/10095607/O1CN017tX2LL1rI3JCZMwZ3_!!10095607.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=606476088959&rmdChannelCode=goodShop',
          },
          {
            itemId: '607048234309',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i3/10095607/O1CN0195EFuk1rI3JHPXy7O_!!10095607.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=607048234309&rmdChannelCode=goodShop',
          },
          {
            itemId: '607625211871',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i3/10095607/O1CN01f81qOW1rI3JJrGsnR_!!10095607.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=607625211871&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//lyuchen.taobao.com/',
        utLogMap: '{"x_object_type":"shop","x_object_id":"10095607"}',
        tags: [
          {
            targetId: '10095607_176',
            like: 'false',
            tagId: '176',
            name: '金牌卖家',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000176&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '10095607',
        goldShop: '1',
        appId: '14255',
        showType: 'shop',
        shopId: '33020347',
        wyswyg: 'false',
        tmall: 'false',
        shopLevelImg: '//gtms03.alicdn.com/tps/i3/TB17xgqFXXXXXbMaFXXaYjxHXXX-51-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:ff189c97-badc-4caf-986a-40fdd0c94ef1:0:10889282:10889282:6001:2:3:526306195940_520124666375_20618611044:0.000:0:0.002:0:1:0:0:0:0.000',
        hasSellerCoupon: 'false',
        columnId: '6001',
        interactionInfos: [
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=MmHGMk8uPFP-OmHbvCv4MGkuMmkSv8PIXmk4P0kyP8gT',
            title: 'l***9关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=MmHGMk8uPFP-OmHbvCv4M0gWvH8WXmkGMG*zPF-IX88T',
            title: '方***7关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=vG7-vkcyP87IvHkyPFQLXmlzP07-M0PHXmIYvGN4vmgT',
            title: '太***6关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=PCQuMkPIXmx4vCv4vkZzOF9zvCvYOHlIMF7IO8cyXH8T',
            title: '荷***o关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=MmHGMk8uPFP-OmHbvCv4M0kyMFHuXFc0PHQ4OmheOFvT',
            title: '一***5关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=PCQuMkPIXmx4vCv4vkZzO87IM0lHvHlevFMIMk*IX88T',
            title: '华***全关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=Mmk4XmkYv8g0MH7HOmxWPmhHMG9zPmxbXF8LvkkYvmNT',
            title: 't***9关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=O8xbXm84vHkuOHRIvmIGvCNWMkc0vmHbXFcyMCcLP8gT',
            title: 's***0关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=vG7-vkcyP87IvHkyPFQLXm*HOFPevkQGPF7zvkcYM8cT',
            title: '5***8关注了该店',
          },
        ],
        shopLogo: '//gw.alicdn.com/bao/uploaded//20/fc/T1.yTNXeliXXartXjX.gif',
        shopName: '唯她BEAUTYUP',
        shopRecommendReason: {
          icon: 'https://gw.alicdn.com/tfs/TB1ggdZHAzoK1RjSZFlXXai4VXa-72-72.png',
          text: '好店君：该店已被8232人关注，快来关注吧！',
          type: 'FANS',
        },
        algArgs: '10889282-10889282-Item',
        shopItemVOs: [
          {
            itemId: '526306195940',
            itemPic: '//gw.alicdn.com/bao/uploaded/i2/TB1zxreLpXXXXbvXXXXXXXXXXXX_!!0-item_pic.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=526306195940&rmdChannelCode=goodShop',
          },
          {
            itemId: '520124666375',
            itemPic: '//gw.alicdn.com/bao/uploaded/i2/TB1mfdtIpXXXXafXpXXXXXXXXXX_!!0-item_pic.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=520124666375&rmdChannelCode=goodShop',
          },
          {
            itemId: '20618611044',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i4/19282043026248353/T1jAsPFg4cXXXXXXXX_!!0-item_pic.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=20618611044&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//weita.taobao.com/',
        utLogMap: '{"x_object_type":"shop","x_object_id":"10889282"}',
        sellerId: '10889282',
        goldShop: '0',
        appId: '14255',
        showType: 'shop',
        shopId: '33111367',
        wyswyg: 'false',
        tmall: 'false',
        shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:ff189c97-badc-4caf-986a-40fdd0c94ef1:0:13824402:13824402:6001:2:4:600952990815_599247303395_572665006844:0.000:0:0.002:0:1:0:0:0:0.000',
        hasSellerCoupon: 'false',
        columnId: '6001',
        interactionInfos: [
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=vmN4MC7zMkPHMmQSPk8WOFZhX8cYPC7HvFvWMC7hvCIT',
            title: 'l***4关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=OH7zX8QSvHQSOmlevFQYPC*zMkguOHZIMmkSPHkLvH8T',
            title: 's***3关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=Pk*HOFxSPCNGOHgyX8R-M0R-OHcSvGcYvGcWvCQSPmHT',
            title: 'y***0关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=MmHGMk8uPFP-OmHbvCv4M0*HP0PhXHlhMmhzvGQuPHxT',
            title: '远***5关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=O8xbXm84vHkuOHRIvmIGvkxbX8xLvFxSXHxuvGxbPmNT',
            title: 'y***6关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=OH7zX8QSvHQSOmlevFQYPCNYv8RIPkl-Pm9hPGcSvHgT',
            title: 'w***5关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=O8xbXm84vHkuOHRIvmIGvCHyvC9hOm7HPkxuXmleOmNT',
            title: '1***a关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=MmHGMk8uPFP-OmHbvCv4MGcyPm7zvGI0v0*evFvWXFkT',
            title: '魔***金关注了该店',
          },
          {
            pic:
              'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=Pk*HOFxSPCNGOHgyX8R-MGQbvmQuM08bPGkYv8QLPFvT',
            title: 't***2关注了该店',
          },
        ],
        shopLogo: '//gw.alicdn.com/bao/uploaded//32/34/T1hKmjXd8pXXb1upjX.jpg',
        shopRankInfo: { columnId: '10000109026', type: 'ranking', desc: '该店入选简约通勤榜TOP2' },
        shopName: '水墨青华优雅气质女装',
        shopRecommendReason: {
          icon:
            'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=O8xbXm84vHkuOHRIvmIGvk*eXml-PmcSM0Q4MHZzvkkT',
          text: '大V推荐：当高级感遇到少女心，雾霾蓝再也不只属于明星',
          type: 'DAREN',
        },
        algArgs: '13824402-13824402-Item',
        shopItemVOs: [
          {
            itemId: '600952990815',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/13824402/O1CN01ULgab01iOA2DFxZrf_!!13824402.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=600952990815&rmdChannelCode=goodShop',
          },
          {
            itemId: '599247303395',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i4/13824402/O1CN01WNTckZ1iOA1j1Uxl0_!!13824402.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=599247303395&rmdChannelCode=goodShop',
          },
          {
            itemId: '572665006844',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i2/13824402/TB2ZD3bAFmWBuNjSspdXXbugXXa_!!13824402.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=572665006844&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//qlss.taobao.com/',
        utLogMap: '{"x_object_type":"shop","x_object_id":"13824402"}',
        tags: [
          {
            targetId: '13824402_176',
            like: 'false',
            tagId: '176',
            name: '金牌卖家',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000176&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '13824402_340101',
            like: 'false',
            tagId: '340101',
            name: '中腰连衣裙',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000340101&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '13824402_134597',
            like: 'false',
            tagId: '134597',
            name: '中式复古',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000134597&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '13824402_109289',
            like: 'false',
            tagId: '109289',
            name: '70后偏爱',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000109289&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '13824402_109026',
            like: 'false',
            tagId: '109026',
            name: '简约通勤',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000109026&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '13824402',
        goldShop: '1',
        appId: '14255',
        showType: 'shop',
        shopId: '33307281',
        wyswyg: 'false',
        tmall: 'false',
        shopLevelImg: '//gtms04.alicdn.com/tps/i4/TB1.IkYFFXXXXaFaXXXCBGNFFXX-24-24.png',
      },
      {
        demote: 'false',
        showType: 'rankWall',
        shopFeeds: [
          {
            trackInfo:
              '1007.27062.142745.100200300000000:40f05543-9f69-4e31-9382-1d7b241257a4:0:296055733:296055733:10000245658:2:0:607259911270:0.000:0:0.007:0:1:0:0:0:0.000',
            columnId: '10000245658',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded//i1/296055733/TB22WhbeAomBKNjSZFqXXXtqVXa_!!296055733.jpg',
            shopName: '李潇洒lindlook微胖定制',
            shopItemVOs: [
              {
                itemId: '607259911270',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/296055733/O1CN01zFx2qj1sDlDKjrEsw_!!296055733.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=607259911270&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//lindlook.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              { columnId: '10000245658', name: '显瘦款榜', description: '90.0万', type: 'ranking' },
            ],
            sellerId: '296055733',
            goldShop: '1',
            appId: '17062',
            showType: 'shop',
            shopId: '70285762',
            tmall: 'false',
            shopLevelImg: '//gtms04.alicdn.com/tps/i4/TB1.IkYFFXXXXaFaXXXCBGNFFXX-24-24.png',
          },
          {
            trackInfo:
              '1007.27062.142745.100200300000000:40f05543-9f69-4e31-9382-1d7b241257a4:0:54733884:54733884:10000236251:2:0:606857165847:0.000:0:0.014:0:1:0:0:0:0.000',
            columnId: '10000236251',
            shopLogo: '//gw.alicdn.com/bao/uploaded//c0/82/T1QZ_MFjtXXXb1upjX.jpg',
            shopName: '趣奇中国',
            shopItemVOs: [
              {
                itemId: '606857165847',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/54733884/O1CN01zssJZX1eYut46W6EM_!!54733884.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=606857165847&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//instax365.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                columnId: '10000236251',
                name: '世上最好的家榜',
                description: '194.0万',
                type: 'ranking',
              },
            ],
            sellerId: '54733884',
            goldShop: '1',
            appId: '17062',
            showType: 'shop',
            shopId: '57294839',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
          {
            trackInfo:
              '1007.27062.142745.100200300000000:40f05543-9f69-4e31-9382-1d7b241257a4:0:43615871:43615871:10000236254:2:0:604736985625:0.000:0:0.016:0:1:0:0:0:0.000',
            columnId: '10000236254',
            shopLogo: '//gw.alicdn.com/bao/uploaded//7d/01/TB1JUB.MpXXXXXnXFXXSutbFXXX.jpg',
            shopName: '大艾的殿 simple n chic',
            shopItemVOs: [
              {
                itemId: '604736985625',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/43615871/O1CN013gFnml1tExrhGNWgM_!!43615871.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=604736985625&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//adainthepark.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                columnId: '10000236254',
                name: '我的衣橱榜',
                description: '997.5万',
                type: 'ranking',
              },
            ],
            sellerId: '43615871',
            goldShop: '1',
            appId: '17062',
            showType: 'shop',
            shopId: '36898865',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
        ],
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:ff189c97-badc-4caf-986a-40fdd0c94ef1:0:14197825:14197825:6001:2:5:604683644339_602974266171_605357523456:0.000:0:0.002:0:1:0:0:0:0.000',
        hasSellerCoupon: 'true',
        columnId: '6001',
        shopLogo: '//gw.alicdn.com/bao/uploaded//79/ec/TB1B5LTXqigSKJjSsppSuubnpXa.jpg',
        shopRankInfo: { columnId: '10000103119', type: 'ranking', desc: '该店入选日系软妹榜TOP1' },
        shopName: '沐乃衣女装',
        shopRecommendReason: {
          icon:
            'http://wwc.alicdn.com/avatar/getAvatar.do?width=60&height=60&type=sns&userIdStr=M87HXHleM0RhPGkSvmxbX8xLX8ZhvG-zM0x0MF*zvCIT',
          text: '大V推荐：只想和你诉说那份少女心，只为那份复古的情怀',
          type: 'DAREN',
        },
        algArgs: '14197825-14197825-Item',
        shopItemVOs: [
          {
            itemId: '604683644339',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/14197825/O1CN018LVOuX27ftmHkwUwz_!!14197825.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=604683644339&rmdChannelCode=goodShop',
          },
          {
            itemId: '602974266171',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i4/14197825/O1CN01o5f7nt27ftm62Gw4l_!!14197825.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=602974266171&rmdChannelCode=goodShop',
          },
          {
            itemId: '605357523456',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/14197825/O1CN01ZgzY3n27ftmJOwhkf_!!14197825.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=605357523456&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//munaiyi007.taobao.com/',
        utLogMap: '{"x_object_type":"shop","x_object_id":"14197825"}',
        tags: [
          {
            targetId: '14197825_103158',
            like: 'false',
            tagId: '103158',
            name: '气质名媛',
            showType: 'jump',
            likeCount: '24',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000103158&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '14197825_248385',
            like: 'false',
            tagId: '248385',
            name: '复古风连衣裙',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000248385&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '14197825_233898',
            like: 'false',
            tagId: '233898',
            name: '打底衫来袭',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000233898&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '14197825_176',
            like: 'false',
            tagId: '176',
            name: '金牌卖家',
            showType: 'jump',
            likeCount: '1',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000176&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '14197825',
        goldShop: '1',
        appId: '14255',
        showType: 'shop',
        shopId: '33495993',
        wyswyg: 'false',
        tmall: 'false',
        shopLevelImg: '//gtms03.alicdn.com/tps/i3/TB1pfkkFFXXXXa6aXXXHpVt.VXX-132-24.png',
      },
      {
        showType: 'tagWall',
        shopFeeds: [
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:12888478:12888478:10000372299:2:0:7298609427:0.000:0:0.022:0:1:0:0:0:0.000',
            columnId: '10000372299',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded//i2/12888478/TB2O6Mslx1YBuNjy1zcXXbNcXXa_!!12888478.jpg',
            shopName: '萝西巧克力',
            shopItemVOs: [
              {
                itemId: '7298609427',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/12888478/O1CN01FZdujk2CUyMleJSvl_!!12888478.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=7298609427&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//loncy.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000372299',
                name: '巧克力控甜品',
                description: '1.5万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000372299&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '12888478',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '59862257',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:43615871:43615871:10000236254:2:0:604736985625:0.000:0:0.016:0:1:0:0:0:0.000',
            columnId: '10000236254',
            shopLogo: '//gw.alicdn.com/bao/uploaded//7d/01/TB1JUB.MpXXXXXnXFXXSutbFXXX.jpg',
            shopName: '大艾的殿 simple n chic',
            shopItemVOs: [
              {
                itemId: '604736985625',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/43615871/O1CN013gFnml1tExrhGNWgM_!!43615871.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=604736985625&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//adainthepark.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000236254',
                name: '我的衣橱',
                description: '997.5万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000236254&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '43615871',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '36898865',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:54733884:54733884:10000236251:2:0:606857165847:0.000:0:0.014:0:1:0:0:0:0.000',
            columnId: '10000236251',
            shopLogo: '//gw.alicdn.com/bao/uploaded//c0/82/T1QZ_MFjtXXXb1upjX.jpg',
            shopName: '趣奇中国',
            shopItemVOs: [
              {
                itemId: '606857165847',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/54733884/O1CN01zssJZX1eYut46W6EM_!!54733884.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=606857165847&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//instax365.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000236251',
                name: '世上最好的家',
                description: '194.0万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000236251&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '54733884',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '57294839',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:47376655:47376655:10000245537:2:0:595296172690:0.000:0:0.011:0:1:0:0:0:0.000',
            columnId: '10000245537',
            shopLogo: '//gw.alicdn.com/bao/uploaded//6c/80/TB1MLnga8Cw3KVjSZR0SuvcUpXa.jpg',
            shopName: '鹿头原创手作包',
            shopItemVOs: [
              {
                itemId: '595296172690',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i3/47376655/O1CN01VBGNtV1z22MIYOoO0_!!47376655.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=595296172690&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//benfan.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000245537',
                name: '真皮款',
                description: '151.4万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000245537&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '47376655',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '33984281',
            tmall: 'false',
            shopLevelImg: '//gw.alicdn.com/mt/TB1d1GxRpXXXXbrapXXXXXXXXXX-105-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:25965149:25965149:10000000193:2:0:551603785664:0.000:0:0.008:0:1:0:0:0:0.000',
            columnId: '10000000193',
            shopLogo: '//gw.alicdn.com/bao/uploaded//db/3a/TB1l5zRIpXXXXaPXFXXSutbFXXX.jpg',
            shopName: 'Picture',
            shopItemVOs: [
              {
                itemId: '551603785664',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/25965149/TB2q5ROrgNlpuFjy0FfXXX3CpXa_!!25965149.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=551603785664&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//picturemagazine.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000000193',
                name: '独到设计',
                description: '493.0万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000193&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '25965149',
            goldShop: '0',
            appId: '10800',
            showType: 'shop',
            shopId: '114556966',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1fMgKFpXXXXXKbXXXHpVt.VXX-132-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:41368967:41368967:10000112458:2:0:583095244932:0.000:0:0.008:0:1:0:0:0:0.000',
            columnId: '10000112458',
            shopLogo: '//gw.alicdn.com/bao/uploaded//44/af/T1Cta.XXVXXXb1upjX.jpg',
            shopName: '波西米亚民族风',
            shopItemVOs: [
              {
                itemId: '583095244932',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i3/41368967/O1CN013Y5zue2G6w0J9IsdK_!!0-item_pic.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=583095244932&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//shop33736425.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000112458',
                name: '杨丽萍',
                description: '5.3万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000112458&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '41368967',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '33736425',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:109014:109014:2017:2:0:593438148248:0.000:0:0.006:0:1:0:0:0:0.000',
            columnId: '2017',
            shopLogo: '//gw.alicdn.com/bao/uploaded//50/d0/TB1bTYKOpXXXXcraFXXSutbFXXX.jpg',
            shopName: '杨小姐的果酱铺',
            shopItemVOs: [
              {
                itemId: '593438148248',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i2/109014/O1CN01KAlwPF2GSSfwTd0T0_!!109014.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=593438148248&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//missjam.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '2017',
                name: '吃吃吃',
                description: '433.5万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=2017&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '109014',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '105384240',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:212450461133:14358355:10000120182:2:0:583273752763:0.000:0:0.006:0:1:0:0:0:0.000',
            columnId: '10000120182',
            shopLogo: '//gw.alicdn.com/bao/uploaded//7d/21/TB1AZNIIFXXXXaiXpXXSutbFXXX.jpg',
            shopName: '撒哈拉店',
            shopItemVOs: [
              {
                itemId: '583273752763',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i4/14358355/O1CN01YLjS9E2Badc2ULeMT_!!14358355.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=583273752763&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//saharra.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000120182',
                name: '森系仙女裙',
                description: '6951',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000120182&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '14358355',
            goldShop: '1',
            appId: '10800',
            showType: 'shop',
            shopId: '33187057',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
          {
            trackInfo:
              '1007.20800.125430.100200300000000:e8dd50f9-ee57-48f3-9d95-c3bc81f66da7:0:21111815:21111815:10000104991:2:0:597285461141:0.000:0:0.006:0:1:0:0:0:0.000',
            columnId: '10000104991',
            shopLogo: '//gw.alicdn.com/bao/uploaded//99/6f/TB1s8FcdUGF3KVjSZFoSuvmpFXa.jpg',
            shopName: 'shmily honey买二送一',
            shopItemVOs: [
              {
                itemId: '597285461141',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/21111815/O1CN01Z7Pyb81PHJQPaKuNN_!!21111815.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=597285461141&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//shmilyhoney.taobao.com/?rmdChannelCode=goodShop',
            tags: [
              {
                tagId: '10000104991',
                name: '韩国风',
                description: '95.6万',
                showType: 'jump',
                likeCount: '0',
                type: 'shopImpressTag',
                url:
                  'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000104991&entrance=shopTag&pageType=tag',
              },
            ],
            sellerId: '21111815',
            goldShop: '0',
            appId: '10800',
            showType: 'shop',
            shopId: '64842832',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
        ],
      },
    ],
    $ = (function(e) {
      function a(e) {
        var o;
        return t(this, a), ((o = i(this, r(a).call(this, e))).loading = !1), o;
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              console.log('Recommend mounted');
            },
          },
          {
            key: 'render',
            value: function() {
              var t = J.shift();
              console.log(t);
              var e = [1, 2];
              return (
                (e = new Proxy(e, {
                  get: function(t, e, o) {
                    return console.log('get', e), t[e];
                  },
                  set: function(t, e, o, a) {
                    return console.log('set', e), (t[e] = o), !0;
                  },
                })),
                C(
                  R,
                  { title: '推荐' },
                  C('div', { className: 'carousel_wrapper' }, C(H, { data: t.bannerFeeds })),
                  C(W, { data: J }),
                )
              );
            },
          },
          {
            key: 'handleChange',
            value: function(t) {
              console.log(t);
            },
          },
        ]),
        a
      );
    })(x),
    tt = [
      {
        shopList: [
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:120212653:120212653:6003:5:1:577290629160:0.129:8:0.020:1:1:556772183225:11:0:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//6b/5d/TB1Qns3JFXXXXaeXVXXwu0bFXXX.png',
            shopName: '香小茉',
            algArgs: '120212653-120212653-Item',
            shopItemVOs: [
              {
                itemId: '577290629160',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/120212653/O1CN01Bvk13N1VT7KaPX6eb_!!120212653.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=577290629160&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//moxiang2014.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"120212653"}',
            sellerId: '120212653',
            shopIntroduce: '手工新鲜现做，坚持好原料是好吃的基础',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '68556913',
            tmall: 'false',
            shopLevelImg: '//gw.alicdn.com/mt/TB14w1PRpXXXXbYXVXXXXXXXXXX-105-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:207830940003:247816360:6003:5:2:524177943651:0.193:2:0.012:3:2:563801102453:30:0:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//49/2c/TB17D03RXXXXXXfaXXXSutbFXXX.jpg',
            shopName: '骸首饰工作室',
            algArgs: '207830940003-247816360-ContentPost',
            shopItemVOs: [
              {
                itemId: '524177943651',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/247816360/O1CN01HiIQMn1wqvUD6MTfu_!!247816360.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=524177943651&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//essencelabs.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"247816360"}',
            sellerId: '247816360',
            shopIntroduce: '自然简约兼有博物暗黑风的原创品牌',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '58845713',
            tmall: 'false',
            shopLevelImg: '//gtms04.alicdn.com/tps/i4/TB1WCRRFFXXXXaxapXXCBGNFFXX-24-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:711882582:711882582:6003:5:3:600830724127:0.170:5:0.010:4:1:600594579114:30:1:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//ae/81/T1Sx6QXmxaXXb1upjX.jpg',
            shopName: 'dickies官方旗舰店',
            algArgs: '711882582-711882582-Item',
            shopItemVOs: [
              {
                itemId: '600830724127',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/711882582/O1CN019kuHAd1UwbCdDIDq0_!!0-item_pic.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=600830724127&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//dickies.tmall.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"711882582"}',
            sellerId: '711882582',
            shopIntroduce: '原汁原味的美式工装品牌，和你一起成为街头D造者！',
            goldShop: '0',
            appId: '14255',
            showType: 'shop',
            shopId: '67021780',
            tmall: 'true',
            shopLevelImg: '//gtms03.alicdn.com/tps/i3/TB10WSwFpXXXXcUbVXXaYjxHXXX-51-24.png',
          },
        ],
        showType: 'shopList',
      },
      {
        shopList: [
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:63426753:63426753:6003:5:4:549414279935:0.103:12:0.010:5:1:36028333956:18:0:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//6a/95/TB12PRZHVXXXXbOXFXXSutbFXXX.jpg',
            shopName: 'Landy Wang小理想',
            algArgs: '63426753-63426753-Item',
            shopItemVOs: [
              {
                itemId: '549414279935',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/63426753/O1CN01OxDj4r1zkvCJLB8Na_!!63426753.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=549414279935&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//landywang2013.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"63426753"}',
            sellerId: '63426753',
            shopIntroduce: '仙女店主的少女颜值小清新店铺，茶饮新风尚，伴手礼',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '105105153',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:1807665825:1807665825:6003:5:5:570935476798:0.082:13:0.012:2:2:556772183225:11:0:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//22/58/TB1x.iMSXXXXXcjXXXXSutbFXXX.jpg',
            shopName: 'VEpiaopiao轻食生活',
            algArgs: '1807665825-1807665825-Item',
            shopItemVOs: [
              {
                itemId: '570935476798',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/1807665825/O1CN014LmIrs1sttZEHwPLH_!!1807665825.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=570935476798&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//vepiaopiao.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"1807665825"}',
            sellerId: '1807665825',
            shopIntroduce: '飘飘轻食，有颜好味！23W+小伙伴的轻食选择！',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '107556211',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:27513636:27513636:6003:5:6:542786144808:0.137:7:0.008:6:1:563801102453:30:0:0.000',
            columnId: '6003',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded//i4/27513636/O1CN01ZLJ85S1cjKfD1LX5u_!!27513636.jpg',
            shopName: '七月原创银饰设计',
            algArgs: '27513636-27513636-Item',
            shopItemVOs: [
              {
                itemId: '542786144808',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i1/27513636/O1CN01Isq2UB1cjKckCNXxN_!!0-item_pic.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=542786144808&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//julysilver.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"27513636"}',
            sellerId: '27513636',
            shopIntroduce: '原创设计，专注情侣首饰11年，一件首饰一个故事',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '35093686',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
        ],
        showType: 'shopList',
      },
      {
        shopList: [
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:109270110:109270110:6003:5:7:581815066861:0.114:10:0.007:7:1:600594579114:30:0:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//b9/44/TB1uQ17BhjaK1RjSZFASuvdLFXa.jpg',
            shopName: '玩药局 Bytehare玩藥 玩薬局製衣厂',
            algArgs: '109270110-109270110-Item',
            shopItemVOs: [
              {
                itemId: '581815066861',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i3/109270110/O1CN01vW9KAf1CgQ2eOlrl3_!!109270110.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=581815066861&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//too-man.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"109270110"}',
            sellerId: '109270110',
            shopIntroduce: '提炼中国各类经典元素融合设计的原创服饰。',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '36748642',
            tmall: 'false',
            shopLevelImg: '//gtms03.alicdn.com/tps/i3/TB10WSwFpXXXXcUbVXXaYjxHXXX-51-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:142347357:142347357:6003:5:8:604509815692:0.232:1:0.003:9:1:596961421555:132:0:0.000',
            columnId: '6003',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded//i4/142347357/O1CN01hJIBH324DYLqUgZ5g_!!142347357.jpg',
            shopName: 'Pawpaw Liu',
            algArgs: '142347357-142347357-Item',
            shopItemVOs: [
              {
                itemId: '604509815692',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i2/142347357/O1CN017f39pT24DYPtiXqCj_!!142347357.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=604509815692&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//pawpawliu.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"142347357"}',
            sellerId: '142347357',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '60046743',
            tmall: 'false',
            shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:2835673852:2835673852:6003:5:9:600988071061:0.105:11:0.006:8:1:600594579114:30:0:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//1d/6b/TB1SUAQMVXXXXXgXXXXSutbFXXX.jpg',
            shopName: 'Clamisgold 隐于市',
            algArgs: '2835673852-2835673852-Item',
            shopItemVOs: [
              {
                itemId: '600988071061',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i3/2835673852/O1CN01RUOP6B1eKGCI7UtoD_!!2835673852.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=600988071061&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//clamisgold.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"2835673852"}',
            sellerId: '2835673852',
            goldShop: '1',
            appId: '14255',
            showType: 'shop',
            shopId: '150825817',
            tmall: 'false',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
        ],
        showType: 'shopList',
      },
      {
        shopList: [
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:228430399:228430399:6003:5:10:586550767998:0.052:14:0.003:10:1:594369267276:30:0:0.000',
            columnId: '6003',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded///img.alicdn.com//fc/56/TB1Q2XZOVXXXXaYXpXXSutbFXXX.jpg',
            shopName: '九素懿',
            algArgs: '228430399-228430399-Item',
            shopItemVOs: [
              {
                itemId: '586550767998',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i4/228430399/O1CN01cY8hYW1EomWbue45h_!!228430399.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=586550767998&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//josoy.taobao.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"228430399"}',
            sellerId: '228430399',
            goldShop: '0',
            appId: '14255',
            showType: 'shop',
            shopId: '58184633',
            tmall: 'false',
            shopLevelImg: '//gw.alicdn.com/mt/TB1d1GxRpXXXXbrapXXXXXXXXXX-105-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:2594066341:2594066341:6003:5:11:600166391980:0.182:3:0.003:11:2:596961421555:132:1:0.000',
            columnId: '6003',
            shopLogo:
              '//gw.alicdn.com/bao/uploaded///img.alicdn.com//76/34/TB1LzpUSFXXXXaRXVXXSutbFXXX.jpg',
            shopName: 'MIKIHOUSE海外旗舰店',
            algArgs: '2594066341-2594066341-Item',
            shopItemVOs: [
              {
                itemId: '600166391980',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i4/2594066341/O1CN01smMO7W1wiE19H6QsC_!!0-item_pic.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=600166391980&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//mikihouse.tmall.hk/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"2594066341"}',
            sellerId: '2594066341',
            shopIntroduce: '为了宝宝和地面首次接触，我们专注做学步鞋48年。',
            goldShop: '0',
            appId: '14255',
            showType: 'shop',
            shopId: '127025506',
            tmall: 'true',
            shopLevelImg: '//gw.alicdn.com/mt/TB14w1PRpXXXXbYXVXXXXXXXXXX-105-24.png',
          },
          {
            trackInfo:
              '1007.24255.127044.100200300000000:b45aa581-5ef6-433a-bee1-bf49f0ec68e0:3505846220:754465524:754465524:6003:5:12:600811939261:0.117:9:0.002:14:1:594565407523:116:1:0.000',
            columnId: '6003',
            shopLogo: '//gw.alicdn.com/bao/uploaded//13/bf/TB1xWp_phTpK1RjSZFMSuvG_VXa.jpg',
            shopName: '红谷旗舰店',
            algArgs: '754465524-754465524-Item',
            shopItemVOs: [
              {
                itemId: '600811939261',
                itemPic:
                  '//gw.alicdn.com/bao/uploaded/i2/754465524/O1CN01ZMlNRa1qg2Pz3FaIt_!!0-item_pic.jpg',
                itemUrl:
                  'https://h5.m.taobao.com/awp/core/detail.htm?id=600811939261&rmdChannelCode=goodShop',
              },
            ],
            shopUrl: '//honggu.tmall.com/?rmdChannelCode=goodShop',
            utLogMap: '{"x_object_type":"shop","x_object_id":"754465524"}',
            sellerId: '754465524',
            goldShop: '0',
            appId: '14255',
            showType: 'shop',
            shopId: '68677301',
            tmall: 'true',
            shopLevelImg: '//gtms02.alicdn.com/tps/i2/TB1sfqRFpXXXXX8bVXXHpVt.VXX-132-24.png',
          },
        ],
        showType: 'shopList',
      },
    ],
    et = Symbol('state'),
    ot = (function(e) {
      function a(e) {
        var o;
        return (
          t(this, a),
          ((o = i(this, r(a).call(this, e)))[et] = Object.create(null)),
          (o[et].position = 0),
          (o[et].loading = !1),
          o
        );
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              console.log('FunShop mounted');
            },
          },
          {
            key: 'render',
            value: function() {
              return C(
                R,
                null,
                C(
                  'div',
                  { className: 'fun-shop' },
                  C(
                    'div',
                    { className: 'fun-shop_header' },
                    C('span', null, '新奇好店都在这'),
                    C(Y, {
                      data: [{ title: '全部' }, { title: '小惊喜' }, { title: '想不到' }],
                      onClick: this.handleChange.bind(this),
                    }),
                  ),
                  C(
                    'div',
                    { className: 'fun-shop_list' },
                    tt.map(function(t, e) {
                      return C(
                        'div',
                        { className: 'fun-shop_item' },
                        [t.shopList.shift()].map(function(t) {
                          var e = t.shopLevelImg
                            .slice(0, -4)
                            .split('-')
                            .slice(1);
                          return C(
                            'div',
                            { className: 'large-shop' },
                            C('img', { src: t.shopItemVOs[0].itemPic, alt: '加载失败' }),
                            C(
                              'div',
                              { className: 'shop_inner' },
                              C(
                                'div',
                                { className: 'shop_desc' },
                                C(
                                  'div',
                                  { className: 'shop_desc_left' },
                                  C('img', {
                                    className: '_desc_level',
                                    src: t.shopLevelImg,
                                    alt: '',
                                    style: 'width: '
                                      .concat(e[0] / 2, 'px;height:')
                                      .concat(e[1] / 2, 'px'),
                                  }),
                                  C('div', { className: 'shop_desc_name' }, t.shopName),
                                ),
                                C(
                                  'div',
                                  { className: 'shop_desc_right' },
                                  C('img', {
                                    src:
                                      'http://gw.alicdn.com/tfs/TB1S784OwTqK1RjSZPhXXXfOFXa-196-88.png_110x10000.jpg_.webp',
                                    alt: '加载失败',
                                  }),
                                  C('span', null, '进店'),
                                ),
                              ),
                            ),
                          );
                        }),
                        C(
                          'div',
                          { className: 'other-shops' },
                          t.shopList.map(function(t, e) {
                            var o = t.shopLevelImg
                              .slice(0, -4)
                              .split('-')
                              .slice(1);
                            return C(
                              'div',
                              { className: 'small-shop' },
                              C('img', { src: t.shopItemVOs[0].itemPic, alt: '加载失败' }),
                              C(
                                'div',
                                { className: 'shop_inner' },
                                C(
                                  'div',
                                  { className: 'shop_desc' },
                                  C(
                                    'div',
                                    { className: 'shop_desc_left' },
                                    C('img', {
                                      className: '_desc_level',
                                      src: t.shopLevelImg,
                                      alt: '',
                                      style: 'width: '
                                        .concat(o[0] / 2, 'px;height:')
                                        .concat(o[1] / 2, 'px'),
                                    }),
                                    C('div', { className: 'shop_desc_name' }, t.shopName),
                                  ),
                                  C('img', {
                                    src:
                                      'http://gw.alicdn.com/tfs/TB1vtOgOCzqK1RjSZFpXXakSXXa-16-32.png_110x10000.jpg_.webp',
                                    alt: '加载失败',
                                    style: 'width:5px;height:10px',
                                  }),
                                ),
                              ),
                            );
                          }),
                        ),
                      );
                    }),
                  ),
                ),
              );
            },
          },
          {
            key: 'handleChange',
            value: function(t) {
              console.log(t);
            },
          },
        ]),
        a
      );
    })(x),
    at = [
      {
        trackInfo:
          '1007.24255.127044.100200300000000:034006b6-22dd-434d-ad1e-035f2993b0be:0:201578892684:55986241:6003:2:1:20362495955_15727427439:0.000:0:0.003:0:1:0:0:0:0.000',
        columnId: '6003',
        shopLogo: '//gw.alicdn.com/bao/uploaded//61/52/TB1D8jcur2pK1RjSZFsSuuNlXXa.jpg',
        shopName: '生合',
        fansCount: '13.4万',
        algArgs: '201578892684-55986241-ContentPost',
        shopItemVOs: [
          {
            itemId: '20362495955',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i3/55986241/O1CN01pVoSj41vyQPWYAmUF_!!55986241.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=20362495955&rmdChannelCode=goodShop',
          },
          {
            itemId: '15727427439',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/55986241/O1CN01z1uJQ61vyQKIPt2Wd_!!55986241.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=15727427439&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//shop72067129.taobao.com/?rmdChannelCode=goodShop',
        utLogMap: '{"x_object_type":"shop","x_object_id":"55986241"}',
        tags: [
          {
            targetId: '55986241_326774',
            like: 'false',
            tagId: '326774',
            name: '高效精华',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000326774&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '55986241_324087',
            like: 'false',
            tagId: '324087',
            name: '国货化妆品',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000324087&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '55986241_288858',
            like: 'false',
            tagId: '288858',
            name: '天然手工皂',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000288858&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '55986241_175',
            like: 'false',
            tagId: '175',
            name: '一间老店',
            showType: 'jump',
            likeCount: '2',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000175&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '55986241',
        goldShop: '0',
        appId: '14255',
        showType: 'shop',
        shopId: '72067129',
        tmall: 'false',
        shopLevelImg: '//gw.alicdn.com/mt/TB14w1PRpXXXXbYXVXXXXXXXXXX-105-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:034006b6-22dd-434d-ad1e-035f2993b0be:0:23280923:23280923:6003:2:2:528582785010_589709570553:0.000:0:0.003:0:1:0:0:0:0.000',
        columnId: '6003',
        shopLogo: '//gw.alicdn.com/bao/uploaded//dd/76/TB1NtODNXXXXXcjXFXXSutbFXXX.jpg',
        shopName: 'MILESTO品牌潮店',
        fansCount: '5.8万',
        algArgs: '23280923-23280923-Item',
        shopItemVOs: [
          {
            itemId: '528582785010',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/23280923/TB2fZMHnVXXXXbcXXXXXXXXXXXX_!!23280923.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=528582785010&rmdChannelCode=goodShop',
          },
          {
            itemId: '589709570553',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i3/23280923/O1CN01jbixu01Igm4ol0dSm_!!23280923.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=589709570553&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//milestojp.taobao.com/?rmdChannelCode=goodShop',
        utLogMap: '{"x_object_type":"shop","x_object_id":"23280923"}',
        tags: [
          {
            targetId: '23280923_176',
            like: 'false',
            tagId: '176',
            name: '金牌卖家',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000176&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '23280923_106430',
            like: 'false',
            tagId: '106430',
            name: '被国潮推倒',
            showType: 'jump',
            likeCount: '2',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000106430&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '23280923_174',
            like: 'false',
            tagId: '174',
            name: '行业优质',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000174&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '23280923_106579',
            like: 'false',
            tagId: '106579',
            name: '原创设计风格',
            showType: 'jump',
            likeCount: '1',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000106579&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '23280923',
        goldShop: '1',
        appId: '14255',
        showType: 'shop',
        shopId: '33160602',
        tmall: 'false',
        shopLevelImg: '//gtms04.alicdn.com/tps/i4/TB1WCRRFFXXXXaxapXXCBGNFFXX-24-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:034006b6-22dd-434d-ad1e-035f2993b0be:0:174951172:174951172:6003:2:3:596639673753_594307546384:0.000:0:0.003:0:1:0:0:0:0.000',
        columnId: '6003',
        shopLogo: '//gw.alicdn.com/bao/uploaded//2c/b8/TB1s.NefZUrBKNjSZPxSut00pXa.jpg',
        shopName: '青城植物研究所',
        fansCount: '19.1万',
        algArgs: '174951172-174951172-Item',
        shopItemVOs: [
          {
            itemId: '596639673753',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/174951172/O1CN01Z3yv7C1KWoj7sY6tw_!!174951172.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=596639673753&rmdChannelCode=goodShop',
          },
          {
            itemId: '594307546384',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/174951172/O1CN01pPAn9I1KWoiT473rx_!!174951172.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=594307546384&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//oflowers.taobao.com/?rmdChannelCode=goodShop',
        utLogMap: '{"x_object_type":"shop","x_object_id":"174951172"}',
        tags: [
          {
            targetId: '174951172_72',
            like: 'false',
            tagId: '72',
            name: '送礼',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000072&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '174951172_241234',
            like: 'false',
            tagId: '241234',
            name: '纪念日',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000241234&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '174951172_70',
            like: 'false',
            tagId: '70',
            name: '情人节',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000070&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '174951172_25',
            like: 'false',
            tagId: '25',
            name: '90后偏爱',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000000025&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '174951172_241231',
            like: 'false',
            tagId: '241231',
            name: '520节',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000241231&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
          {
            targetId: '174951172_214504',
            like: 'false',
            tagId: '214504',
            name: '与花共舞',
            showType: 'jump',
            likeCount: '0',
            source: '0',
            type: 'shopImpressTag',
            url:
              'http://market.m.taobao.com/apps/goodshops/index/aggregation-2018.html?wh_weex=true&wx_navbar_transparent=true&_wx_statusbar_hidden=true&columnId=10000214504&entrance=shopTag&pageType=tag&gs_spm_a=a213wr',
          },
        ],
        sellerId: '174951172',
        goldShop: '0',
        appId: '14255',
        showType: 'shop',
        shopId: '60596876',
        tmall: 'false',
        shopLevelImg: '//gtms03.alicdn.com/tps/i3/TB17xgqFXXXXXbMaFXXaYjxHXXX-51-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:034006b6-22dd-434d-ad1e-035f2993b0be:0:432403:432403:6003:2:4:580167530953_579144819214:0.000:0:0.003:0:1:0:0:0:0.000',
        columnId: '6003',
        shopLogo: '//gw.alicdn.com/bao/uploaded//i2/432403/O1CN011TccDEXF6twM3pE_!!432403.jpg',
        shopName: '内一系',
        fansCount: '6540',
        algArgs: '432403-432403-Item',
        shopItemVOs: [
          {
            itemId: '580167530953',
            itemPic: '//gw.alicdn.com/bao/uploaded/i1/432403/O1CN011TccDL3sHqybcrh_!!432403.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=580167530953&rmdChannelCode=goodShop',
          },
          {
            itemId: '579144819214',
            itemPic: '//gw.alicdn.com/bao/uploaded/i4/432403/O1CN011TccDL2FVskqJMi_!!432403.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=579144819214&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//neiyixi.taobao.com/?rmdChannelCode=goodShop',
        utLogMap: '{"x_object_type":"shop","x_object_id":"432403"}',
        sellerId: '432403',
        goldShop: '0',
        appId: '14255',
        showType: 'shop',
        brandInfo: {
          dsr_zl: '5.0',
          national_flag: '//g.alicdn.com/mui/flag-img/circle@2x/FR.png',
          description: '创新设计 源于法国',
          location: '法国',
          pic_url: '//img.alicdn.com/tps/TB1.RYHXpcJL1JjSZFOXXcWlXXa.jpg',
          brand_id: '7697089',
        },
        shopId: '58309537',
        tmall: 'false',
        shopLevelImg: '//gtms04.alicdn.com/tps/i4/TB1WCRRFFXXXXaxapXXCBGNFFXX-24-24.png',
      },
      {
        trackInfo:
          '1007.24255.127044.100200300000000:034006b6-22dd-434d-ad1e-035f2993b0be:0:21241512:21241512:6003:2:5:567374114823_560301656994:0.000:0:0.003:0:1:0:0:0:0.000',
        columnId: '6003',
        shopLogo: '//gw.alicdn.com/bao/uploaded//92/b4/TB1oJSIQVXXXXcCXpXXwu0bFXXX.png',
        shopName: '冰冰の良品',
        fansCount: '8.1万',
        algArgs: '21241512-21241512-Item',
        shopItemVOs: [
          {
            itemId: '567374114823',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i1/21241512/O1CN011N2XIwRnVMvbNKw_!!21241512.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=567374114823&rmdChannelCode=goodShop',
          },
          {
            itemId: '560301656994',
            itemPic:
              '//gw.alicdn.com/bao/uploaded/i3/21241512/O1CN01hclqEQ1N2XNZZtsjU_!!21241512.jpg',
            itemUrl:
              'https://h5.m.taobao.com/awp/core/detail.htm?id=560301656994&rmdChannelCode=goodShop',
          },
        ],
        shopUrl: '//fxbbaozipu.taobao.com/?rmdChannelCode=goodShop',
        utLogMap: '{"x_object_type":"shop","x_object_id":"21241512"}',
        sellerId: '21241512',
        goldShop: '0',
        appId: '14255',
        showType: 'shop',
        brandInfo: {
          dsr_zl: '4.888217522658611',
          national_flag: '//g.alicdn.com/mui/flag-img/circle@2x/GB.png',
          description: '满足你的挑剔好品位',
          location: '英国',
          pic_url: '//img.alicdn.com/tps/TB1UXeRjY5YBuNjSspoXXbeNFXa.jpg',
          brand_id: '1440995509',
        },
        shopId: '33310290',
        tmall: 'false',
        shopLevelImg: '//gtms01.alicdn.com/tps/i1/TB1QLgfFFXXXXXpapXX3e.oIVXX-78-24.png',
      },
    ],
    nt = (function(e) {
      function a(e) {
        var o;
        return t(this, a), ((o = i(this, r(a).call(this, e))).loading = !1), o;
      }
      return (
        l(a, e),
        o(a, [
          {
            key: 'mounted',
            value: function() {
              console.log('NewShop mounted');
            },
          },
          {
            key: 'render',
            value: function() {
              return C(
                R,
                null,
                C(
                  'div',
                  { className: 'new-shop' },
                  at.map(function(t) {
                    return C(
                      'div',
                      { className: 'new-shop_item' },
                      C('img', {
                        className: 'bc1',
                        src: t.brandInfo
                          ? t.brandInfo.pic_url
                          : 'http://gw.alicdn.com/tfs/TB1fOKQIhYaK1RjSZFnXXa80pXa-702-550.png',
                        alt: '',
                      }),
                      C('img', {
                        className: 'bc2',
                        src:
                          'http://gw.alicdn.com/tfs/TB1LOvUI3HqK1RjSZFkXXX.WFXa-702-550.png_790x10000.jpg_.webp',
                        alt: '',
                      }),
                      C(
                        'div',
                        { className: 'shop_item_title' },
                        C('img', { src: t.shopLogo, alt: '加载失败' }),
                        t.brandInfo
                          ? C(
                              'div',
                              { className: 'shop_item_title_desc' },
                              C('img', {
                                src:
                                  'http://gw.alicdn.com/tfs/TB1qzinCFzqK1RjSZSgXXcpAVXa-34-44.png_110x10000.jpg_.webp',
                                style: 'width: 12px;height: 11px;',
                                alt: '',
                              }),
                              C(
                                'span',
                                {
                                  style:
                                    'font-size: 11px;color: rgb(243, 209, 177);margin:0 4px 0 3px; overflow: hidden;',
                                },
                                '品牌宣言',
                              ),
                              C('span', null, t.brandInfo.description),
                            )
                          : C(
                              'div',
                              { className: 'shop_item_title_desc' },
                              C('img', {
                                src:
                                  'http://gw.alicdn.com/tfs/TB1LjJHISzqK1RjSZPcXXbTepXa-48-44.png_110x10000.jpg_.webp',
                                style: 'width: 12px;height: 11px;',
                                alt: '',
                              }),
                              C(
                                'span',
                                { style: 'font-size: 11px;margin:0 4px 0 3px; overflow: hidden;' },
                                '该店已被',
                                t.fansCount,
                                '人关注啦',
                              ),
                            ),
                      ),
                      C(
                        'div',
                        { className: 'shop_item_desc' },
                        C(
                          'div',
                          { className: 'shop_item_desc_left' },
                          C('div', { className: 'shop_item_desc_left_name' }, t.shopName),
                          C(
                            'div',
                            { className: 'shop_item_desc_left_tags' },
                            t.brandInfo
                              ? C(
                                  'div',
                                  { style: 'display: flex;align-items: center' },
                                  C('img', {
                                    src: t.brandInfo.national_flag,
                                    alt: '',
                                    style: 'width:11px;height:11px;margin-right: 2px',
                                  }),
                                  C('span', null, t.brandInfo.location),
                                )
                              : t.tags[0].name + ' · ' + t.tags[1].name,
                          ),
                        ),
                        C(
                          'div',
                          { className: 'shop_item_desc_right' },
                          '进店',
                          C('img', {
                            src:
                              'http://gw.alicdn.com/tfs/TB1GnbACrrpK1RjSZTEXXcWAVXa-24-54.png_110x10000.jpg_.webp',
                            alt: '',
                          }),
                        ),
                      ),
                      C(
                        'div',
                        { className: 'shop_item_content' },
                        t.shopItemVOs.map(function(t) {
                          return C(
                            'div',
                            { className: 'shop_item_content_item' },
                            C('img', { src: t.itemPic, alt: '' }),
                          );
                        }),
                      ),
                    );
                  }),
                ),
              );
            },
          },
          {
            key: 'handleChange',
            value: function(t) {
              console.log(t);
            },
          },
        ]),
        a
      );
    })(x),
    st = C(
      'div',
      { className: 'good-shop' },
      C('img', {
        src:
          'http://gw.alicdn.com/tfs/TB1v2koHq6qK1RjSZFmXXX0PFXa-1500-416.png_790x10000.jpg_.webp',
        style: 'width: 100%;height: 45px;position: fixed;top: 0px;left: 0px;z-index: 9998',
        alt: 'tab背景',
      }),
      C(
        Q,
        null,
        C($, { title: '推荐' }),
        C(ot, { title: '有趣的店' }),
        C(nt, { title: '品牌新店' }),
      ),
    );
  console.log(st),
    (window.render = function(t, e) {
      t.appendTo(e);
    }),
    window.render(st, document.body);
})();
