<script src="./browser_compare_view.js"></script>
<style>
    canvas {
        width: 100%;
    }
</style>

<canvas id="heading"></canvas>
<script>
    compare_view.load(
        [
            "./images/banner_grey.png",
            "./images/banner_colour.png",
        ],
        "heading"
    );
</script>

You can use compare_view on your website to compare two or more images.
If you haven't noticed yet, the image above is actually a compare_view instance.
You can play around with it [here](https://jsfiddle.net/f4n3dy68/1)—this is the source code:
```html
<script src="https://cdn.jsdelivr.net/npm/compare_view/public/browser_compare_view.js"></script>
<canvas id="canvas_id" style="width: 100%"></canvas>
<script>
    compare_view.load(
        [
            "https://raw.githubusercontent.com/Octoframes/compare_view/main/public/images/banner_grey.png",
            "https://raw.githubusercontent.com/Octoframes/compare_view/main/public/images/banner_colour.png",
        ],
        "canvas_id"
    );
</script>
```

