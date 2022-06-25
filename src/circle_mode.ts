import { Mode, CompareViewData } from "./compare_view_data";

// bind all required callbacks / event handlers
// TODO: could use some RAII
export function init_circle_mode(cvd: CompareViewData): void {
    render_circle_mode(cvd);
}

function render_circle_mode(cvd: CompareViewData): void {
    if (cvd.next_mode != Mode.circle) {
        terminate_circle_mode(cvd)
        return;
    }
    // because lambdas are easier to understand than binds
    window.requestAnimationFrame((timestamp) => { render_circle_mode(cvd); })
}

// unbind callbacks / event handlers
function terminate_circle_mode(cvd: CompareViewData): void {
    // TODO: looks an awful lot like a member function
    cvd.load_current_mode(cvd);
}

