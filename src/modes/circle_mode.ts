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
    if (cvd.rotate_imgs_on_click)
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

function render_background_img(cvd: CompareViewData): void {
    // don't render on circle ->
    // don't let second image overlap first with transparency
    // simple clearRect (as used in slide mode) can't be used <- weird white 1px ring around circle
    cvd.ctx.beginPath();
    cvd.ctx.arc(cvd.mouse_pos[0], cvd.mouse_pos[1], cvd.circle_size - 1, 0, Math.PI * 2);
    cvd.ctx.lineTo(cvd.width, 0);
    cvd.ctx.lineTo(0, 0);
    cvd.ctx.lineTo(0, cvd.height);
    cvd.ctx.lineTo(cvd.width, cvd.height);
    cvd.ctx.lineTo(cvd.width, 0);
    cvd.ctx.closePath();

    cvd.ctx.save();
    cvd.ctx.clip();
    // TODO: cvd.images[0]?.element as HTMLImageElement what the hell?
    cvd.ctx.drawImage(cvd.images[0]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    cvd.ctx.restore();
}

// the cake is a lie
function render_piece_of_cake(cvd: CompareViewData, start_angle: number, end_angle: number): void {
    cvd.ctx.beginPath();
    cvd.ctx.arc(cvd.mouse_pos[0], cvd.mouse_pos[1], cvd.circle_size, start_angle, end_angle);
    cvd.ctx.lineTo(cvd.mouse_pos[0], cvd.mouse_pos[1]);
    cvd.ctx.closePath();
}

function render_clipped_img(cvd: CompareViewData, image_idx: number, start_angle: number, end_angle: number): void {
    render_piece_of_cake(cvd, start_angle, end_angle);

    // save to remove clip later on
    cvd.ctx.save();
    cvd.ctx.clip();
    cvd.ctx.drawImage(cvd.images[image_idx]?.element as HTMLImageElement, 0, 0, cvd.width, cvd.height);
    cvd.ctx.restore();

    if (cvd.show_circle) {
        render_piece_of_cake(cvd, start_angle, end_angle);
        cvd.ctx.strokeStyle = "black";
        cvd.ctx.lineWidth = 3;
        cvd.ctx.stroke();
    }
}

export function render_circle(cvd: CompareViewData): void {
    if (cvd.render_circle) {
        cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

        render_background_img(cvd);

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

