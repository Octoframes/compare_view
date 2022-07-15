import { choose_cfg, Config } from "./cfg";
import { CompareViewData, Task } from "./compare_view_data";

// needs to get called every time canvas size changes
function load_fractions(cvd: CompareViewData, cfg: Config): void {
    let max_size = Math.max(cvd.canvas.width, cvd.canvas.height);
    cvd.circumference_thickness = max_size * choose_cfg(cfg, "circumference_fraction");
    // use circle_size when provided, otherwise use fraction
    cvd.circle_size = cfg.circle_size != undefined ? cfg.circle_size : max_size * choose_cfg(cfg, "circle_fraction");
    cvd.slider_thickness = max_size * choose_cfg(cfg, "slider_fraction");
}

export function load_canvas_scaling(cvd: CompareViewData, img_resolution: [number, number], cfg: Config): void {
    cvd.canvas.width = img_resolution[0];
    cvd.canvas.height = img_resolution[1];
    cvd.width = cvd.canvas.width;
    cvd.height = cvd.canvas.height;

    load_fractions(cvd, cfg);
}
