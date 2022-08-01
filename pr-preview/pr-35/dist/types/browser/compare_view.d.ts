import { Config } from "../cfg";
import { CompareViewData } from "../compare_view_data";
import { load_new_imgs } from "../images";
export interface BrowserConfig extends Config {
    controls_id?: string;
    key?: string;
}
export declare function load(image_urls: string[], canvas_id: string, config?: BrowserConfig, callback?: (cvd: CompareViewData) => void): void;
export { load_new_imgs };
