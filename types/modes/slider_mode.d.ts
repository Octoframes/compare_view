import { CompareViewData } from "../compare_view_data";
export declare function init_slider_mode(cvd: CompareViewData): void;
export declare function terminate_slider_mode(cvd: CompareViewData): void;
export declare function start_slider_move(cvd: CompareViewData, timestamp: number): boolean;
export declare function instant_slide(cvd: CompareViewData, timestamp: number): boolean;
export declare function update_slider(cvd: CompareViewData, timestamp: number): boolean;
export declare function render_slider(cvd: CompareViewData): void;
