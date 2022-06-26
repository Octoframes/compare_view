import { CompareViewData, Task } from "../compare_view_data";
import { delete_task, push_task } from "../engine/task_solver";

// bind all required callbacks / event handlers
export function init_circle_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousemove = (e) => {
        // update circle position
        cvd.circle_pos = [e.offsetX, e.offsetY];
        push_task(cvd, Task.update_circle);
    };
    cvd.canvas.onmouseleave = () => {
        push_task(cvd, Task.remove_circle);
    };

    // // is currently focused?
    // if (document.activeElement === cvd.canvas)
    //     push_task(cvd, Task.update_circle);
    // else
    //     push_task(cvd, Task.remove_circle);
}

// unbind callbacks / event handlers
export function terminate_circle_mode(cvd: CompareViewData): void {
    cvd.canvas.onmousemove = null;
    cvd.canvas.onmouseleave = null;

    push_task(cvd, Task.remove_circle);
}

export function update_circle(cvd: CompareViewData): boolean {
    cvd.render_circle = true;

    return true;
}

export function remove_circle(cvd: CompareViewData): boolean {
    delete_task(cvd, Task.update_circle);

    return true;
}

