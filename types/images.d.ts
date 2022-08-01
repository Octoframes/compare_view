import { CompareViewData, Image } from "./compare_view_data";
export declare function load_images(image_urls: string[], callback: (images: Image[], img_resolution: [number, number]) => void): void;
export declare function revolve_imgs(cvd: CompareViewData): boolean;
export declare function update_images(cvd: CompareViewData): boolean;
export declare function load_new_imgs(cvd: CompareViewData, image_urls: string[]): void;
