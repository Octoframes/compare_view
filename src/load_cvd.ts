import { Mode, Task, CompareViewData, ControlData } from "./compare_view_data";
import { push_task } from "./task_solver";
import { attach_control_events } from "./controls";
import { load_images } from "./images";
import { load_canvas_scaling } from "./scaling";
import { choose_cfg, Config } from "./cfg";

export function load_cvd(image_urls: string[], ctx: CanvasRenderingContext2D, cfg: Config, ctrl_data?: ControlData): void {
    load_images(image_urls, (images, img_resolution) => {
        // used to e.g. scale circle correctly 
        let cvd: CompareViewData = {
            images: images,
            images_len: images.length,

            canvas: ctx.canvas,
            ctx: ctx,
            // to be changed later
            width: 0,
            height: 0,

            ctrl_data: ctrl_data,

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
        attach_control_events(cvd);
        load_canvas_scaling(cvd, img_resolution, cfg);

        // protect against double attaching
        if (cvd.canvas.dataset["in_use"] === "y")
            throw `the canvas with the id '${cvd.canvas.id}' is already in use`;
        cvd.canvas.dataset["in_use"] = "y";
        // start the action
        push_task(cvd, Task.change_mode);
    });
}

