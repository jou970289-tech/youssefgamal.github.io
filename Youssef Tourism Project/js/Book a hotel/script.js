const modal = document.getElementById("details-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const closeButton = document.querySelector(".close-button");

function showDetails(imageId) {
  const card = document.querySelector(`.image-card[data-image-id="${imageId}"]`);
  const imageUrl = card.querySelector("img").src;
  const title = card.querySelector(".overlay h2").textContent;
  const description = `هذا هو الوصف التفصيلي للفندق رقم ${imageId}. مكان مثالي للراحة والاسترخاء.`;

  modalTitle.textContent = title;
  modalImage.src = imageUrl;
  modalDescription.textContent = description;

  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

closeButton.addEventListener("click", closeModal);

window.addEventListener("click", function(event) {
  if (event.target === modal) {
    closeModal();
  }
});
