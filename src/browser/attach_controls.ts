import { CompareViewData, ControlData, Mode, Task } from "../compare_view_data";
import { get_mode_change_callback } from "../controls";
import { push_task } from "../task_solver";

export function attach_control_data(cvd: CompareViewData, ctrl_data: ControlData): void {
    cvd.ctrl_data = ctrl_data;
    ctrl_data.circle_check.onclick = get_mode_change_callback(cvd, Mode.circle);
    ctrl_data.horizontal_check.onclick = get_mode_change_callback(cvd, Mode.horizontal);
    ctrl_data.vertical_check.onclick = get_mode_change_callback(cvd, Mode.vertical);
    ctrl_data.revolve_imgs_button.onclick = () => {
        push_task(cvd, Task.revolve_imgs);
    };
}

