import { Config } from "../cfg";
import React from "react";

export interface CompareViewProps extends Config {
}

const CompareView: React.FC<CompareViewProps> = (props) => {
    let canvas = (<canvas></canvas>);
    return canvas;
}

export default CompareView;

