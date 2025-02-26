const timezones = {
    "US": ["UTC -05:00 (Eastern Time)", "UTC -06:00 (Central Time)", "UTC -07:00 (Mountain Time)", "UTC -08:00 (Pacific Time)"],
    "UK": ["UTC +00:00 (Greenwich Mean Time)"],
    "IN": ["UTC +05:30 (Indian Standard Time)"],
    "AU": ["UTC +10:00 (Australian Eastern Time)", "UTC +09:30 (Australian Central Time)", "UTC +08:00 (Australian Western Time)"],
    "CA": ["UTC -08:00 (Pacific Time)", "UTC -07:00 (Mountain Time)", "UTC -06:00 (Central Time)", "UTC -05:00 (Eastern Time)"],
    "JP": ["UTC +09:00 (Japan Standard Time)"],
    "CN": ["UTC +08:00 (China Standard Time)"],
    "SG": ["UTC +08:00 (Singapore Standard Time)"],
    "AE": ["UTC +04:00 (Gulf Standard Time)"],
    "DE": ["UTC +01:00 (Central European Time)"]
};

function updateTimezone() {
    let country = document.getElementById("countryDropdown").value;
    let timezoneDropdown = document.getElementById("timezoneDropdown");

    // Clear previous options
    timezoneDropdown.innerHTML = "";

    // Populate new options
    if (timezones[country]) {
        timezones[country].forEach(tz => {
            let option = document.createElement("option");
            option.text = tz;
            timezoneDropdown.add(option);
        });
    }
}

// Initialize with default selection
document.addEventListener("DOMContentLoaded", updateTimezone);


// code to hide/show latitude and longitude fields  
function showLatLngFields() {
    document.getElementById("latLngFields").style.display = "block";
}


// preview logo code 
function previewLogo() {
    const file = document.getElementById("logoUpload").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("logoPreview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}