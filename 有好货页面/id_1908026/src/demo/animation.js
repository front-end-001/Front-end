import "./animation.scss";

import Timeline from "./Timeline";
import DOMElementStyleNumberAnimation from "./DOMElementStyleNumberAnimation";
import DOMElementStyleVectorAnimation from "./DOMElementStyleVectorAnimation";

const tl = new Timeline();
tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById("app"),
    "top",
    0,
    0,
    500,
    100,
    (v) => `${v}px`,
  ),
);

tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById("app"),
    "left",
    500,
    0,
    1000,
    100,
    (v) => `${v}px`,
  ),
);

tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById("app"),
    "top",
    1000,
    100,
    1500,
    0,
    (v) => `${v}px`,
  ),
);

tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById("app"),
    "left",
    1500,
    100,
    2000,
    0,
    (v) => `${v}px`,
  ),
);

tl.addAnimation(
  new DOMElementStyleVectorAnimation(
    document.getElementById("app"),
    "backgroundColor",
    0,
    [255, 0, 0],
    2000,
    [0, 255, 0],
    (v) => `rgb(${v[0]}, ${v[1]},${v[2]})`,
  ),
);
// tl.startPoint = 1000;
// tl.rate = 0.2;
tl.start();
