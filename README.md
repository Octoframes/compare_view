<script src="./dist/browser_compare_view.js"></script>
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
If you haven't noticed yet, the image above is actually a compare_view instance;
click it and you'll see what that means.
You can play around with it [here](https://jsfiddle.net/7t58914w)—this is the source code:
```html
<script src="https://cdn.jsdelivr.net/npm/compare_view/public/dist/browser_compare_view.js"></script>

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

# Importing compare_view

As you can see, one has to import the `browser_compare_view.js` file first.
There are five different ways of doing so:
1.  Loading it from a CDN by importing `https://cdn.jsdelivr.net/npm/compare_view/public/dist/browser_compare_view.js` as done in the example above.
    This way is the easiest but doesn't come without privacy concerns, among other.
    If you want to use compare_view for a production deployment, consider using one of the options below.
2.  Simply download the file from [here]() and put it in your static folder (if you don't know what that means, just put it next to you `index.html`).
3.  Cloning this repo (or adding it as a submodule) and checking out the `dist` branch, which contains a precompiled version of compare_view.
    You can directly import the file from there.
4.  Instead of checking out the `dist` branch you could also stick to the `main` branch and [compile it yourself](#compile_it_yourself).
5.  If you're already using some NPM packages, feel free to download compare_view with `npm i compare_view`.
    Then you can find the file in `node_modules/compare_view/public/dist/browser_compare_view.js`.

