import { Mode, Task, CompareViewData } from "./compare_view_data";
import { launch_update } from "./task_solver";

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
        task_stack: [Task.none],
        next_update_queued: false,
    };

    // start the action
    launch_update(cvd);
}
