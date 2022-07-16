import { Config } from "../cfg";
import React from "react";
interface ComponentConfig extends Config {
    create_controls?: boolean;
}
export interface CompareViewProps {
    image_urls: string[];
    config?: ComponentConfig;
}
export declare const CompareView: React.FC<CompareViewProps>;
export {};
