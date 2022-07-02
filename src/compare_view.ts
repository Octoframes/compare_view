import { Mode, Task, CompareViewData, Image } from "./compare_view_data";
import { push_task } from "./engine/task_solver";

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
export function load_compare_view(canvas_id: string, start_mode: Mode, image_urls: [string, string]): void {
    let ctx = load_ctx(canvas_id);
    load_images(image_urls, (images) => {
        let cvd: CompareViewData = {
            images: images,

            canvas: ctx.canvas,
            ctx: ctx,
            width: ctx.canvas.width,
            height: ctx.canvas.height,

            next_mode: start_mode,
            current_mode: Mode.undefined,
            task_stack: [],
            next_update_queued: false,

            render_circle: false,
            circle_pos: [0, 0],
            circle_size: 200,
        };

        // start the action
        push_task(cvd, Task.change_mode);
    });
}

