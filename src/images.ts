import { Image } from "./compare_view_data";

function verify_image_resolution(images: Image[]): [number, number] {
    let width = images[0]?.element.width as number;
    let height = images[0]?.element.height as number;

    for (let image of images)
        if (image.element.width != width || image.element.height != height)
            throw `images don't have the same resolution`;
    return [width, height];
}

export function load_images(image_urls: string[], callback: (images: Image[], resolution: [number, number]) => void): void {
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
                let resolution = verify_image_resolution(images);
                callback(images, resolution);
            }
        }
        image.element.src = image.url;
    }
}

