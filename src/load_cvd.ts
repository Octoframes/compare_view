import { Mode, Task, CompareViewData, ControlData } from "./compare_view_data";
import { push_task } from "./task_solver";
import { attach_control_events } from "./controls";
import { load_images } from "./images";

export interface Config {
    start_mode?: Mode;
    // size of circle outline as fraction of image width or height (whatever is bigger)
    circumference_fraction?: number;
    // overwrite circle size
    circle_size?: number;
    circle_fraction?: number;
    // draw line around circle
    show_circle?: boolean;
    revolve_imgs_on_click?: boolean;
    slider_fraction?: number;
    // time slider takes to reach clicked location
    slider_time?: number;
    // apply when moving slider
    // see: https://easings.net
    rate_function?: (x: number) => number;
    // 0.0 -> left; 1.0 -> right
    start_slider_pos?: number;
    // draw line at slider
    show_slider?: boolean;
}

// default rate function
function ease_in_out_cubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
const default_cfg: Config = {
    start_mode: Mode.circle,
    circumference_fraction: 0.005,
    circle_size: undefined,
    circle_fraction: 0.2,
    show_circle: true,
    revolve_imgs_on_click: true,
    slider_fraction: 0.01,
    slider_time: 400,
    rate_function: ease_in_out_cubic,
    start_slider_pos: 0.5,
    show_slider: true,
}

// default config only when custom config isn't defined
function choose_cfg(cfg: Config, key: keyof Config): any {
    return cfg[key] != undefined ? cfg[key] : default_cfg[key];
}

export function load_cvd(image_urls: string[], ctx: CanvasRenderingContext2D, cfg: Config, ctrl_data?: ControlData): void {
    load_images(image_urls, (images, resolution) => {
        // used to e.g. scale circle correctly 
        let max_size = Math.max(resolution[0], resolution[1]);
        let cvd: CompareViewData = {
            images: images,
            images_len: images.length,

            canvas: ctx.canvas,
            ctx: ctx,
            width: resolution[0],
            height: resolution[1],

            ctrl_data: ctrl_data,

            mouse_pos: [0, 0],
            held_down: false,

            next_mode: choose_cfg(cfg, "start_mode"),
            current_mode: Mode.undefined,

            task_stack: [],
            next_update_queued: false,

            circumference_thickness: max_size * choose_cfg(cfg, "circumference_fraction"),

            render_circle: false,
            // use circle_size when provided, otherwise use fraction
            circle_size: cfg.circle_size != undefined ? cfg.circle_size : max_size * choose_cfg(cfg, "circle_fraction"),
            show_circle: choose_cfg(cfg, "show_circle"),
            revolve_imgs_on_click: choose_cfg(cfg, "revolve_imgs_on_click"),
            touching: false,

            slider_thickness: max_size * choose_cfg(cfg, "slider_fraction"),

            slider_pos: choose_cfg(cfg, "start_slider_pos"),
            slider_time: choose_cfg(cfg, "slider_time"),
            rate_function: choose_cfg(cfg, "rate_function"),
            show_slider: choose_cfg(cfg, "show_slider"),

            start_timestamp: 0,
            start_pos: 0,
            target_pos: 0,
        };
        // give canvas resolution of images
        cvd.canvas.width = cvd.width;
        cvd.canvas.height = cvd.height;
        attach_control_events(cvd);

        // protect against double attaching
        if (cvd.canvas.dataset["in_use"] === "y")
            throw `the canvas with the id '${cvd.canvas.id}' is already in use`;
        cvd.canvas.dataset["in_use"] = "y";
        // start the action
        push_task(cvd, Task.change_mode);
    });
}

