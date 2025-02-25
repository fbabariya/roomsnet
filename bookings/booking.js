// to keep CMTEST model open
document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("CMTEST");
    const availabilityModal = new bootstrap.Modal(document.getElementById("booking"));
    const createAvailabilityModal = new bootstrap.Modal(document.getElementById("edit"));

    createBtn.addEventListener("click", function () {
        // Keep the first modal open
        createAvailabilityModal.show();
    });
});

// to keep demo model open
document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("demo-btn");
    const availabilityModal = new bootstrap.Modal(document.getElementById("booking"));
    const createAvailabilityModal = new bootstrap.Modal(document.getElementById("demo"));

    createBtn.addEventListener("click", function () {
        // Keep the first modal open
        createAvailabilityModal.show();
    });
});

// to show and hide model details in rooms section 
function toggleRoomDetails(id, element) {
        var details = document.getElementById(id);
        var arrow = element.querySelector(".arrow");

        if (details.style.display === "none" || details.style.display === "") {
            details.style.display = "block";
            arrow.classList.toggle("rotate"); // Rotate arrow when expanded
        } else {
            details.style.display = "none";
            arrow.classList.toggle("rotate"); // Reset rotation when collapsed
        }
    }
