import { CompareViewData, Mode, Task } from "../compare_view_data";
import { push_task } from "../task_solver";
import { set_mouse_pos } from "../helper";

export function init_slider_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousedown = () => {
        cvd.held_down = true;
        push_task(cvd, Task.start_slider_move);
    };
    cvd.canvas.onmouseup = () => {
        cvd.held_down = false;
    };
    // keep slider active when hovering over edge
    document.onmouseup = () => {
        cvd.held_down = false;
    };
    cvd.canvas.onmousemove = (e) => {
        set_mouse_pos(cvd, e);
        push_task(cvd, Task.possible_instant_slide);
    };
    // cursor style
    if (cvd.current_mode == Mode.horizontal)
        cvd.canvas.onmouseenter = () => {
            console.log("test");
            cvd.canvas.style.cursor = "ew-resize";
        };
    else
        cvd.canvas.onmouseenter = () => {
            cvd.canvas.style.cursor = "ns-resize";
        };
    cvd.canvas.onmouseleave = () => {
        cvd.canvas.style.cursor = "default";
    };
}
export function terminate_slider_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousedown = null;
    cvd.canvas.onmouseup = null;
    document.onmouseup = null;
    cvd.canvas.onmouseup = null;
    cvd.canvas.onmousemove = null;
    cvd.canvas.onmouseenter = null;
    cvd.canvas.onmouseleave = null;
}

// tasks //
export function start_slider_move(cvd: CompareViewData, timestamp: number): boolean {
    push_task(cvd, Task.update_slider);
    cvd.start_timestamp = timestamp;

    cvd.start_pos = cvd.slider_pos;
    if (cvd.current_mode == Mode.horizontal)
        cvd.target_pos = cvd.mouse_pos[0] / cvd.width;
    else
        cvd.target_pos = cvd.mouse_pos[1] / cvd.height;

    return true;
}

export function instant_slide(cvd: CompareViewData, timestamp: number): boolean {
    // only when mouse button is pressed
    if (cvd.held_down) {
        if (cvd.current_mode == Mode.horizontal)
            cvd.target_pos = cvd.mouse_pos[0] / cvd.width;
        else
            cvd.target_pos = cvd.mouse_pos[1] / cvd.height;
        cvd.start_pos = cvd.target_pos;
        cvd.slider_pos = cvd.target_pos;
    }
    return true;
}

export function update_slider(cvd: CompareViewData, timestamp: number): boolean {
    let current_time_delta = timestamp - cvd.start_timestamp;
    // current position in animation
    let x = current_time_delta / cvd.slider_time;
    // clamp
    x = Math.min(Math.max(x, 0), 1)
    x = cvd.rate_function(x);
    // lerp
    cvd.slider_pos = (1 - x) * cvd.start_pos + x * cvd.target_pos;
    // reached target?
    return cvd.slider_pos == cvd.target_pos;
}

function render_slider_line(cvd: CompareViewData): void {
    cvd.ctx.beginPath();
    if (cvd.current_mode == Mode.horizontal) {
        cvd.ctx.moveTo(cvd.slider_pos * cvd.width, 0);
        cvd.ctx.lineTo(cvd.slider_pos * cvd.width, cvd.height);
    }
    else {
        cvd.ctx.moveTo(0, cvd.slider_pos * cvd.height);
        cvd.ctx.lineTo(cvd.width, cvd.slider_pos * cvd.height);
    }
    cvd.ctx.closePath();
    cvd.ctx.strokeStyle = "black";
    cvd.ctx.lineWidth = cvd.slider_thickness;
    cvd.ctx.stroke();
}

function render_second_img(cvd: CompareViewData): void {
    cvd.ctx.beginPath();
    if (cvd.current_mode == Mode.horizontal)
        cvd.ctx.rect(cvd.slider_pos * cvd.width, 0, cvd.width, cvd.height);
    else
        cvd.ctx.rect(0, cvd.slider_pos * cvd.height, cvd.width, cvd.height);
    cvd.ctx.closePath();

    // save to remove clip later on
    cvd.ctx.save();
    cvd.ctx.clip();
    // don't let second image overlap first with transparency
    cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);
    cvd.ctx.drawImage(cvd.images[1]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    cvd.ctx.restore();
}

export function render_slider(cvd: CompareViewData): void {
    cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

    cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);

    if (cvd.show_slider)
        render_slider_line(cvd);

    render_second_img(cvd);
}

