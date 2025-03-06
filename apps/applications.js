function openAppModal(name, image, description, price) {
    document.getElementById("appModalLabel").innerText = name;
    document.getElementById("appImage").src = image;
    document.getElementById("appDescription").innerText = description;
    document.getElementById("appPrice").innerText = price;
    
    var myModal = new bootstrap.Modal(document.getElementById('appModal'));
    myModal.show();
}

