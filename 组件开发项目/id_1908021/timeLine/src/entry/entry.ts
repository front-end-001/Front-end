import TimeLine from '../css-animation-lib/animation/Timeline';
import DOMElementStyleNumberAnimation from '../css-animation-lib/animation/DOMElementStyleNumberAnimation';
import AlgType from '../css-animation-lib/algorithm/Type';

let tl = new TimeLine();

const pauseBtn = document.getElementById('pause');
const resumeBtn = document.getElementById('resume');

if (pauseBtn && resumeBtn) {
  pauseBtn.addEventListener('click', tl.pause);
  resumeBtn.addEventListener('click', tl.resume);
}

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
tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById('ball'),
    'left',
    500,
    0,
    1000,
    200,
    v => `${v}px`,
    AlgType.easeIn
  )
);
tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById('ball'),
    'top',
    1000,
    200,
    1500,
    0,
    v => `${v}px`,
    AlgType.easeIn
  )
);
tl.addAnimation(
  new DOMElementStyleNumberAnimation(
    document.getElementById('ball'),
    'left',
    1500,
    200,
    2000,
    0,
    v => `${v}px`,
    AlgType.easeIn
  )
);
tl.rate = 1;

tl.start();
