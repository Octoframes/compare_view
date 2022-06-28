import { CompareViewData } from "../compare_view_data";

export function render(cvd: CompareViewData, timestamp: number): void {
    console.log("render");
    cvd.ctx.clearRect(0, 0, cvd.width, cvd.height);

    cvd.ctx.beginPath();
    cvd.ctx.arc(cvd.circle_pos[0], cvd.circle_pos[1], 10, 0, Math.PI * 2);
    cvd.ctx.closePath();
    cvd.ctx.fillStyle = "red";
    cvd.ctx.fill();

    // cvd.ctx.drawImage(cvd.images[0], 0, 0, cvd.width, cvd.height);

    // if (cvd.render_circle) {
    //     cvd.ctx.beginPath();
    //     cvd.ctx.arc(cvd.circle_pos[0], cvd.circle_pos[1], cvd.circle_size, 0, Math.PI * 2);
    //     cvd.ctx.closePath();
    // }
    // // TODO: understand why this is required
    // cvd.ctx.save();
    // cvd.ctx.clip();

    // cvd.ctx.drawImage(cvd.images[1], 0, 0, cvd.width, cvd.height);
    // cvd.ctx.restore();
}
