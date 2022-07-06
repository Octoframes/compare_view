import { CompareViewData, Task } from "../compare_view_data";
import { delete_task, push_task } from "../engine/task_solver";


export function init_horizontal_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousedown = () => {
        push_task(cvd, Task.update_horizontal);
    }
    cvd.canvas.onmouseup = () => {
        push_task(cvd, Task.stop_horizontal);
    }
    // ensure loss of control
    cvd.canvas.onmouseleave = () => {
        push_task(cvd, Task.stop_horizontal);
    }
    cvd.canvas.onmousemove = (e) => {
        cvd.mouse_pos = [e.offsetX, e.offsetY];
    }
}
export function terminate_horizontal_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousedown = null;
    cvd.canvas.onmouseup = null;
    cvd.canvas.onmouseleave = null;
    cvd.canvas.onmousemove = null;
}

export function update_horizontal(cvd: CompareViewData): boolean {
    cvd.horizontal_pos = cvd.mouse_pos[0];
    return false;
}

export function stop_horizontal(cvd: CompareViewData): boolean {
    delete_task(cvd, Task.update_horizontal);
    return true;
}

export function render_horizontal(cvd: CompareViewData, timestamp: number): void {
    cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

    cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);

    cvd.ctx.beginPath();
    cvd.ctx.rect(cvd.horizontal_pos, 0, cvd.width, cvd.height);
    cvd.ctx.closePath();

    // save to remove clip later on
    cvd.ctx.save();
    cvd.ctx.clip();
    // transparent -> white
    // cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);
    cvd.ctx.drawImage(cvd.images[1]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    cvd.ctx.restore();
}

