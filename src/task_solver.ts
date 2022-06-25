import { Mode, CompareViewData, Task } from "./compare_view_data";
import { init_circle_mode, terminate_circle_mode } from "./circle_compare";
import { render } from "./render";

function change_mode(cvd: CompareViewData): boolean {
    // terminate old mode
    switch (cvd.current_mode) {
        case Mode.circle:
            terminate_circle_mode(cvd);
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
    // init new mode
    switch (cvd.next_mode) {
        case Mode.circle:
            init_circle_mode(cvd);
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
    cvd.current_mode = cvd.next_mode;

    return true;
}

function update(cvd: CompareViewData, timestamp: number): void {
    let new_task_stack: Task[] = [];
    while (cvd.task_stack.length) {
        let current_task = cvd.task_stack.pop() as Task;
        let handled: boolean;
        switch (current_task) {
            case Task.change_mode:
                handled = change_mode(cvd);
                break;
            case Task.none:
                // nothing to do
                handled = true;
                break;
            default:
                throw `unknown task: ${current_task}`
        }
        if (!handled)
            new_task_stack.push(current_task);
    }
    cvd.task_stack = new_task_stack;

    render(cvd, timestamp);

    // only call again when there's something left to do
    if (cvd.task_stack.length) {
        window.requestAnimationFrame((timestamp) => { update(cvd, timestamp); })
        cvd.next_update_queued = true;
    }
    else {
        cvd.next_update_queued = false;
    }
}

// start working on tasks
export function launch_update(cvd: CompareViewData): void {
    if (!cvd.next_update_queued) {
        cvd.next_update_queued = true;
        // TODO; set correct timestamp
        update(cvd, 0);
    }
}

