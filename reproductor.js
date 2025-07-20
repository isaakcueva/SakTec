function playVideo() {
    var video = document.getElementById("video");
    var videoThumbnail = document.querySelector(".video-thumbnail");

    video.style.display = "block";
    videoThumbnail.style.display = "none";

    video.play();
}
