import { Mode, CompareViewData, Task } from "./compare_view_data";
import { revolve_imgs } from "./images";
import { change_mode } from "./modes/change_mode";
import { remove_circle, update_circle, render_circle } from "./modes/circle_mode";
import { instant_slide, render_slider, start_slider_move, update_slider } from "./modes/slider_mode";

function solve_tasks(cvd: CompareViewData, timestamp: number): void {
    // replace current stack with new -> handled tasks don't get added back
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
            case Task.revolve_imgs:
                handled = revolve_imgs(cvd);
                break;
            case Task.update_circle:
                handled = update_circle(cvd);
                break;
            case Task.remove_circle:
                handled = remove_circle(cvd);
                break;
            case Task.start_slider_move:
                handled = start_slider_move(cvd, timestamp);
                break;
            case Task.possible_instant_slide:
                handled = instant_slide(cvd, timestamp);
                break;
            case Task.update_slider:
                handled = update_slider(cvd, timestamp);
                break;
            default:
                throw `unknown task: ${current_task}`
        }
        if (!handled)
            new_task_stack.push(current_task);
    }
    cvd.task_stack = new_task_stack;
}

function render_dispatch(cvd: CompareViewData): void {
    switch (cvd.current_mode) {
        case Mode.circle:
            render_circle(cvd);
            break;
        case Mode.horizontal:
            render_slider(cvd);
            break;
        case Mode.vertical:
            render_slider(cvd);
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
}

function update(cvd: CompareViewData, timestamp: number): void {
    solve_tasks(cvd, timestamp);
    render_dispatch(cvd);

    // only call again when there's something left to do
    if (cvd.task_stack.length)
        launch_update(cvd);
    else
        cvd.next_update_queued = false;
}
function launch_update(cvd: CompareViewData): void {
    cvd.next_update_queued = true;
    window.requestAnimationFrame((timestamp) => { update(cvd, timestamp); })
}
// start working on tasks
function launch_update_if_necessary(cvd: CompareViewData): void {
    if (!cvd.next_update_queued)
        launch_update(cvd);
}

// TODO: use different data structure
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
    launch_update_if_necessary(cvd);
}
export function contains_task(cvd: CompareViewData, task: Task): boolean {
    return cvd.task_stack.indexOf(task) != -1;
}

