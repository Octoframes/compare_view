import { CompareViewData, ControlData, Mode } from "./compare_view_data";
export declare function reload_checkboxes(cvd: CompareViewData): void;
export declare function get_mode_change_callback(cvd: CompareViewData, mode: Mode): (e: Event) => void;
export declare function attach_control_data(cvd: CompareViewData, ctrl_data: ControlData): void;
