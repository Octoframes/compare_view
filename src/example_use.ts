import { load_compare_view } from "./compare_view";
import { Mode } from "./compare_view_data";

load_compare_view("canvas", Mode.circle, [
    "./example_images/0.png",
    "./example_images/1.png",
    "./example_images/2.png",
    "./example_images/3.png",
    // "./example_images/4.png",
]);

