import { Mode } from "./compare_view_data";

export interface Config {
    start_mode?: Mode;
    // size of circle outline as fraction of image width or height (whatever is bigger)
    circumference_fraction?: number;
    // overwrite circle size
    circle_size?: number;
    circle_fraction?: number;
    // draw line around circle
    show_circle?: boolean;
    revolve_imgs_on_click?: boolean;
    slider_fraction?: number;
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

// default rate function
function ease_in_out_cubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
const default_cfg: Config = {
    start_mode: Mode.circle,
    circumference_fraction: 0.005,
    circle_size: undefined,
    circle_fraction: 0.2,
    show_circle: true,
    revolve_imgs_on_click: true,
    slider_fraction: 0.01,
    slider_time: 400,
    rate_function: ease_in_out_cubic,
    start_slider_pos: 0.5,
    show_slider: true,
}

// default config only when custom config isn't defined
export function choose_cfg(cfg: Config, key: keyof Config): any {
    return cfg[key] != undefined ? cfg[key] : default_cfg[key];
}
