import { Mode, Task, CompareViewData, ControlData } from "./compare_view_data";
import { push_task } from "./task_solver";
import { attach_control_events } from "./controls";
import { load_images } from "./images";

export interface Config {
    start_mode?: Mode;
    circle_size?: number;
    // draw line around circle
    show_circle?: boolean;
    rotate_imgs_on_click?: boolean;
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
    if (image_urls.length < 2)
        throw `image_urls must contain at least two images, not ${image_urls.length}`;
    // default rate function
    function ease_in_out_cubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    load_images(image_urls, (images) => {
        let cvd: CompareViewData = {
            images: images,
            images_len: images.length,

            canvas: ctx.canvas,
            ctx: ctx,
            width: ctx.canvas.width,
            height: ctx.canvas.height,

            ctrl_data: ctrl_data,

            next_mode: config.start_mode != undefined ? config.start_mode : Mode.circle,
            current_mode: Mode.undefined,
            task_stack: [],
            next_update_queued: false,

            mouse_pos: [0, 0],
            held_down: false,

            render_circle: false,
            circle_size: config.circle_size != undefined ? config.circle_size : 100,
            show_circle: config.show_circle != undefined ? config.show_circle : true,
            rotate_imgs_on_click: config.rotate_imgs_on_click != undefined ? config.rotate_imgs_on_click : true,

            slider_pos: config.start_slider_pos != undefined ? config.start_slider_pos : 0.5,
            slider_time: config.slider_time != undefined ? config.slider_time : 400,
            rate_function: config.rate_function != undefined ? config.rate_function : ease_in_out_cubic,
            show_slider: config.show_slider != undefined ? config.show_slider : true,

            start_timestamp: 0,
            start_pos: 0,
            target_pos: 0,
        };
        attach_control_events(cvd);

        // start the action
        push_task(cvd, Task.change_mode);
    });
}

