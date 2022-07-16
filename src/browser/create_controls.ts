import { ControlData } from "../compare_view_data";
import { create_key } from "../helper";

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
    button.innerHTML = label;
    let spacer = document.createElement("br");

    parent.appendChild(button)
    parent.appendChild(spacer)
    return button;
}

export function create_controls(controls_id: string, key: string = create_key()): ControlData {
    let controls = document.getElementById(controls_id) as HTMLElement;
    if (controls == null)
        throw `controls_id '${controls_id}' isn't valid`;
    return {
        circle_check: create_checkbox(`${key}_circle_button`, "Circle", controls),
        horizontal_check: create_checkbox(`${key}_horizontal_button`, "Horizontal", controls),
        vertical_check: create_checkbox(`${key}_vertical_button`, "Vertical", controls),
        revolve_imgs_button: create_button("Revolve Images", controls),
    }
}

