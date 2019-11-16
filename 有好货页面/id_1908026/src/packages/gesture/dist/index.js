(function () {
	'use strict';

	class Gesture {
	  constructor(e = {
	    panDistance: 10,
	    flickSpeed: .3,
	    pressDuration: 500,
	    log: !1
	  }) {
	    this.options = e, this.events = {}, this.log = e.log, this.init();
	  }

	  init() {
	    const e = Object.create(null),
	          t = Symbol("mouse");
	    this.events.mousemove = s => {
	      s.preventDefault(), this.move(s, e[t]);
	    }, this.events.mouseend = s => {
	      document.removeEventListener("mousemove", this.events.mousemove), document.removeEventListener("mouseup", this.events.mouseend), this.end(s, e[t]), delete e[t];
	    }, this.events.mousestart = s => {
	      s.preventDefault(), document.addEventListener("mousemove", this.events.mousemove), document.addEventListener("mouseup", this.events.mouseend), e[t] = Object.create(null), this.start(s, e[t]);
	    }, this.events.touchstart = t => {
	      if (t.changedTouches.length > 1) return !1;

	      for (const s of t.changedTouches) s.currentTarget = t.currentTarget, e[t.identifier] = Object.create(null), this.start(s, e[t.identifier]);
	    }, this.events.touchmove = t => {
	      if (t.changedTouches.length > 1) return !1;

	      for (const s of t.changedTouches) this.move(s, e[t.identifier]);
	    }, this.events.touchend = t => {
	      if (t.changedTouches.length > 1) return !1;

	      for (const s of t.changedTouches) this.end(s, e[t.identifier]), delete e[t.identifier];
	    }, this.events.touchcancel = t => {
	      if (t.changedTouches.length > 1) return !1;

	      for (const s of t.changedTouches) this.cancel(s, e[t.identifier]);
	    };
	  }

	  enable(e) {
	    if (null == e) throw new Error("el is required");
	    let t = !1;

	    try {
	      document.createEvent("TouchEvent"), t = !0;
	    } catch (e) {
	      t = !1;
	    }

	    return t ? (e.addEventListener("touchstart", this.events.touchstart, {
	      passive: !1
	    }), e.addEventListener("touchmove", this.events.touchmove, {
	      passive: !1
	    }), e.addEventListener("touchend", this.events.touchend), e.addEventListener("touchcancel", this.events.touchcancel)) : e.addEventListener("mousedown", this.events.mousestart), () => {
	      e.removeEventListener("mousedown", this.events.mousestart), e.removeEventListener("touchstart", this.events.touchstart), e.removeEventListener("touchmove", this.events.touchmove), e.removeEventListener("touchend", this.events.touchend), e.removeEventListener("touchcancel", this.events.touchcancel);
	    };
	  }

	  start(e, t) {
	    t.el = e.currentTarget || e.target, t.startX = e.clientX, t.startY = e.clientY, t.isTap = !0, t.isPan = !1, t.isPress = !1, t.startTime = Date.now(), t.pressHandler = setTimeout(() => {
	      t.isPress = !0, t.isTap = !1;
	      const e = new Event("press");
	      this.log && console.log("press"), t.el.dispatchEvent(e), t.pressHandler = null;
	    }, this.options.pressDuration);
	  }

	  move(e, t) {
	    const s = e.clientX - t.startX,
	          n = e.clientY - t.startY;

	    if (s * s + n * n > this.options.panDistance * this.options.panDistance) {
	      if (null !== t.pressHandler) clearTimeout(t.pressHandler), t.pressHandler = null, t.isPress = !1;else if (t.isPress) {
	        t.isPress = !1;
	        const e = new Event("presscancel");
	        this.log && console.log("presscancel"), t.el.dispatchEvent(e);
	      }

	      if (t.isTap = !1, !1 === t.isPan) {
	        t.isPan = !0, Math.abs(s) > Math.abs(n) ? (t.isVertical = !1, t.isHorizontal = !0) : (t.isVertical = !0, t.isHorizontal = !1);
	        const e = new Event("panstart");
	        this.log && console.log("panstart"), e.startX = t.startX, e.startY = t.startY, t.el.dispatchEvent(e);
	      }
	    }

	    if (t.isPan) {
	      const e = new Event("pan");
	      e.dx = s > 0 ? s - this.options.panDistance : s + this.options.panDistance, e.dy = n, e.isHorizontal = t.isHorizontal, e.isVertical = t.isVertical, this.log && console.log("pan"), t.el.dispatchEvent(e);
	    }
	  }

	  end(e, t) {
	    if (null !== t.pressHandler && clearTimeout(t.pressHandler), t.isPress) {
	      const e = new Event("pressend");
	      this.log && console.log("pressend"), t.el.dispatchEvent(e);
	    }

	    if (t.isTap) {
	      const e = new Event("tap");
	      this.log && console.log("tap"), t.el.dispatchEvent(e);
	    }

	    const s = e.clientX - t.startX,
	          n = e.clientY - t.startY,
	          i = Math.sqrt(s * s, n * n) / (Date.now() - t.startTime);

	    if (t.isPan && i > this.options.flickSpeed) {
	      t.isFlick = !0;
	      const e = new Event("flick");
	      this.log && console.log("flick"), e.dx = s, e.dy = n, t.el.dispatchEvent(e);
	    } else t.isFlick = !1;

	    if (t.isPan) {
	      const e = new Event("panend");
	      this.log && console.log("panend"), e.dx = s, e.dy = n, e.isHorizontal = t.isHorizontal, e.isVertical = t.isVertical, e.isFlick = t.isFlick, t.el.dispatchEvent(e);
	    }
	  }

	  cancel(e, t) {
	    if (t.isPan) {
	      const e = new Event("pancancel");
	      t.el.dispatchEvent(e);
	    }

	    if (t.isPress) {
	      const e = new Event("presscancel");
	      t.el.dispatchEvent(e);
	    }

	    if (null !== t.pressHandler) {
	      const e = new Event("pancancel");
	      t.el.dispatchEvent(e), clearTimeout(t.pressHandler);
	    }
	  }

	}

	console.log(Gesture);

}());
//# sourceMappingURL=index.js.map
