import { CompareViewData, ControlData } from "./compare_view_data";

export function load_control_data(controls_id: string, key: string): ControlData {
    let circle_button = document.createElement("input");
    circle_button.type = "checkbox";
    circle_button.id = `${key}circle_button`;
    let circle_label = document.createElement("label");
    circle_label.innerHTML = "Circle";
    circle_label.htmlFor = circle_button.id;

    let horizontal_button = document.createElement("input");
    horizontal_button.type = "checkbox";
    horizontal_button.id = `${key}horizontal_button`;
    let horizontal_label = document.createElement("label");
    horizontal_label.innerHTML = "Horizontal";
    horizontal_label.htmlFor = horizontal_button.id;

    return {
        circle_button: circle_button,
        horizontal_button: horizontal_button,
    }
}

    // circle_button.onchange = (e) => {
    //     (e.target as HTMLInputElement).checked
    // }

