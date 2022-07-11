import { Mode, CompareViewData } from "../compare_view_data";
import { reload_checkboxes } from "../controls";
import { init_circle_mode, terminate_circle_mode } from "./circle_mode";
import { init_slider_mode, terminate_slider_mode } from "./slider_mode";

function terminate_old_mode(cvd: CompareViewData): void {
    switch (cvd.current_mode) {
        case Mode.undefined:
            // nothing to clean up
            break;
        case Mode.circle:
            terminate_circle_mode(cvd);
            break;
        case Mode.horizontal:
            terminate_slider_mode(cvd);
            break;
        case Mode.vertical:
            terminate_slider_mode(cvd);
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
}

function init_new_mode(cvd: CompareViewData): void {
    cvd.current_mode = cvd.next_mode;
    switch (cvd.next_mode) {
        case Mode.circle:
            init_circle_mode(cvd);
            break;
        case Mode.horizontal:
            init_slider_mode(cvd);
            break;
        case Mode.vertical:
            init_slider_mode(cvd);
            break;
        default:
            throw `unsupported mode: ${cvd.current_mode}`;
    }
    reload_checkboxes(cvd);
}

export function change_mode(cvd: CompareViewData): boolean {
    terminate_old_mode(cvd);
    init_new_mode(cvd);
    return true;
}
