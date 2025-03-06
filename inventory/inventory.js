
// for calender generation code 
document.addEventListener("DOMContentLoaded", function () {
    let currentDate = new Date();
    let startDayOffset = 0;
    let rooms = [
        { name: "Deluxe", availability: 5, rates: Array(14).fill(100) },
        { name: "Super Deluxe", availability: 3, rates: Array(14).fill(110) },
        { name: "Superior", availability: 3, rates: Array(14).fill(120) }
    ];

    function updateCalendar() {
        generateCalendarDays();
        generateRoomData();
    }

    function generateCalendarDays() {
        let startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() + startDayOffset);

        let headerRow = document.getElementById("calendarHeader");
        headerRow.innerHTML = "";

        let firstTh = document.createElement("th");
        firstTh.classList.add("calendar-controls");
        firstTh.innerHTML = `
            <a id="prevDays" href="#prev" class="arrow-button">&lt;</a>
            <input type="date" id="calendarDate" value="${startDate.toISOString().split('T')[0]}">
            <a id="nextDays" href="#next" class="arrow-button">&gt;</a>
        `;
        headerRow.appendChild(firstTh);

        for (let i = 0; i < 14; i++) {
            let date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            let dayName = date.toLocaleDateString("en-US", { weekday: "short" });
            let dayNumber = date.getDate();
            let monthName = date.toLocaleDateString("en-US", { month: "short" });
        
            let th = document.createElement("th");
            th.innerHTML = `
                <div class="day-name">${dayName}</div>
                <div class="day-number">${dayNumber}</div>
                <div class="month-name">${monthName}</div>
            `;
            headerRow.appendChild(th);
        }
        document.getElementById("calendarDate").addEventListener("change", function () {
            currentDate = new Date(this.value);
            startDayOffset = 0; // Reset offset when selecting a new date
            updateCalendar();
        });
    }

    function generateRoomData() {
        let body = document.getElementById("calendarBody");
        body.innerHTML = "";
    
        rooms.forEach(room => {
            let availabilityRow = `<tr><td class="room-category">
                                        <div class="room-name">
                                            <span>${room.name}</span>
                                            <span class="avl-text"data-bs-toggle="tooltip" data-bs-placement="top" title="Availability">AVL</span>
                                        </div>
                                    </td>`;
    
            let repeatCount = 1; // Counter for BB row repetition
    
            let ratesRow = `<tr>
                                <td class="bb-label">BB 
                                <span class="bb-extra">
                                    <i class="bi bi-link-45deg text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Connected Channel"></i>  1
                                    <i class="bi bi-person"data-bs-toggle="tooltip" data-bs-placement="top" title="Occupacy"></i> ${repeatCount}
                                    <span class="bb-extrafor-links" data-bs-toggle="tooltip" data-bs-placement="right" title="Availability Offset">AVO</span>
                                    <i class="bi bi-link-45deg" data-bs-toggle="tooltip" data-bs-placement="right" title="Rates derived from BB (2 Persons ) / Deluxe"></i>
                                </span>
                                </td>`;
    
            let ratesRow2 = `<tr>
                                <td class="rate-with-link">
                                <span data-bs-toggle="tooltip" data-bs-placement="top" title="Rate">RATE</span>
                                <i class="bi bi-link-45deg" data-bs-toggle="tooltip" data-bs-placement="top" title="Rates derived from BB  (2 Persons )  / Deluxe"></i>
                                </td>`;                    
            let ratesRowSec = `<tr class="end-line">
                                <td>
                                <span class="bb-extra" data-bs-toggle="tooltip" data-bs-placement="right" title="Rate">RATE</span>
                                </td>`;
    
            for (let i = 0; i < 14; i++) {
                availabilityRow += `<td class="cl-rate" data-bs-toggle="modal" data-bs-target="#overrideModal1">${room.availability}</td>`;
                ratesRow += `<td class="cl-1">0</td>`;
                ratesRow2 += `<td class="cl-1">${room.rates[i]}</td>`;
                ratesRowSec += `<td class="cl-rate" data-bs-toggle="modal" data-bs-target="#overrideModal2">${room.rates[i]}</td>`;
            }
    
            availabilityRow += `</tr>`;
            ratesRow += `</tr>`;
            ratesRow2 += `</tr>`;
            ratesRowSec += `</tr>`;
    
            // **Appending the same BB row again with incremented count**
            let ratesRowRepeat = `<tr>
                                    <td class="bb-label">BB 
                                    <span class="bb-extra">
                                        <i class="bi bi-link-45deg text-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Connected channels"></i> 1 
                                        <i class="bi bi-person"data-bs-toggle="tooltip" data-bs-placement="top" title="Occupacy"></i>${repeatCount + 1}
                                        <span class="bb-extrafor-links"data-bs-toggle="tooltip" data-bs-placement="right" title="Availability Offset">AVO</span>
                                        <i class="bi bi-link-45deg"data-bs-toggle="tooltip" data-bs-placement="right" title="Rates derived from BB  (2 Persons )  / Deluxe"></i>
                                    </span>
                                    </td>`;
    
            for (let i = 0; i < 14; i++) {
                ratesRowRepeat += `<td class="cl-1">0</td>`;
            }
            ratesRowRepeat += `</tr>`;
            body.innerHTML += availabilityRow + ratesRow + ratesRow2 + ratesRowRepeat + ratesRowSec;
        });
    }
    document.getElementById("calendarDate").addEventListener("change", function (event) {
        currentDate = new Date(event.target.value);
        startDayOffset = 0;
        updateCalendar();
    });

    document.addEventListener("click", function (event) {
        if (event.target.id === "prevDays") {
            startDayOffset -= 14;
            updateCalendar();
        } else if (event.target.id === "nextDays") {
            startDayOffset += 14;
            updateCalendar();
        }
    });

    updateCalendar();

    // ** Drag & Drop for Room Sorting in Modal **
    let draggedItem = null;

    document.querySelectorAll(".draggable").forEach(item => {
        item.draggable = true;

        item.addEventListener("dragstart", function (e) {
            draggedItem = this;
            setTimeout(() => (this.style.display = "none"), 0);
        });

        item.addEventListener("dragend", function () {
            setTimeout(() => (this.style.display = "block"), 0);
            draggedItem = null;
        });

        item.addEventListener("dragover", function (e) {
            e.preventDefault();
        });

        item.addEventListener("drop", function (e) {
            e.preventDefault();
            if (draggedItem !== this) {
                let parent = this.parentNode;
                let children = Array.from(parent.children);
                let draggedIndex = children.indexOf(draggedItem);
                let targetIndex = children.indexOf(this);

                if (draggedIndex > targetIndex) {
                    parent.insertBefore(draggedItem, this);
                } else {
                    parent.insertBefore(draggedItem, this.nextSibling);
                }
            }
        });
    });

    // ** Save Room Order and Update Calendar **
    document.getElementById("saveRoomOrder").addEventListener("click", function () {
        let newOrder = [];
        document.querySelectorAll("#roomList .draggable").forEach(item => {
            let roomName = item.getAttribute("data-room");
            let roomObj = rooms.find(room => room.name === roomName);
            newOrder.push(roomObj);
        });

        rooms = newOrder;
        updateCalendar();
        alert("Room order updated!");
    });
});

// for bootstrap tooltiptrigger that is to show msg on hover on icons
document.addEventListener("DOMContentLoaded", function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
