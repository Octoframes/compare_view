import { ControlData } from "../compare_view_data";

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

// from: https://medium.com/@weberzt/how-to-create-a-random-id-in-javascript-e92b39fedaef
function create_key(): string {
    let key = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 0; i < 12; i++) {
        key += characters.charAt(Math.floor(Math.random() * 36));
    }
    return key;
}

export function create_controls(controls_id: string, key?: string): ControlData {
    key = key ? key : create_key();
    let controls = document.getElementById(controls_id) as HTMLElement;
    return {
        controls_parent: controls,
        circle_button: create_checkbox(`${key}circle_button`, "Circle", controls),
        horizontal_button: create_checkbox(`${key}horizontal_button`, "Horizontal", controls),
        vertical_button: create_checkbox(`${key}vertical_button`, "Vertical", controls),
        revolve_imgs_button: create_button("Revolve Images", controls),
    }
}

