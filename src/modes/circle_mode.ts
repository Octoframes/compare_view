import { CompareViewData, Task } from "../compare_view_data";
import { delete_task, push_task } from "../task_solver";
import { set_mouse_pos } from "../helper";

// bind all required callbacks / event handlers
export function init_circle_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousemove = (e) => {
        set_mouse_pos(cvd, e);
        // ensure rendering always starts
        push_task(cvd, Task.update_circle);
    };
    cvd.canvas.onmouseleave = () => {
        push_task(cvd, Task.remove_circle);
    };
    cvd.canvas.onmousedown = () => {
        push_task(cvd, Task.rotate_imgs);
    }

    if (cvd.canvas.matches(":hover"))
        push_task(cvd, Task.update_circle);
}
export function terminate_circle_mode(cvd: CompareViewData): void {
    cvd.canvas.onmouseenter = null;
    cvd.canvas.onmousemove = null;
    cvd.canvas.onmouseleave = null;
    cvd.canvas.onmousedown = null;

    document.documentElement.style.cursor = "default";

    push_task(cvd, Task.remove_circle);
}

// tasks //
export function update_circle(cvd: CompareViewData): boolean {
    cvd.render_circle = true;
    document.documentElement.style.cursor = "none";

    return false;
}

export function remove_circle(cvd: CompareViewData): boolean {
    delete_task(cvd, Task.update_circle);
    document.documentElement.style.cursor = "default";

    return true;
}

function render_clipped_img(cvd: CompareViewData, image_idx: number, start_angle: number, end_angle: number): void {
    cvd.ctx.beginPath();
    cvd.ctx.arc(cvd.mouse_pos[0], cvd.mouse_pos[1], cvd.circle_size, start_angle, end_angle);
    cvd.ctx.lineTo(cvd.mouse_pos[0], cvd.mouse_pos[1]);
    cvd.ctx.closePath();

    // save to remove clip later on
    cvd.ctx.save();
    cvd.ctx.clip();
    // transparent -> white
    // cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);
    cvd.ctx.drawImage(cvd.images[image_idx]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    cvd.ctx.restore();
}

export function render_circle(cvd: CompareViewData): void {
    if (cvd.render_circle) {
        cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

        // TODO: cvd.images[0]?.element as HTMLImageElement what the hell?
        cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);

        for (let i = 1; i < cvd.images_len; ++i) {
            let start_angle = (i - 1) * Math.PI * 2 / (cvd.images_len - 1);
            let end_angle = i * Math.PI * 2 / (cvd.images_len - 1);
            render_clipped_img(cvd, i, start_angle, end_angle);
        }
    }
    else {
        cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);
        cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    }
    // next render has to be reactivated
    cvd.render_circle = false;
}

