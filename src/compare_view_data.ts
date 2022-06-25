export enum Mode {
    undefined,
    vertical,
    horizontal,
    circle,
}

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

    // callback circumvents circular imports
    load_current_mode: (cvd: CompareViewData) => void;
}
