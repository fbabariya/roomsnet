
// for handalling check box slection in 
document.addEventListener("DOMContentLoaded", function () {
    const selectAllCheckbox = document.getElementById("selectAllRestrictions");
    const restrictionCheckboxes = document.querySelectorAll(".restriction-checkbox");

    // Function to enable/disable related input/toggle
    function toggleInput(checkbox) {
        let targetInput = document.getElementById(checkbox.dataset.target);
        if (targetInput) {
            targetInput.disabled = !checkbox.checked;
        }
    }

    // Handle individual checkboxes
    restrictionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            toggleInput(this);
        });
    });

    // Handle "Select All" checkbox
    selectAllCheckbox.addEventListener("change", function () {
        restrictionCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
            toggleInput(checkbox);
        });
    });
});



// for handalling check box slection 
document.addEventListener("DOMContentLoaded", function () {
    const selectAll = document.getElementById("selectAllRooms");
    const parentRooms = document.querySelectorAll(".room-category"); 
    const subRooms = document.querySelectorAll(".sub-room");

    // Select All Functionality
    selectAll.addEventListener("change", function () {
        let isChecked = this.checked;
        parentRooms.forEach(room => room.checked = isChecked);
        subRooms.forEach(sub => sub.checked = isChecked);
    });

    // Parent Room Checkbox Logic
    parentRooms.forEach(parent => {
        parent.addEventListener("change", function () {
            let targetClass = this.dataset.target; // Get the target sub-room class
            let subRoomsInGroup = document.querySelectorAll("." + targetClass);
            
            subRoomsInGroup.forEach(sub => sub.checked = this.checked); // Select/unselect sub-rooms
            updateSelectAllState();
        });
    });

    // Sub-Room Checkbox Logic
    subRooms.forEach(sub => {
        sub.addEventListener("change", function () {
            let parentRoom = document.querySelector(`[data-target="${this.classList[1]}"]`);
            
            if (parentRoom) {
                if (this.checked) {
                    parentRoom.checked = true; // If any sub-room is checked, select parent
                } else {
                    let subRoomsInGroup = document.querySelectorAll("." + this.classList[1]);
                    let isAnyChecked = Array.from(subRoomsInGroup).some(sub => sub.checked);
                    
                    parentRoom.checked = isAnyChecked; // Uncheck parent if no sub-rooms checked
                }
            }
            updateSelectAllState();
        });
    });

    // Function to update "Select All" checkbox
    function updateSelectAllState() {
        let allChecked = [...parentRooms, ...subRooms].every(input => input.checked);
        selectAll.checked = allChecked;
    }
});
