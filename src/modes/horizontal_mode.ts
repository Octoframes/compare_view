import { CompareViewData, Task } from "../compare_view_data";
import { delete_task, push_task } from "../engine/task_solver";


export function init_horizontal_mode(cvd: CompareViewData): void {
    cvd.canvas.onclick = (e) => {
        cvd.horizontal_pos = e.offsetX;
        push_task(cvd, Task.update_horizontal);
    }
}

export function terminate_horizontal_mode(cvd: CompareViewData): void {

}

export function update_horizontal(cvd: CompareViewData): boolean {
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

