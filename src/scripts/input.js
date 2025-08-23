document.addEventListener("DOMContentLoaded", () => {
    const firstNameInput = document.querySelector('input[placeholder="First Name"]');
    const lastNameInput = document.querySelector('input[placeholder="LastName"]');
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

            loadVideo("/tpl-houses/houses_roll.mp4", true, student);

            firstNameInput.value = "";
            lastNameInput.value = "";
            courseInput.value = "";
        } else {
            alert("Please fill out all fields!");
        }
    });
});


function loadVideo(videoUrl, shouldCallGetHouse = false, student = null) {
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

    video.addEventListener("ended", function () {
        container.remove();
        if (shouldCallGetHouse) {
            let house = getHouse(student);
        }
    });

    container.appendChild(video);
    document.body.appendChild(container);
}

function getHouse(student) {
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

    switch (randomHouse) {
        case "cypertech":
            loadVideo("/tpl-houses/houses_reveal_cypertech.mp4");
            break;
        case "datacrest":
            loadVideo("/tpl-houses/houses_reveal_datacrest.mp4");
            break;
        case "ironclad":
            loadVideo("/tpl-houses/houses_reveal_ironclad.mp4");
            break;
        case "nexispark":
            loadVideo("/tpl-houses/houses_reveal_nexispark.mp4");
            break;
    }
    return randomHouse;
}
