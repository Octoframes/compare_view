import { CompareViewData, Mode, Task } from "../compare_view_data";
import { contains_task, delete_task, push_task } from "../engine/task_solver";

export function init_slider_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousedown = () => {
        push_task(cvd, Task.start_slider_move);
    }
    cvd.canvas.onmouseup = () => {
        push_task(cvd, Task.stop_slider);
    }
    // ensure loss of control
    cvd.canvas.onmouseleave = () => {
        push_task(cvd, Task.stop_slider);
    }
    cvd.canvas.onmousemove = (e) => {
        cvd.mouse_pos = [e.offsetX, e.offsetY];
        push_task(cvd, Task.instant_slide);
    }
}
export function terminate_slider_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousedown = null;
    cvd.canvas.onmouseup = null;
    cvd.canvas.onmouseleave = null;
    cvd.canvas.onmousemove = null;
}

// tasks //
export function start_slider_move(cvd: CompareViewData, timestamp: number): boolean {
    push_task(cvd, Task.update_slider);
    cvd.start_timestamp = timestamp;
    cvd.target_timestamp = timestamp + cvd.slider_time;

    cvd.start_pos = cvd.slider_pos;
    if (cvd.current_mode == Mode.horizontal)
        cvd.target_pos = cvd.mouse_pos[0] / cvd.width;
    else
        cvd.target_pos = cvd.mouse_pos[1] / cvd.height;

    return true;
}

export function instant_slide(cvd: CompareViewData): boolean {
    // only when mouse button is pressed
    if (contains_task(cvd, Task.update_slider)) {
        if (cvd.current_mode == Mode.horizontal)
            cvd.target_pos = cvd.mouse_pos[0] / cvd.width;
        else
            cvd.target_pos = cvd.mouse_pos[1] / cvd.height;
        cvd.start_pos = cvd.target_pos;
    }
    return true;
}

export function update_slider(cvd: CompareViewData): boolean {
    // TODO: don't always instant move
    cvd.slider_pos = cvd.target_pos;
    return false;
}

export function stop_slider(cvd: CompareViewData): boolean {
    delete_task(cvd, Task.start_slider_move);
    delete_task(cvd, Task.instant_slide);
    delete_task(cvd, Task.update_slider);
    return true;
}

export function render_slider(cvd: CompareViewData, timestamp: number): void {
    cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

    cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);

    cvd.ctx.beginPath();
    if (cvd.current_mode == Mode.horizontal)
        cvd.ctx.rect(cvd.slider_pos * cvd.width, 0, cvd.width, cvd.height);
    else
        cvd.ctx.rect(0, cvd.slider_pos * cvd.height, cvd.width, cvd.height);
    cvd.ctx.closePath();

    // save to remove clip later on
    cvd.ctx.save();
    cvd.ctx.clip();
    // transparent -> white
    // cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);
    cvd.ctx.drawImage(cvd.images[1]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    cvd.ctx.restore();
}

