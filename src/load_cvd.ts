import { Mode, Task, CompareViewData } from "./compare_view_data";
import { push_task } from "./task_solver";
import { load_images } from "./images";
import { load_canvas_scaling } from "./scaling";
import { choose_cfg, Config } from "./cfg";

function prevent_double_attaching(canvas: HTMLCanvasElement): void {
    if (canvas.dataset["in_use"] === "y")
        throw `the canvas with the id '${canvas.id}' is already in use`;
    canvas.dataset["in_use"] = "y";
}

export function load_cvd(image_urls: string[], ctx: CanvasRenderingContext2D, cfg: Config = {}, prerun_callback?: (cvd: CompareViewData) => void): void {
    prevent_double_attaching(ctx.canvas);
    load_images(image_urls, (images, img_resolution) => {
        // used to e.g. scale circle correctly 
        let cvd: CompareViewData = {
            cfg: cfg,

            images: images,
            images_len: images.length,

            new_images: [],
            new_image_resolution: [0, 0],

            canvas: ctx.canvas,
            ctx: ctx,
            // to be changed later
            width: 0,
            height: 0,

            // to be changed later
            ctrl_data: undefined,

            mouse_pos: [0, 0],
            held_down: false,

            next_mode: choose_cfg(cfg, "start_mode"),
            current_mode: Mode.undefined,

            task_stack: [],
            next_update_queued: false,

            // to be changed later
            circumference_thickness: 0,

            render_circle: false,
            // to be changed later
            circle_size: 0,
            show_circle: choose_cfg(cfg, "show_circle"),
            revolve_imgs_on_click: choose_cfg(cfg, "revolve_imgs_on_click"),
            touching: false,

            // to be changed later
            slider_thickness: 0,

            slider_pos: choose_cfg(cfg, "start_slider_pos"),
            slider_time: choose_cfg(cfg, "slider_time"),
            rate_function: choose_cfg(cfg, "rate_function"),
            show_slider: choose_cfg(cfg, "show_slider"),

            start_timestamp: 0,
            start_pos: 0,
            target_pos: 0,
        };
        load_canvas_scaling(cvd, img_resolution);

        // e.g. let caller attach controls
        if (prerun_callback != undefined)
            prerun_callback(cvd);
        // start the action
        push_task(cvd, Task.change_mode);
    });
}

