document.addEventListener("DOMContentLoaded", function () {
    const createBtn = document.getElementById("edit-btn");
    const availabilityModal = new bootstrap.Modal(document.getElementById("booking"));
    const createAvailabilityModal = new bootstrap.Modal(document.getElementById("edit"));

    createBtn.addEventListener("click", function () {
        // Keep the first modal open
        createAvailabilityModal.show();
    });
});

// for multiple image input js in content tab of edit in action
function previewImages(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('imagePreviewContainer');
    previewContainer.innerHTML = ""; // Clear previous previews

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function () {
            const previewDiv = document.createElement('div');
            previewDiv.classList.add('image-preview');

            const img = document.createElement('img');
            img.src = reader.result;

            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = "×";
            removeBtn.classList.add('remove-btn');
            removeBtn.onclick = function () {
                previewDiv.remove();
            };

            previewDiv.appendChild(img);
            previewDiv.appendChild(removeBtn);
            previewContainer.appendChild(previewDiv);
        };

        reader.readAsDataURL(file);
    }
}

// Toggle Advanced Settings in create rate section
document.getElementById("toggleSettings").addEventListener("click", function (e) {
        e.preventDefault();
        const section = document.getElementById("advancedSettings");
        if (section.classList.contains("d-none")) {
            section.classList.remove("d-none");
            this.textContent = "Hide advanced settings";
        } else {
            section.classList.add("d-none");
            this.textContent = "Show advanced settings";
        }
    });
