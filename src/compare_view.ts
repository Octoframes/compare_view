import { Mode, Task, CompareViewData, Image } from "./compare_view_data";
import { push_task } from "./engine/task_solver";
import { create_controls, attach_control_events } from "./controls";

function load_ctx(canvas_id: string): CanvasRenderingContext2D {
    let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // load actual size defined by CSS
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    return ctx;
}

function load_images(image_urls: string[], callback: (images: Image[]) => void): void {
    let images: Image[] = [];
    let loaded = 0;
    let num_images = image_urls.length;

    for (let i = 0; i < num_images; ++i) {
        let image: Image = ({
            url: image_urls[i] as string,
            element: document.createElement("img"),
            label: `${i}`,
        });
        images.push(image)

        image.element.onload = () => {
            ++loaded;
            // loading finished when all loaded
            if (loaded == num_images)
                callback(images);
        }
        image.element.src = image.url;
    }
}

// entry point
export function load_compare_view(canvas_id: string, controls_id: string, key: string, start_mode: Mode, image_urls: string[]): void {
    function ease_in_out_cubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    let ctx = load_ctx(canvas_id);
    load_images(image_urls, (images) => {
        let cvd: CompareViewData = {
            images: images,
            images_len: images.length,

            canvas: ctx.canvas,
            ctx: ctx,
            width: ctx.canvas.width,
            height: ctx.canvas.height,

            ctrl_data: create_controls(controls_id, key),

            next_mode: start_mode,
            current_mode: Mode.undefined,
            task_stack: [],
            next_update_queued: false,

            mouse_pos: [0, 0],
            held_down: false,

            render_circle: false,
            circle_size: 100,

            slider_pos: 0.5,
            slider_time: 400,
            rate_function: ease_in_out_cubic,

            start_timestamp: 0,
            target_timestamp: 0,
            start_pos: 0,
            target_pos: 0,
        };
        attach_control_events(cvd);

        // start the action
        push_task(cvd, Task.change_mode);
    });
}

