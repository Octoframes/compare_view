import { choose_cfg, Config } from "./cfg";
import { CompareViewData, Task } from "./compare_view_data";
import { push_task } from "./task_solver";

// make compare_view instance behave like image without scaling improperly -> needs to get called every time viewport size changes
function reload_canvas_resolution(cvd: CompareViewData, img_resolution: [number, number]): void {
    // make canvas as big as images
    cvd.canvas.width = img_resolution[0];
    cvd.canvas.height = img_resolution[1];
    // scale canvas back to perfectly fill space
    let rect = cvd.canvas.getBoundingClientRect();
    cvd.canvas.width = rect.width;
    cvd.canvas.height = rect.height;
    cvd.width = rect.width;
    cvd.height = rect.height;
}

// needs to get called every time canvas size changes
function load_fractions(cvd: CompareViewData, cfg: Config): void {
    let max_size = Math.max(cvd.canvas.width, cvd.canvas.height);
    cvd.circumference_thickness = max_size * choose_cfg(cfg, "circumference_fraction");
    // use circle_size when provided, otherwise use fraction
    cvd.circle_size = cfg.circle_size != undefined ? cfg.circle_size : max_size * choose_cfg(cfg, "circle_fraction");
    cvd.slider_thickness = max_size * choose_cfg(cfg, "slider_fraction");
}

export function load_canvas_scaling(cvd: CompareViewData, img_resolution: [number, number], cfg: Config): void {
    window.addEventListener("resize", () => {
        reload_canvas_resolution(cvd, img_resolution);
        load_fractions(cvd, cfg);
        push_task(cvd, Task.none);
    });
    reload_canvas_resolution(cvd, img_resolution);
    load_fractions(cvd, cfg);
}
