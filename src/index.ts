function load_imgs(ctx: CanvasRenderingContext2D, img0: HTMLImageElement, img1: HTMLImageElement): void {
    ctx.drawImage(img0, 0, 0);

    ctx.beginPath();
    ctx.arc(500, 400, 500, 0, Math.PI * 2);
    ctx.clip();

    ctx.drawImage(img1, 0, 0);
}

function load_view(img_urls: [string, string]): void {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let img0 = document.createElement("img");
    let img1 = document.createElement("img");

    let img0_loaded = false;
    let img1_loaded = false;

    img0.onload = () => {
        img0_loaded = true;
        if (img1_loaded)
            load_imgs(ctx, img0, img1);
    };
    img1.onload = () => {
        img1_loaded = true;
        if (img0_loaded)
            load_imgs(ctx, img0, img1);
    };

    img0.src = img_urls[0];
    img1.src = img_urls[1];

}

load_view([
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F90000%2Fvelka%2Fblue-sunset-wallpaper.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fc4.wallpaperflare.com%2Fwallpaper%2F611%2F595%2F814%2Fabstract-3d-neon-glow-wallpaper-99e0c8adb1aaed4bb6a7a83f805186fd.jpg&f=1&nofb=1"]);

