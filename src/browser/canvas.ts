export function load_ctx(canvas_id: string): CanvasRenderingContext2D {
    let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // to make canvas focusable
    canvas.tabIndex = 1;
    return ctx;
}

