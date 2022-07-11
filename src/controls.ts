import { CompareViewData, ControlData, Mode, Task } from "./compare_view_data";
import { push_task } from "./task_solver";

function disable_checkboxes(ctrl_data: ControlData): void {
    ctrl_data.circle_button.checked = false;
    ctrl_data.horizontal_button.checked = false;
    ctrl_data.vertical_button.checked = false;
}

function attach_mode_change_button(cvd: CompareViewData, button: HTMLInputElement, mode: Mode) {
    button.onchange = () => {
        // suppress unchecking
        if (!button.checked) {
            reload_checkboxes(cvd);
            return;
        }
        cvd.next_mode = mode;
        // checkboxes get checked in change_mode function
        push_task(cvd, Task.change_mode);
    }
}

// ensure checkboxes show correct mode
export function reload_checkboxes(cvd: CompareViewData): void {
    // there are no controls?
    if (cvd.ctrl_data == undefined)
        return;
    disable_checkboxes(cvd.ctrl_data);
    switch (cvd.current_mode) {
        case Mode.circle:
            cvd.ctrl_data.circle_button.checked = true;
            break;
        case Mode.horizontal:
            cvd.ctrl_data.horizontal_button.checked = true;
            break;
        case Mode.vertical:
            cvd.ctrl_data.vertical_button.checked = true;
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
}

export function attach_control_events(cvd: CompareViewData): void {
    // there are no controls?
    if (cvd.ctrl_data == undefined)
        return;
    attach_mode_change_button(cvd, cvd.ctrl_data.circle_button, Mode.circle);
    attach_mode_change_button(cvd, cvd.ctrl_data.horizontal_button, Mode.horizontal);
    attach_mode_change_button(cvd, cvd.ctrl_data.vertical_button, Mode.vertical);
    cvd.ctrl_data.revolve_imgs_button.onclick = () => {
        push_task(cvd, Task.revolve_imgs);
    };
}

