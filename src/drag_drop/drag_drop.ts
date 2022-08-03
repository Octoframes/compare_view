// based on https://soshace.com/the-ultimate-guide-to-drag-and-drop-image-uploading-with-pure-javascript

// get image url from dragged object //
function load_from_disk(files: FileList, callback: (url: string) => void) {
    if (!files.length)
        throw "Failed to receive dragged file";
    if (files.length != 1)
        console.log("Warning: only using first image");

    let reader = new FileReader();
    reader.onload = (e) => {
        let url = e.target?.result as string;
        callback(url);
    }
    reader.readAsDataURL(files[0]!);
}
function load_from_img_element(data: DataTransfer): string {
    let html = data.getData("text/html");
    let match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
    // TODO: use quiet fail
    if (!match)
        throw "Failed to load url from dragged object.";
    let url = match[1]!;
    return url;
}

// finalize image urls //
function get_valid_urls(image_urls: string[]): string[] {
    return image_urls.filter(url => url != "");
}
function kill_all_children(parent: HTMLElement): void {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}
function set_drag_target_img(drag_target: HTMLDivElement, url: string): void {
    // update drag target
    kill_all_children(drag_target);
    let img = document.createElement("img");
    img.src = url;
    img.classList.add("image_preview")
    drag_target.appendChild(img);
}
function update_url(
    drag_target: HTMLDivElement,
    drag_target_id: number,
    image_urls: string[],
    url: string,
    on_new_imgs: (image_urls: string[]) => void,
): void {
    image_urls[drag_target_id] = url;
    on_new_imgs(get_valid_urls(image_urls));
    set_drag_target_img(drag_target, url);
}

// drag entry point //
function handle_drop(
    drag_target: HTMLDivElement,
    drag_target_id: number,
    e: DragEvent,
    image_urls: string[],
    on_new_imgs: (image_urls: string[]) => void,
): void {
    let data = e.dataTransfer!;
    let files = data.files!;

    // drag+drop from user file system
    if (files.length)
        load_from_disk(files, (url) => {
            update_url(drag_target, drag_target_id, image_urls, url, on_new_imgs);
        });

    // drag+drop from HTMLImageElement (or invalid drop (e.g. text))
    else {
        let url = load_from_img_element(data);
        update_url(drag_target, drag_target_id, image_urls, url, on_new_imgs);
    }
}

// load event handlers //
function prevent_default(e: Event) {
    e.preventDefault();
    e.stopPropagation();
}
export function make_draggable(drag_target: HTMLDivElement): void {
    drag_target.addEventListener("dragenter", prevent_default, false);
    drag_target.addEventListener("dragleave", prevent_default, false);
    drag_target.addEventListener("dragover", prevent_default, false);
    drag_target.addEventListener("drop", prevent_default, false);
}
function enable_style_change(drag_target: HTMLDivElement): void {
    // don't you fucking dare touch this
    // this garbage took me an hour to not glitch around like a berserk all the time
    drag_target.addEventListener("dragover", () => {
        drag_target.classList.add("dragover");
    });
    drag_target.addEventListener("dragleave", () => {
        drag_target.classList.remove("dragover");
    });
    drag_target.addEventListener("drop", () => {
        drag_target.classList.remove("dragover");
    });
}
// load drag targets where images can be dragged into
// when image got dropped, call on_new_imgs with updated image urls
export function load(
    drag_target_class: string,
    default_image_url: string,
    on_new_imgs: (image_urls: string[]) => void
): void {
    let drag_targets = document.getElementsByClassName(drag_target_class) as HTMLCollectionOf<HTMLDivElement>;
    let num_drag_targets = drag_targets.length;
    let image_urls: string[] = [];

    for (let i = 0; i < num_drag_targets; ++i) {
        let drag_target = drag_targets[i]!;
        // all except for first two images are hidden
        image_urls.push(i < 2 ? default_image_url : "");

        make_draggable(drag_target);
        drag_target.addEventListener("drop", (e) => {
            handle_drop(drag_target, i, e, image_urls, on_new_imgs);
        });

        enable_style_change(drag_target);
    }
}

