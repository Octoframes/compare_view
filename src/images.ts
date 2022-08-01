import { CompareViewData, Image, Task } from "./compare_view_data";
import { load_canvas_scaling } from "./scaling";
import { push_task } from "./task_solver";

function get_img_resolution(images: Image[]): [number, number] {
    let width = images[0]?.element.width as number;
    let height = images[0]?.element.height as number;

    for (let image of images) {
        if (image.element.width != width || image.element.height != height)
            console.log(`Warning: images don't have the same resolution`);
        width = Math.max(width, image.element.width);
        height = Math.max(height, image.element.height);
    }
    return [width, height];
}

export function load_images(image_urls: string[], callback: (images: Image[], img_resolution: [number, number]) => void): void {
    if (image_urls.length < 2)
        throw `image_urls must contain at least two images, not ${image_urls.length}`;
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
            if (loaded == num_images) {
                callback(images, get_img_resolution(images));
            }
        }
        image.element.src = image.url;
    }
}

export function revolve_imgs(cvd: CompareViewData): boolean {
    cvd.images.unshift(cvd.images.pop() as Image);
    return true;
}

export function update_images(cvd: CompareViewData): boolean {
    cvd.images = cvd.new_images;
    load_canvas_scaling(cvd, cvd.new_image_resolution);
    return true;
}

// TODO: accept HTMLImageElement
export function load_new_imgs(cvd: CompareViewData, image_urls: string[]): void {
    load_images(image_urls, (images, img_resolution) => {
        cvd.new_images = images;
        cvd.images_len = images.length;
        cvd.new_image_resolution = img_resolution;
        push_task(cvd, Task.update_imgs);
    });
}

