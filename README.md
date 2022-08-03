<script src="./dist/browser_compare_view.js"></script>
<style>
    canvas {
        width: 100%;
    }
    .cv_container {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .cv_controls {
        width: 200px;
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
If you haven't noticed yet, the image above is actually a compare_view instance—click it and you'll see what that means.
You can play around with it [here](https://jsfiddle.net/z8ycvtop) to add your own images—this is the source code:
```html
<script src="https://cdn.jsdelivr.net/npm/compare_view@1.3.0/public/dist/browser_compare_view.js"></script>

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
            "./images/cat_green.png",
        ],
        "more_than_two"
    );
</script>
Actually you can load as many images as you like, or your eyes can handle—try out a couple dozen images and you'll see what I mean.

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
            "start_slider_pos": 0.18,
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
            "start_mode": "vertical",
            "start_slider_pos": 0.65,
        }
    );
</script>

You can also add some some controls to the mix:
<div class="cv_container">
    <div><canvas id="controls_canvas"></canvas></div>
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
2.  Simply **download** the file from [here](https://github.com/Octoframes/compare_view/releases/latest) and put it in your static folder (if you don't know what that means, just put it next to your `index.html`).
    Now you can import it using the relative path to the `browser_compare_view.js` from your `index.html`.
3.  **Cloning** [the compare_view repo](https://github.com/Octoframes/compare_view) (or adding it as a submodule) and checking out the `dist` branch, which contains a precompiled version of compare_view.
    You can directly import the file from there.
4.  Instead of checking out the `dist` branch you could also stick to `main` and [compile it yourself](#compile-it-yourself).
5.  If you're already using some **NPM** packages, feel free to download compare_view with `npm i compare_view`.
    Then you can find the file in `node_modules/compare_view/public/dist/browser_compare_view.js`.

# Simple Setup
Now that you have imported compare_view, it's time to actually use it.
First you have to create an HTML canvas, which compare_view will draw on:
```html
<canvas id="my_canvas_id" style="width: 100%"></canvas>
```
The width style is used to scale the canvas as far as there is room for it, but it's optional so feel free to omit it.
`my_canvas_id` must be a unique ID *id*entifying this canvas—so use a different ID for each and every compare_view instance.
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
Here you have to define the image URLs and, as you can see, you have to provide the ID again so that the right canvas gets used.

# Settings
If you for example want to change the starting mode or add the controls, you need to tweak compare_view via its settings.
The `compare_view.load` function takes an optional `config` parameter.
These are the default settings, the more complicated ones of which will be described in detail later on:
```html
<script>
    compare_view.load(
        [
            "image_1.png",
            "image_2.png",
            "image_3.png",
        ],
        "my_canvas_id",
        {
            // leave undefined to not create controls
            controls_id?: string;
            // random string used to create unique ids
            key?: string;

            // either "circle", "horizonal" or "vertical"
            start_mode: "circle",
            // size of circle outline as fraction of image width or height (whatever is bigger)
            circumference_fraction: 0.005,
            // overwrite circle size
            circle_size: undefined,
            circle_fraction: 0.2,
            // draw line around circle
            show_circle: true,
            revolve_imgs_on_click: true,
            slider_fraction: 0.01,
            // time slider takes to reach clicked location
            slider_time: 400,
            // apply when moving slider
            // see: https://easings.net
            rate_function: ease_in_out_cubic,
            // 0.0 -> left; 1.0 -> right
            start_slider_pos: 0.5,
            // draw line at slider
            show_slider: true,
        }
    );
</script>
```
You can change as many or as few of these as you like.
So you can customize everything, leave the entire object empty (always using the defaults) or something in between:
```js
{
    start_mode: "horizontal",
}
```

If you want a feature of compare_view to be optional or customizable, feel free to [open an Issue on GitHub](https://github.com/Octoframes/compare_view/issues) or write a mail to [mail@chris-besch.com](mailto:mail@chris-besch.com).

### Adding Controls
The `controls_id` setting takes the ID of an HTML element.
In this element the controls get created in.
So for example you could put them into an empty `<div>` element like this:
```html
<canvas id="my_canvas_id"></canvas>
<div id="my_controls_id"></div>
<script>
    compare_view.load(
        [
            "image_1.png",
            "image_2.png",
            "image_3.png",
        ],
        "my_canvas_id",
        {
            "controls_id": "my_controls_id"
        }
    );
</script>
```
The id used for the canvas mustn't be the same as the one used for the controls.

Each control element compare_view creates also needs a unique ID.
These are automatically created using a random key by default and yours if you define it with the `key` setting.

### Circle Size
The circle size is defined as a fraction of the image width or height (whichever is bigger—called max_size in this document).
So setting `circle_fraction` to `0.5` means the radius of the circle equals half of max_size.

If fractions aren't your cup of tea, you can overwrite this behaviour by setting the `circle_size` setting.
It defines the radius in pixel.

### Showing the Slider and Circle Outline
If `show_slider` is set to `false`, the black line indicating the slider won't be rendered.
This also applies to `show_circle`.

## Callback and Update Images
The `compare_view.load` function accepts a callback that receives a `CompareViewData` object.
This object is used internally to store the entire stare of this compare_view instance.
It is needed to control the instance from JavaScript.
At the moment there's only the `load_new_imgs` function.
Its first parameter is the `CompareViewData` object and the second one is a new array of image URLs that shall be loaded.

Here's an example:
```html
<canvas id="dynamic_img_canvas"></canvas>
<button id="change_img_button">Wanna see a green cat?</button>
<script>
    compare_view.load(
        [
            "./images/cat_grey.png",
            "./images/cat.png",
        ],
        "dynamic_img_canvas",
        {},
        (cvd) => {
            // load new images when button is pressed
            let button =  document.getElementById("change_img_button");
            button.addEventListener("click", () => {
                compare_view.load_new_imgs(cvd, 
                [
                    "./images/cat_green.png",
                    "./images/cat.png",
                ]);
            });
        });
</script>
```

<div class="cv_container">
    <div><canvas id="dynamic_img_canvas"></canvas></div>
    <div class="cv_controls"><button id="change_img_button">Wanna see a green cat?</button></div>
</div>
<script>
    compare_view.load(
        [
            "./images/cat_grey.png",
            "./images/cat.png",
        ],
        "dynamic_img_canvas",
        {},
        (cvd) => {
            // load new images when button is pressed
            let button =  document.getElementById("change_img_button");
            button.addEventListener("click", () => {
                compare_view.load_new_imgs(cvd, 
                [
                    "./images/cat_green.png",
                    "./images/cat.png",
                ]);
            });
        });
</script>

This feature is used to enable something like this: [drag and drop images into compare_view](https://octoframes.github.io/compare_view/dynamic_imgs)

# Compile It Yourself
Once you've cloned [the compare_view repo](https://github.com/Octoframes/compare_view) you have to install all required dependencies:
```
yarn install
```
After that you can compile compare_view.
```
# compile debug build
yarn run build_debug

# compile deployment build
yarn run build_deploy

# start development server
yarn run develop
```

# React Component

You're using React but still want to use compare_view?
Then try out the official compare_view react component, see [this example repo](https://github.com/Octoframes/compare_view_react_example) for more info.
You basically only have to `yarn add compare_view` and do this:
```javascript
import React from "react";
import CompareView from "compare_view";

const ReactApp: React.FC = () => 
    <CompareView image_urls={["./cat.png", "./cat_grey.png"]} />;

export default ReactApp;
```
See [the source file](https://github.com/Octoframes/compare_view_react_example/blob/main/src/app.tsx).

# Development
compare_view is still under development.
If you encounter a bug or have an idea for a new feature, please do [open an Issue on GitHub](https://github.com/Octoframes/compare_view/issues) or write a mail to [mail@chris-besch.com](mailto:mail@chris-besch.com).

Thanks for using our software.
Have a nice day.

# Jupyter compare_view
PS: If you're interested in using compare_view with Jupyter Lab, check out [Jupyter compare_view](https://github.com/Octoframes/jupyter_compare_view), another one of our projects.

