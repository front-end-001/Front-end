# How to run

## Directly in browser
double click `src\carousel.html` shows the combination of animation and carousel
double click `src\timeline.new.html` shows the animation

## How to use
`npm install` will install all dependences;  

import `src\animation\timeline.ts` in your files and use like this:

```js
import TimeLine from '../animation/Timeline';
import DOMElementStyleNumberAnimation from '../animation/DOMElementStyleNumberAnimation';

let tl = new TimeLine();


tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById('ball'),
    'top',
    0,
    0,
    500,
    200,
    v => `${v}px`,
    AlgType.easeIn
  )
);
```

## Provide Inner Animation CubeBezier Interpolation Algorithm

```js
export const linear = cubeBezierGenerator({ p1x: 0, p1y: 0, p2x: 1, p2y: 1 });
export const ease = cubeBezierGenerator({ p1x: 0.25, p1y: 0.1, p2x: 0.25, p2y: 1 });
export const easeIn = cubeBezierGenerator({ p1x: 0.42, p1y: 0, p2x: 1, p2y: 1 });
export const easeOut = cubeBezierGenerator({ p1x: 0, p1y: 0, p2x: 0.58, p2y: 1 });
export const easeInOut = cubeBezierGenerator({ p1x: 0.42, p1y: 0, p2x: 0.58, p2y: 1 });
```

**You can aslo custom define your cubeBezier params by setting the AlgType:`custom`:**
```js
tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById('ball'),
    'top',
    0,
    0,
    500,
    200,
    v => `${v}px`,
    AlgType.custom,
    [0,0,1,1]
  )
);

```
