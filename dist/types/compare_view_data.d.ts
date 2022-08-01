import { Config } from "./cfg";
export declare enum Mode {
    undefined = "undefined",
    horizontal = "horizontal",
    vertical = "vertical",
    circle = "circle"
}
export declare enum Task {
    none = 0,
    revolve_imgs = 1,
    update_imgs = 2,
    change_mode = 3,
    update_circle = 4,
    remove_circle = 5,
    start_slider_move = 6,
    possible_instant_slide = 7,
    update_slider = 8
}
export interface Image {
    url: string;
    element: HTMLImageElement;
    label: string;
}
export interface ControlData {
    circle_check: HTMLInputElement;
    horizontal_check: HTMLInputElement;
    vertical_check: HTMLInputElement;
    revolve_imgs_button: HTMLButtonElement;
}
export interface CompareViewData {
    cfg: Config;
    images: Image[];
    images_len: number;
    new_images: Image[];
    new_image_resolution: [number, number];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    ctrl_data?: ControlData;
    mouse_pos: [number, number];
    held_down: boolean;
    next_mode: Mode;
    current_mode: Mode;
    task_stack: Task[];
    next_update_queued: boolean;
    circumference_thickness: number;
    render_circle: boolean;
    circle_size: number;
    show_circle: boolean;
    revolve_imgs_on_click: boolean;
    touching: boolean;
    slider_thickness: number;
    slider_pos: number;
    slider_time: number;
    rate_function: (x: number) => number;
    show_slider: boolean;
    start_timestamp: number;
    start_pos: number;
    target_pos: number;
}
