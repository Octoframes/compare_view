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

export function load_cvd(image_urls: string[], ctx: CanvasRenderingContext2D, config: Config, ctrl_data?: ControlData): void {
    // default rate function
    function ease_in_out_cubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    load_images(image_urls, (images, resolution) => {
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

            next_mode: config.start_mode != undefined ? config.start_mode : Mode.circle,
            current_mode: Mode.undefined,
            task_stack: [],
            next_update_queued: false,

            circumference_thickness: max_size * (config.circumference_fraction != undefined ? config.circumference_fraction : 0.005),

            render_circle: false,
            // use circle_size when provided, otherwise use fraction
            circle_size: config.circle_size != undefined ? config.circle_size :
                max_size * (config.circle_fraction != undefined ? config.circle_fraction : 0.2),
            show_circle: config.show_circle != undefined ? config.show_circle : true,
            revolve_imgs_on_click: config.revolve_imgs_on_click != undefined ? config.revolve_imgs_on_click : true,

            slider_thickness: max_size * (config.slider_fraction != undefined ? config.slider_fraction : 0.01),

            slider_pos: config.start_slider_pos != undefined ? config.start_slider_pos : 0.5,
            slider_time: config.slider_time != undefined ? config.slider_time : 400,
            rate_function: config.rate_function != undefined ? config.rate_function : ease_in_out_cubic,
            show_slider: config.show_slider != undefined ? config.show_slider : true,

            start_timestamp: 0,
            start_pos: 0,
            target_pos: 0,
        };
        ctx.canvas.width = cvd.width;
        ctx.canvas.height = cvd.height;
        attach_control_events(cvd);

        // start the action
        push_task(cvd, Task.change_mode);
    });
}

