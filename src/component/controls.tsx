import React from "react";
import { CompareViewData } from "../compare_view_data";

interface ControlsProps {
    cvd: CompareViewData;
}

const Controls: React.FC<ControlsProps> = (props) => {
    return (
        <div>
            <input type="checkbox" />
        </div>
    );
}

export default Controls;

