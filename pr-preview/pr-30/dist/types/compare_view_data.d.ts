export declare enum Mode {
    undefined = "undefined",
    horizontal = "horizontal",
    vertical = "vertical",
    circle = "circle"
}
export declare enum Task {
    none = 0,
    revolve_imgs = 1,
    change_mode = 2,
    update_circle = 3,
    remove_circle = 4,
    start_slider_move = 5,
    possible_instant_slide = 6,
    update_slider = 7
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
    images: Image[];
    images_len: number;
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
