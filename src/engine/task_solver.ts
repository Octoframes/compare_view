import { Mode, CompareViewData, Task } from "../compare_view_data";
import { init_circle_mode, remove_circle, terminate_circle_mode, update_circle } from "../modes/circle_mode";
import { render } from "./render";

function change_mode(cvd: CompareViewData): boolean {
    // terminate old mode
    switch (cvd.current_mode) {
        case Mode.undefined:
            // nothing to clean up
            break;
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
    // replace current stack with new -> handled tasks don't get added again
    let new_task_stack: Task[] = [];
    while (cvd.task_stack.length) {
        let current_task = cvd.task_stack.pop() as Task;
        let handled: boolean;

        switch (current_task) {
            case Task.none:
                // nothing to do
                handled = true;
                break;
            case Task.change_mode:
                handled = change_mode(cvd);
                break;
            case Task.update_circle:
                handled = update_circle(cvd);
                break;
            case Task.remove_circle:
                handled = remove_circle(cvd);
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
function launch_update(cvd: CompareViewData): void {
    if (!cvd.next_update_queued) {
        cvd.next_update_queued = true;
        // TODO; set correct timestamp
        update(cvd, 0);
    }
}

export function delete_task(cvd: CompareViewData, task: Task): void {
    // there can only be one occurrence of each task type -> no loop required
    let idx = cvd.task_stack.indexOf(task);
    if (idx != -1)
        cvd.task_stack.splice(idx, 1);
}

export function push_task(cvd: CompareViewData, task: Task): void {
    // replace old task with new of same type
    delete_task(cvd, task);

    cvd.task_stack.push(task);
    // ensure that the pushed task is executed ASAP
    launch_update(cvd);
}
