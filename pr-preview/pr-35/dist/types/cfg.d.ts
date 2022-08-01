import { Mode } from "./compare_view_data";
export interface Config {
    start_mode?: Mode;
    circumference_fraction?: number;
    circle_size?: number;
    circle_fraction?: number;
    show_circle?: boolean;
    revolve_imgs_on_click?: boolean;
    slider_fraction?: number;
    slider_time?: number;
    rate_function?: (x: number) => number;
    start_slider_pos?: number;
    show_slider?: boolean;
}
export declare function choose_cfg(cfg: Config, key: keyof Config): any;
