import { cloneElement, useState } from "react";
import PropTypes from "prop-types";

const CreateElementWithGesture = ({
  children,
  onPan,
  onTap,
  onPress,
  onPanStart,
  onPanEnd
}) => {
  const [contexts, setContexts] = useState(Object.create(null));
  const start = ({ point, context, event, updateContext }) => {
    const newContext = { ...context };
    newContext.startX = point.clientX;
    newContext.startY = point.clientY;
    newContext.startTime = event.timeStamp;

    newContext.isTap = true;
    newContext.isPan = false;
    newContext.isPress = false;

    updateContext(newContext);
  };

  const move = ({ point, context, updateContext }) => {
    const dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    const distance = dx * dx + dy * dy;
    const newContext = { ...context };
    if (distance > 100) {
      newContext.isTap = false;
      if (context.isPan === false) {
        const isVertical = Math.abs(dx) > Math.abs(dy);
        newContext.isVertical = isVertical;
        newContext.isHorizontal = !isVertical;

        const eventInfo = { ...newContext, type: "panstart" };
        if (onPanStart) {
          onPanStart(eventInfo);
        }
        newContext.isPan = true;
      }
    }
    if (newContext.isPan) {
      const eventInfo = { ...newContext, type: "pan", dx, dy };
      if (onPan) {
        onPan(eventInfo);
      }
    }
    updateContext(newContext);
  };

  const end = ({ point, context, event }) => {
    let dx = point.clientX - context.startX,
      dy = point.clientY - context.startY;
    if (context.isPan) {
      const newEvent = { ...context, type: "panend", dx, dy };
      if (onPanEnd) {
        onPanEnd(newEvent);
      }
    }
  };

  const touchStart = event => {
    for (let touch of event.changedTouches) {
      const context = Object.create(null);
      setContexts({ ...context, [touch.identifier]: context });
      start({
        point: touch,
        context,
        event,
        updateContext: context => setContexts({ [touch.identifier]: context })
      });
    }
  };

  const touchmove = event => {
    for (let touch of event.changedTouches) {
      move({
        point: touch,
        context: contexts[touch.identifier],
        updateContext: context => setContexts({ [touch.identifier]: context })
      });
    }
  };

  const touchEnd = event => {
    for (let touch of event.changedTouches) {
      end({
        point: touch,
        context: contexts[touch.identifier],
        event,
        updateContext: context => setContexts({ [touch.identifier]: context })
      });
      delete contexts[touch.identifier];
    }
  };

  return cloneElement(children, {
    onTouchStart: touchStart,
    onTouchMove: touchmove,
    onTouchEnd: touchEnd
  });
};

CreateElementWithGesture.propTypes = {
  onPanStart: PropTypes.func,
  onPan: PropTypes.func,
  onPanEnd: PropTypes.func
};

export default CreateElementWithGesture;
