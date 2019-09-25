import AlgType from './Type';
import cubeBezierGenerator, { linear, ease, easeIn, easeOut, easeInOut } from './CubeBezier';

export default class InterpolationAlg {
  static getValue = (
    curT: number,
    startT: number,
    endT: number,
    startVal: number,
    endVal: number,
    type: AlgType = AlgType.linear,
    cusParam: [number, number, number, number] = [0, 0, 1, 1]
  ): number => {
    const progress = (curT - startT) / (endT - startT);
    const dVal = endVal - startVal;
    let displacement: number;
    switch (type) {
      case AlgType.linear:
        displacement = linear(progress) * dVal;
      case AlgType.ease:
        displacement = ease(progress) * dVal;
      case AlgType.easeIn:
        displacement = easeIn(progress) * dVal;
      case AlgType.easeOut:
        displacement = easeOut(progress) * dVal;
      case AlgType.easeInOut:
        displacement = easeInOut(progress) * dVal;
      case AlgType.custom:
        displacement =
          cubeBezierGenerator({ p1x: cusParam[0], p1y: cusParam[1], p2x: cusParam[2], p2y: cusParam[3] })(progress) *
          dVal;
      default:
        displacement = linear(progress) * dVal;
    }
    return displacement + startVal;
  };
}
