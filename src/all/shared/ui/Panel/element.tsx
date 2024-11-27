import "./element.css";
import { default as IPanel } from "./Interface";

export const Panel = ({ zoomState, getCanvasState }: IPanel) => {
  const { scale } = zoomState ?? { scale: 0 };

  const onZoom = (action = "out") => {
    if (!getCanvasState) {
      return;
    }
    const canvasState = getCanvasState();
    const { canvasNode, currentPosition, d3Zoom } = canvasState || {};
    const { k: currentScale } = currentPosition || {};
    const diff = action === "out" ? -0.25 : 0.25;
    d3Zoom.scaleTo(canvasNode.transition().duration(500), currentScale + diff);
  };

  return (
    <div className="panel-wrapper">
      <div onClick={() => onZoom()}>-</div>
      <div>{Math.round(scale * 100)} %</div>
      <div onClick={() => onZoom("in")}>+</div>
    </div>
  );
};
