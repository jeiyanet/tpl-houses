function loadVideo(videoUrl, redirectURL) {
    const has_watched = getCookie('house_intro');
    if (has_watched) {
        window.location.href = redirectURL;
        return;
    }

    const container = document.createElement("div");
    Object.assign(container.style,  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    });

    const video = document.createElement("video");
    video.src = videoUrl;
    video.autoplay = true;
    video.muted = true;

    Object.assign(video.style, {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    });

    video.addEventListener('canplaythrough', function() {
        console.log("Loaded");
    }, { once: true });

    video.addEventListener("ended", function () {
        document.cookie = "house_intro=true; path=/; max-age=86400"; // 1 day
        window.location.href = redirectURL;
    });

    video.onerror = function(e) {
        console.log("Error loading video");
        console.error(e);
    };

    container.appendChild(video);
    document.body.appendChild(container);

}

function getCookie(name) {
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

loadVideo("/tpl-houses/house_intro.mp4", "/tpl-houses/input")
