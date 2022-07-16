// only attach controls; don't create them
import { CompareViewData, ControlData, Mode, Task } from "./compare_view_data";
import { push_task } from "./task_solver";

function disable_checkboxes(ctrl_data: ControlData): void {
    ctrl_data.circle_check.checked = false;
    ctrl_data.horizontal_check.checked = false;
    ctrl_data.vertical_check.checked = false;
}

// ensure checkboxes show correct mode
export function reload_checkboxes(cvd: CompareViewData): void {
    // there are no controls?
    if (cvd.ctrl_data == undefined)
        return;
    disable_checkboxes(cvd.ctrl_data);
    switch (cvd.current_mode) {
        case Mode.circle:
            cvd.ctrl_data.circle_check.checked = true;
            break;
        case Mode.horizontal:
            cvd.ctrl_data.horizontal_check.checked = true;
            break;
        case Mode.vertical:
            cvd.ctrl_data.vertical_check.checked = true;
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
}

// to be called in onclick event
export function get_mode_change_callback(cvd: CompareViewData, mode: Mode): (e: Event) => void {
    return (e: Event) => {
        // suppress unchecking
        if (!(e.target as HTMLInputElement).checked) {
            reload_checkboxes(cvd);
            return;
        }
        cvd.next_mode = mode;
        // checkboxes get checked in change_mode function
        push_task(cvd, Task.change_mode);
    };
}

export function attach_control_data(cvd: CompareViewData, ctrl_data: ControlData): void {
    cvd.ctrl_data = ctrl_data;
    ctrl_data.circle_check.onclick = get_mode_change_callback(cvd, Mode.circle);
    ctrl_data.horizontal_check.onclick = get_mode_change_callback(cvd, Mode.horizontal);
    ctrl_data.vertical_check.onclick = get_mode_change_callback(cvd, Mode.vertical);
    ctrl_data.revolve_imgs_button.onclick = () => {
        push_task(cvd, Task.revolve_imgs);
    };
}

