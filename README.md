<script src="./dist/browser_compare_view.js"></script>
<style>
    canvas {
        width: 100%;
        height: min-content;
    }
    .cv_container {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .cv_controls {
        width: 120px;
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
If you haven't noticed yet, the image above is actually a compare_view instance—
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

# A few more Examples
compare_view has multiple different modes, with new ones under development.
If you have an idea for another way of comparing multiple images, please do [open an Issue on GitHub](https://github.com/Octoframes/compare_view/issues) or write a mail to [mail@chris-besch.com](mailto:mail@chris-besch.com).

The mode displayed above is the `circle` mode.
It also supports more than two images:
<canvas id="more_than_two"></canvas>
<script>
    compare_view.load(
        [
            "./images/cat.png",
            "./images/cat_grey.png",
            "./images/cat_blue.png",
        ],
        "more_than_two"
    );
</script>

This is the horizontal mode:
<canvas id="horizontal"></canvas>
<script>
    compare_view.load(
        [
            "./images/banner_grey.png",
            "./images/banner_colour.png",
        ],
        "horizontal",
        {
            "start_mode": "horizontal",
            "start_slider_pos": 0.2,
        }
    );
</script>

And this the vertical mode:
<canvas id="vertical"></canvas>
<script>
    compare_view.load(
        [
            "./images/banner_grey.png",
            "./images/banner_colour.png",
        ],
        "vertical",
        {
            "start_mode": "vertical"
        }
    );
</script>

You can also add some some controls to the mix:
<div class="cv_container">
    <canvas id="controls_canvas"></canvas>
    <div id="controls_controls" class="cv_controls"></div>
</div>
<script>
    compare_view.load(
        [
            "./images/grouping_1.png",
            "./images/grouping_2.png",
            "./images/grouping_10.png",
        ],
        "controls_canvas",
        {
            "controls_id": "controls_controls"
        }
    );
</script>

# Importing compare_view
To use compare_view, one has to import the `browser_compare_view.js` file first.
There are five different ways of doing so:
1.  Loading it from a **CDN** by importing `https://cdn.jsdelivr.net/npm/compare_view/public/dist/browser_compare_view.js` as done in the example above.
    This way is the easiest but doesn't come without privacy concerns, among other.
    If you want to use compare_view for a production deployment, consider using one of the options below.
2.  Simply **download** the file from [here](https://github.com/Octoframes/compare_view/releases/latest) and put it in your static folder (if you don't know what that means, just put it next to you `index.html`).
    Now you can import it using the relative path to the `browser_compare_view.js` from your `index.html`.
3.  **Cloning** this repo (or adding it as a submodule) and checking out the `dist` branch, which contains a precompiled version of compare_view.
    You can directly import the file from there.
4.  Instead of checking out the `dist` branch you could also stick to the `main` branch and [compile it yourself](#compile-it-yourself).
5.  If you're already using some **NPM** packages, feel free to download compare_view with `npm i compare_view`.
    Then you can find the file in `node_modules/compare_view/public/dist/browser_compare_view.js`.

# Simple Setup
Now that you have imported compare_view, it's time to actually use it.
First you have to create an HTML canvas, which compare_view will draw on:
```html
<canvas id="my_canvas_id" style="width: 100%"></canvas>
```
The width style is used to scale the canvas as far as there is room for it, but it's optional so feel free to omit it.
`my_canvas_id` must be a unique ID *id*entifying this canvas—
so use a different ID for each and every compare_view instance.
Then you have to configure this compare_view instance by calling the `compare_view.load` function in a `<script>` tag.
```html
<script>
    compare_view.load(
        [
            "image_1.png",
            "image_2.png",
            "image_3.png",
        ],
        "my_canvas_id"
    );
</script>
```
As you can see, you have to provide the ID again so that the right canvas gets used.

# Settings
If you for example want to change the 

# Compile It Yourself
