// based on https://soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript

function load_from_disk(files, callback) {
    if (files.length != 1)
        console.log("Warning: only using first image");

    let reader = new FileReader();
    reader.onload = (e) => {
        let url = e.target.result;
        callback(url);
    }
    reader.readAsDataURL(files[0]);
}

function load_from_img_element(data) {
    let html = data.getData("text/html");
    let match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
    // TODO: use quiet fail
    if (!match)
        throw "Failed to load url from dragged object.";
    let url = match[1];
    return url;
}

function get_valid_urls(image_urls) {
    return image_urls.filter(url => url);
}

function kill_all_children(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function load_new_url(target, url, image_urls, on_new_imgs, image_id) {
    image_urls[image_id] = url;
    console.log(`new image at index ${image_id}: ${url}`);
    on_new_imgs(get_valid_urls(image_urls));

    // update image
    kill_all_children(target);
    let img = document.createElement("img");
    img.src = url;
    img.classList.add("image_preview")
    target.appendChild(img);
}

function handle_drop(image_urls, e, on_new_imgs, image_id) {
    let data = e.dataTransfer;
    let files = data.files;
    // drag+drop from user file system
    if (files.length)
        load_from_disk(files, (url) => {
            load_new_url(e.target, url, image_urls, on_new_imgs, image_id);
        });
    // drag+drop from HTMLImageElement (or invalid drop (e.g. text))
    else {
        let url = load_from_img_element(data);
        load_new_url(e.target, url, image_urls, on_new_imgs, image_id);
    }
}

function prevent_default(e) {
    e.preventDefault();
    e.stopPropagation();
}

function enable_style_change(image) {
    // don't you fucking dare touch this
    // this garbage took me an hour to not glitch around like a berserk all the time
    image.addEventListener("dragover", () => {
        image.classList.add("dragover");
    });
    image.addEventListener("dragleave", () => {
        image.classList.remove("dragover");
    });
    image.addEventListener("drop", () => {
        image.classList.remove("dragover");
    });
}

function load_img_drop(image_urls, on_new_imgs) {
    let images = document.getElementsByClassName("img");
    for (let i = 0; i < images.length; ++i) {
        images[i].addEventListener("dragenter", prevent_default, false);
        images[i].addEventListener("dragleave", prevent_default, false);
        images[i].addEventListener("dragover", prevent_default, false);
        images[i].addEventListener("drop", prevent_default, false);

        images[i].addEventListener("drop", (e) => {
            handle_drop(image_urls, e, on_new_imgs, i);
        });

        enable_style_change(images[i]);
    }
}

