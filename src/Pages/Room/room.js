let displayFrame = document.getElementById("stream__box");
let videoFrames = document.getElementsByClassName("video__container");
let userIdInDisplayFrame = null;

export const expandVideoFrame = (e) => {
    let child = document.getElementById("stream__box").children[0];
    if (child) {
        document.getElementById("streams__container").appendChild(child);
    }

    document.getElementById("stream__box").style.display = "block";
    document.getElementById("stream__box").appendChild(e.currentTarget);
    userIdInDisplayFrame = e.currentTarget.id;

    for (let i = 0; videoFrames.length > i; i++) {
        if (videoFrames[i].id != userIdInDisplayFrame) {
            videoFrames[i].style.height = "100px";
            videoFrames[i].style.width = "100px";
        }
    }
};
for (let i = 0; videoFrames.length > i; i++) {
    videoFrames[i].addEventListener("click", expandVideoFrame);
}
// hide disp
export const hideDisplayFrame = () => {
    userIdInDisplayFrame = null;
    displayFrame.style.display = null;

    let child = displayFrame.children[0];
    document.getElementById("streams__container").appendChild(child);

    for (let i = 0; videoFrames.length > i; i++) {
        videoFrames[i].style.height = "300px";
        videoFrames[i].style.width = "300px";
    }
};