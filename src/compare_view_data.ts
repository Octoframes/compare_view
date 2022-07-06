// TODO: don't use strings for production maybe?
export enum Mode {
    undefined = "undefined",
    horizontal = "horizontal",
    vertical = "vertical",
    circle = "circle",
};

export enum Task {
    // don't do anything, just render once
    none = "none",
    rotate_imgs = "rotate_imgs",
    // switch current_mode to next_mode
    change_mode = "change_mode",
    // update circle position and start rendering
    update_circle = "update_circle",
    // stop rendering
    remove_circle = "stop_update_circle",

    update_horizontal = "update_horizontal",
    // mouse button isn't held down any more
    stop_horizontal = "stop_horizontal",
};

export interface Image {
    url: string,
    element: HTMLImageElement,
    label: string,
}

export interface ControlData {
    controls_parent: HTMLElement,
    circle_button: HTMLInputElement,
    horizontal_button: HTMLInputElement,

    rotate_imgs_button: HTMLButtonElement,
}

export interface CompareViewData {
    images: Image[],
    // number of images doesn't change
    images_len: number,

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    ctrl_data: ControlData;

    // kept updated when necessary
    mouse_pos: [number, number];

    // when current mode isn't same as next_mode, terminate current mode and call routing function
    next_mode: Mode;
    current_mode: Mode;

    // what needs to be done in the next frame
    task_stack: Task[];
    // don't can update function when it's already about to be called
    next_update_queued: boolean;

    // circle mode //
    // when render call from different source, circle shouldn't disappear
    render_circle: boolean;
    circle_size: number;

    // horizontal mode //
    horizontal_pos: number;
};

