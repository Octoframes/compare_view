<script src="./browser_compare_view.js"></script>
<style>
    canvas {
        width: 100%;
    }

    @media (max-width: 800px) {
        canvas {
            width: 100%;
        }
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

# Heading

## Subheading

```js
console.log("some code");
```

