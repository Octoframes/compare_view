import { CompareViewData, Task } from "../compare_view_data";
import { delete_task, push_task } from "../engine/task_solver";

// bind all required callbacks / event handlers
export function init_circle_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousemove = (e) => {
        // update circle position
        cvd.circle_pos = [e.offsetX, e.offsetY];
        // ensure rendering always starts
        push_task(cvd, Task.update_circle);
    };
    cvd.canvas.onmouseleave = () => {
        push_task(cvd, Task.remove_circle);
    };
    cvd.canvas.onclick = () => {
        push_task(cvd, Task.rotate_imgs);
    }

    if (cvd.canvas.matches(":hover"))
        push_task(cvd, Task.update_circle);
}

// unbind callbacks / event handlers
export function terminate_circle_mode(cvd: CompareViewData): void {
    cvd.canvas.onmouseenter = null;
    cvd.canvas.onmousemove = null;
    cvd.canvas.onmouseleave = null;
    cvd.canvas.onclick = null;

    document.documentElement.style.cursor = "default";

    push_task(cvd, Task.remove_circle);
}

export function update_circle(cvd: CompareViewData): boolean {
    cvd.render_circle = true;
    document.documentElement.style.cursor = "none";

    return false;
}

export function remove_circle(cvd: CompareViewData): boolean {
    delete_task(cvd, Task.update_circle);
    cvd.render_circle = false;
    document.documentElement.style.cursor = "default";

    return true;
}


export function render_circle(cvd: CompareViewData, timestamp: number): void {
    if (cvd.render_circle) {
        cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

        // TODO: cvd.images[0]?.element as HTMLImageElement what the hell?
        cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);

        cvd.ctx.beginPath();
        cvd.ctx.arc(cvd.circle_pos[0], cvd.circle_pos[1], cvd.circle_size, 0, Math.PI * 2);
        cvd.ctx.closePath();
        cvd.ctx.save();
        cvd.ctx.clip();

        cvd.ctx.drawImage(cvd.images[1]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
        cvd.ctx.restore();
    }
    else {
        cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    }
}

