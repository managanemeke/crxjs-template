import { ZoomBehavior } from "d3-zoom";
import { Transition } from "d3-transition";

export default interface Interface {
  readonly zoomState?: {
    scale: number;
  },
  readonly getCanvasState?: () => {
    canvasNode: Transition<never, never, never, never>;
    currentPosition: never;
    d3Zoom: ZoomBehavior<never, never>;
  };
}
