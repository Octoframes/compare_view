// TODO: don't use strings for production maybe?
export enum Mode {
    undefined = "undefined",
    vertical = "vertical",
    horizontal = "horizontal",
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
};

export interface Image {
    url: string,
    element: HTMLImageElement,
    label: string,
}

export interface CompareViewData {
    images: Image[],
    // number of images doesn't change
    images_len: number,

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

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
    circle_pos: [number, number];
    circle_size: number;
};

