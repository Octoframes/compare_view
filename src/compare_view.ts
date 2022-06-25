import { Mode, CompareViewData } from "./compare_view_data";
import { init_circle_mode } from "./circle_mode";

function load_current_mode(cvd: CompareViewData): void {
    cvd.current_mode = cvd.next_mode;
    switch (cvd.current_mode) {
        case Mode.circle:
            init_circle_mode(cvd);
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
}

export function load_compare_view(canvas_id: string, start_mode: Mode) {
    let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // load actual size defined by CSS
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    let cvd: CompareViewData = {
        canvas: canvas,
        ctx: ctx,
        width: canvas.width,
        height: canvas.height,
        next_mode: start_mode,
        current_mode: Mode.undefined,
        load_current_mode: load_current_mode,
    };

    // start the action
    load_current_mode(cvd);
}
