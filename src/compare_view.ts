import { Mode, Task, CompareViewData } from "./compare_view_data";
import { launch_update } from "./task_solver";

function load_ctx(canvas_id: string): CanvasRenderingContext2D {
    let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // load actual size defined by CSS
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    return ctx;
}

function load_images(image_urls: [string, string], callback: (images: [HTMLImageElement, HTMLImageElement]) => void): void {
    if (image_urls.length != 2)
        throw `image_urls must contain exactly two images, not ${image_urls.length}`;

    let images = image_urls.map(() => { return document.createElement("img"); }) as [HTMLImageElement, HTMLImageElement];
    let loaded = 0;

    // TODO: fix this ugliness
    for (let i = 0; i < images.length; ++i) {
        let image = images[i] as HTMLImageElement;
        let image_url = image_urls[i] as string;

        image.onload = () => {
            ++loaded;
            // loading finished when all loaded
            if (loaded == images.length)
                callback(images);
        }
        image.src = image_url;
    }
}

// entry point
export function load_compare_view(canvas_id: string, start_mode: Mode, image_urls: [string, string]): void {
    let ctx = load_ctx(canvas_id);
    load_images(image_urls, (images) => {
        let cvd: CompareViewData = {
            image_urls: image_urls,
            images: images,

            canvas: ctx.canvas,
            ctx: ctx,
            width: ctx.canvas.width,
            height: ctx.canvas.height,

            next_mode: start_mode,
            current_mode: Mode.undefined,
            task_stack: [Task.none],
            next_update_queued: false,
        };

        // start the action
        launch_update(cvd);
    });
}

