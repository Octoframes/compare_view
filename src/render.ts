import { CompareViewData } from "./compare_view_data";

export function render(cvd: CompareViewData, timestamp: number): void {
    console.log("render");
    cvd.ctx.drawImage(cvd.images[0], 0, 0);

    cvd.ctx.beginPath();
    cvd.ctx.arc(500, 400, 500, 0, Math.PI * 2);
    cvd.ctx.clip();

    cvd.ctx.drawImage(cvd.images[1], 0, 0);
}
