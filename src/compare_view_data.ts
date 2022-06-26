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
    // switch current_mode to next_mode
    change_mode = "change_mode",
    // read current mouse position
    update_circle = "update_circle",
    remove_circle = "stop_update_circle",
};

export interface CompareViewData {
    image_urls: [string, string],
    images: [HTMLImageElement, HTMLImageElement],

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    // when current mode isn't same as next_mode, terminate current mode and call routing function
    next_mode: Mode;
    // for debugging
    current_mode: Mode;

    // what needs to be done in the next frame
    task_stack: Task[];
    // don't can update function when it's already about to be called
    next_update_queued: boolean;

    // circle mode //
    render_circle: boolean;
    circle_pos: [number, number];
    circle_size: number;
};