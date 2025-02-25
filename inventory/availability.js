
document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("openCreateAvailability");
    const availabilityModal = new bootstrap.Modal(document.getElementById("availability"));
    const createAvailabilityModal = new bootstrap.Modal(document.getElementById("createAvailabilityRule"));

    createBtn.addEventListener("click", function () {
        // Keep the first modal open
        createAvailabilityModal.show();
    });
});


document.getElementById('selectAllChannels').addEventListener('change', function () {console.log('hello');
    let checkboxes = document.querySelectorAll('.channel-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

document.getElementById('selectRooms').addEventListener('change', function () {
    let checkboxes = document.querySelectorAll('.room-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});



