import { Config } from "../cfg";
import React, { useEffect } from "react";
import { load_cvd } from "../load_cvd";
import { attach_control_data } from "../controls";
import { ControlData } from "../compare_view_data";

interface ComponentConfig extends Config {
    create_controls?: boolean;
};

export interface CompareViewProps {
    image_urls: string[];
    config?: ComponentConfig;
}

const CompareView: React.FC<CompareViewProps> = (props) => {
    // used to access ctx after render
    let canvas_ref = React.createRef<HTMLCanvasElement>();
    let circle_ref = React.createRef<HTMLInputElement>();
    let horizontal_ref = React.createRef<HTMLInputElement>();
    let vertical_ref = React.createRef<HTMLInputElement>();
    let revolve_ref = React.createRef<HTMLButtonElement>();

    // when rendered
    useEffect(() => {
        let ctx = canvas_ref.current?.getContext("2d") as CanvasRenderingContext2D;
        load_cvd(props.image_urls, ctx, props.config, (cvd) => {
            // should create controls
            if (props.config != undefined && props.config?.create_controls) {
                let ctrl_data: ControlData = {
                    circle_check: circle_ref.current!,
                    horizontal_check: horizontal_ref.current!,
                    vertical_check: vertical_ref.current!,
                    revolve_imgs_button: revolve_ref.current!,
                };
                attach_control_data(cvd, ctrl_data);
            }
        });
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div>
                <canvas style={{ width: "100%" }} ref={canvas_ref} tabIndex={1}></canvas>
            </div>
            {props.config != undefined && props.config.create_controls ? <div style={{ width: "200px" }}>
                <label>
                    <input ref={circle_ref} type="checkbox" />
                    Circle
                </label>
                <br />
                <label>
                    <input ref={horizontal_ref} type="checkbox" />
                    Horizontal
                </label>
                <br />
                <label>
                    <input ref={vertical_ref} type="checkbox" />
                    Vertical
                </label>
                <br />
                <button ref={revolve_ref}>
                    Revolve Images
                </button>
            </div> : undefined}
        </div>
    );
}

export default CompareView;

