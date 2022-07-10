export function load_ctx(canvas_id: string): CanvasRenderingContext2D {
    let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // load actual size defined by CSS
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    return ctx;
}

