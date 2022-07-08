import { CompareViewData, ControlData, Mode, Task } from "./compare_view_data";
import { push_task, rotate_imgs } from "./engine/task_solver";

function create_checkbox(id: string, label: string, parent: HTMLElement): HTMLInputElement {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = id;
    let checkbox_label = document.createElement("label");
    checkbox_label.innerHTML = label;
    checkbox_label.htmlFor = checkbox.id;
    let spacer = document.createElement("br");

    parent.appendChild(checkbox)
    parent.appendChild(checkbox_label)
    parent.appendChild(spacer)
    return checkbox;
}

function create_button(label: string, parent: HTMLElement): HTMLButtonElement {
    let button = document.createElement("button");
    button.innerHTML = "Rotate Images";
    let spacer = document.createElement("br");

    parent.appendChild(button)
    parent.appendChild(spacer)
    return button;
}

export function create_controls(controls_id: string, key: string): ControlData {
    let controls = document.getElementById(controls_id) as HTMLElement;
    return {
        controls_parent: controls,
        circle_button: create_checkbox(`${key}circle_button`, "Circle", controls),
        horizontal_button: create_checkbox(`${key}horizontal_button`, "Horizontal", controls),
        vertical_button: create_checkbox(`${key}vertical_button`, "Vertical", controls),
        rotate_imgs_button: create_button("Rotate Images", controls),
    }
}

function disable_checkboxes(ctrl_data: ControlData): void {
    ctrl_data.circle_button.checked = false;
    ctrl_data.horizontal_button.checked = false;
    ctrl_data.vertical_button.checked = false;
}

export function reload_checkboxes(cvd: CompareViewData): void {
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

export function attach_control_events(cvd: CompareViewData): void {
    attach_mode_change_button(cvd, cvd.ctrl_data.circle_button, Mode.circle);
    attach_mode_change_button(cvd, cvd.ctrl_data.horizontal_button, Mode.horizontal);
    attach_mode_change_button(cvd, cvd.ctrl_data.vertical_button, Mode.vertical);
    cvd.ctrl_data.rotate_imgs_button.onclick = () => {
        push_task(cvd, Task.rotate_imgs);
    };
}

