import { Image } from "./compare_view_data";

export function load_images(image_urls: string[], callback: (images: Image[]) => void): void {
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

