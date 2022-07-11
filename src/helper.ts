import { CompareViewData } from "./compare_view_data";

// from https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas#17130415
export function set_mouse_pos(cvd: CompareViewData, e: MouseEvent): void {
    // abs. size of element
    let rect = cvd.canvas.getBoundingClientRect();
    // relationship bitmap vs. element for x
    let scale_x = cvd.width / rect.width;
    // relationship bitmap vs. element for y
    let scale_y = cvd.height / rect.height;

    // scale mouse coordinates after they have been adjusted to be relative to element
    cvd.mouse_pos = [
        (e.clientX - rect.left) * scale_x,
        (e.clientY - rect.top) * scale_y,
    ];
}

// from: https://medium.com/@weberzt/how-to-create-a-random-id-in-javascript-e92b39fedaef
export function create_key(): string {
    let key = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 12; i++) {
        key += characters.charAt(Math.floor(Math.random() * 36));
    }
    return key;
}

