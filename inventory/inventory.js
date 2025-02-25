
// for calender generation code 
document.addEventListener("DOMContentLoaded", function () {
    let currentDate = new Date(document.getElementById("calendarDate").value);
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

            let th = document.createElement("th");
            th.innerHTML = `${dayName} <br> ${date.getDate()} ${date.toLocaleDateString("en-US", { month: "short" })}`;
            headerRow.appendChild(th);
        }
    }

    function generateRoomData() {
        let body = document.getElementById("calendarBody");
        body.innerHTML = "";

        rooms.forEach(room => {
            let availabilityRow = `<tr><td class="room-category">${room.name}</td>`;
            let ratesRow = `<tr><td>BB</td>`;
            let ratesRowSec = `<tr><td>BB</td>`;
            for (let i = 0; i < 14; i++) {
                availabilityRow += `<td>${room.availability}</td>`;
                ratesRow += `<td>${room.rates[i]}</td>`;
                ratesRowSec += `<td>${room.rates[i]}</td>`;
            }

            availabilityRow += `</tr>`;
            ratesRow += `</tr>`;
            ratesRowSec += `</tr>`;

            body.innerHTML += availabilityRow + ratesRow + ratesRowSec;
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

