// galerija 

function openModal(imgElement) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal-img");
    var caption = document.getElementById("caption");

  
    modal.style.display = "block";
    modalImg.src = imgElement.src;  
    caption.innerHTML = imgElement.alt;  

    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();  
        }
    });
}

function closeModal() {
    var modal = document.getElementById("modal");

   
    modal.style.display = "none";
}
