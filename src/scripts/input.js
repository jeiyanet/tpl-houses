document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = document.querySelector('input[placeholder="First Name"]');
    const lastNameInput = document.querySelector('input[placeholder="Last Name"]');
    const courseInput = document.querySelector('input[placeholder="Course/Year/Section"]');
    const submitBtn = document.getElementById("button");

    submitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const courseSection = courseInput.value.trim();

        if (firstName && lastName && courseSection) {
            const students = JSON.parse(localStorage.getItem("students")) || [];

            const student = { firstName, lastName, courseSection, house: null };
            students.push(student);
            localStorage.setItem("students", JSON.stringify(students));

            loadVideo("/tpl-houses/houses_roll.mp4", true, student, true);

            firstNameInput.value = "";
            lastNameInput.value = "";
            courseInput.value = "";
        } else {
            alert("Please fill out all fields!");
        }
    });
});

function loadVideo(videoUrl, shouldCallGetHouse = false, student = null, allowSkip = false, redirectAfter = false) {
    const container = document.createElement("div");
    Object.assign(container.style,  {
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        zIndex: 9999,
        background: "black"
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

    container.appendChild(video);
    document.body.appendChild(container);

    function handleSpacebar(e) {
        if (allowSkip && e.code === "Space") {
            e.preventDefault();
            video.pause();
            container.remove();
            document.removeEventListener("keydown", handleSpacebar);
            if (shouldCallGetHouse) {
                getHouse(student, true);
            }
        }
    }

    // ciCTF{view_source_gets_you_the_flag}

    if (allowSkip) {
        document.addEventListener("keydown", handleSpacebar);
    }

    video.addEventListener("ended", function () {
        container.remove();
        if (allowSkip) {
            document.removeEventListener("keydown", handleSpacebar);
        }
        if (shouldCallGetHouse) {
            getHouse(student, true);
        } else if (redirectAfter) {
            window.location.href = '/tpl-houses/list';
        }
    });
}

function getHouse(student, redirect = false) {
    const houses = ["cypertech", "datacrest", "ironclad", "nexispark"];
    const randomHouse = houses[Math.floor(Math.random() * houses.length)];

    if (student) {
        let students = JSON.parse(localStorage.getItem("students")) || [];
        const index = students.findIndex(s => 
            s.firstName === student.firstName && 
            s.lastName === student.lastName &&
            s.courseSection === student.courseSection
        );
        if (index !== -1) {
            students[index].house = randomHouse;
            localStorage.setItem("students", JSON.stringify(students));
        }
    }

    const houseVideos = {
        cypertech: "/tpl-houses/houses_reveal_cypertech.mp4",
        datacrest: "/tpl-houses/houses_reveal_datacrest.mp4",
        ironclad: "/tpl-houses/houses_reveal_ironclad.mp4",
        nexispark: "/tpl-houses/houses_reveal_nexispark.mp4"
    };

    loadVideo(houseVideos[randomHouse], false, null, false, redirect);
    return randomHouse;
}
