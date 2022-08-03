import { Config } from "../cfg";
import React from "react";
import { CompareViewData } from "../compare_view_data";
import { load_new_imgs } from "../images";
interface ComponentConfig extends Config {
    create_controls?: boolean;
}
interface CompareViewProps {
    image_urls: string[];
    config?: ComponentConfig;
    callback?: (cvd: CompareViewData) => void;
}
declare const CompareView: React.FC<CompareViewProps>;
export default CompareView;
export { load_new_imgs, CompareViewData };
