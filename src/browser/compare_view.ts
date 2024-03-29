// entry point for use directly in browser
import { Config } from "../cfg";
import { load_cvd } from "../load_cvd";
import { attach_control_data } from "../controls";
import { load_ctx } from "./canvas";
import { create_controls } from "./create_controls";
import { CompareViewData } from "../compare_view_data";
import { load_new_imgs } from "../images";

export interface BrowserConfig extends Config {
    // leave undefined to not create controls
    controls_id?: string;
    // random string used to create unique ids
    key?: string;
}

export function load(
    image_urls: string[],
    canvas_id: string,
    config: BrowserConfig = {},
    callback: (cvd: CompareViewData) => void = () => { }
): void {
    // create controls before image loading
    let ctrl_data = config.controls_id != undefined ? create_controls(config.controls_id, config.key) : undefined;
    load_cvd(
        image_urls,
        load_ctx(canvas_id),
        config,
        (cvd) => {
            if (ctrl_data != undefined)
                attach_control_data(cvd, ctrl_data);
            callback(cvd);
        },
    )
}

export { load_new_imgs };

