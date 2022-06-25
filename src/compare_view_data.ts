export enum Mode {
    undefined,
    vertical,
    horizontal,
    circle,
};

export enum Task {
    // don't do anything, just render
    none,
    change_mode,
};

export interface CompareViewData {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;

    // vertical_position: number;
    // horizontal_position: number;

    // when current mode isn't same as next_mode, terminate current mode and call routing function
    next_mode: Mode;
    // for debugging
    current_mode: Mode;

    // what needs to be done in the next frame
    task_stack: Task[];
    // don't can update function when it's already about to be called
    next_update_queued: boolean;
};
