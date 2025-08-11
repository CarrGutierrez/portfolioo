'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// add click event to project modal close button
const projectModalCloseBtn = document.querySelector("[data-modal-close-btn]");
if (projectModalCloseBtn) {
  projectModalCloseBtn.addEventListener("click", function() {
    projectModalContainer.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// Close modal when clicking overlay
overlay.addEventListener("click", function() {
  projectModalContainer.classList.remove("active");
  overlay.classList.remove("active");
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// project modal functionality
const projectItems = document.querySelectorAll(".project-item");
const projectModalContainer = document.querySelector("[data-modal-container]");
const projectModalImg = document.querySelector("[data-modal-img]");
const projectModalTitle = document.querySelector("[data-modal-title]");
const projectModalText = document.querySelector("[data-modal-text]");
const galleryThumbsContainer = document.querySelector("[data-gallery-thumbs]");
const galleryPrevBtn = document.querySelector(".gallery-prev");
const galleryNextBtn = document.querySelector(".gallery-next");
const modalImgWrapper = document.querySelector(".modal-img-wrapper");

let activeGalleryImages = [];
let activeGalleryIndex = 0;

// project modal toggle function
const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

function updateGalleryImage(index) {
  if (!activeGalleryImages.length) return;
  if (index < 0) index = activeGalleryImages.length - 1;
  if (index >= activeGalleryImages.length) index = 0;
  activeGalleryIndex = index;
  projectModalImg.src = activeGalleryImages[activeGalleryIndex];
  // Update active thumb highlight
  const thumbEls = galleryThumbsContainer ? galleryThumbsContainer.querySelectorAll('.gallery-thumb') : [];
  thumbEls.forEach((el, i) => {
    if (i === activeGalleryIndex) el.classList.add('active');
    else el.classList.remove('active');
  });
}

function buildGalleryThumbs(images) {
  if (!galleryThumbsContainer) return;
  galleryThumbsContainer.innerHTML = "";
  images.forEach((src, i) => {
    const thumb = document.createElement('button');
    thumb.className = 'gallery-thumb';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Thumbnail ${i+1}`;
    thumb.appendChild(img);
    thumb.addEventListener('click', () => updateGalleryImage(i));
    galleryThumbsContainer.appendChild(thumb);
  });
}

function setGallerySingleState(isSingle) {
  if (!modalImgWrapper) return;
  if (isSingle) modalImgWrapper.classList.add('gallery-single');
  else modalImgWrapper.classList.remove('gallery-single');
}

function parseGalleryImages(anchorEl, fallbackSrc) {
  const attr = anchorEl.getAttribute('data-gallery-images');
  if (!attr || !attr.trim()) return fallbackSrc ? [fallbackSrc] : [];
  return attr.split(',').map(s => s.trim()).filter(Boolean);
}

// add click event to all project items
for (let i = 0; i < projectItems.length; i++) {

  projectItems[i].addEventListener("click", function (e) {
    e.preventDefault();
    
    const anchor = this.querySelector('a');
    const projectImg = this.querySelector("img");
    const projectTitle = this.querySelector(".project-title");
    const projectCategory = this.querySelector(".project-category");
    
    if (projectImg && projectTitle && projectCategory) {
      // Build gallery list
      activeGalleryImages = parseGalleryImages(anchor, projectImg.src);
      buildGalleryThumbs(activeGalleryImages);
      setGallerySingleState(activeGalleryImages.length <= 1);

      // Set initial image
      activeGalleryIndex = 0;
      projectModalImg.alt = projectImg.alt || 'Project image';
      updateGalleryImage(0);

      projectModalTitle.innerHTML = projectTitle.innerHTML;
      projectModalText.innerHTML = projectCategory.innerHTML;
      
      projectModalFunc();
    }
  });

}

// Prev/Next controls
if (galleryPrevBtn) {
  galleryPrevBtn.addEventListener('click', function(e){
    e.stopPropagation();
    updateGalleryImage(activeGalleryIndex - 1);
  });
}

if (galleryNextBtn) {
  galleryNextBtn.addEventListener('click', function(e){
    e.stopPropagation();
    updateGalleryImage(activeGalleryIndex + 1);
  });
}

// Ensure modal is closed when clicking navbar
const navbarLinks = document.querySelectorAll(".navbar-link");
navbarLinks.forEach(link => {
  link.addEventListener("click", function() {
    // Close any open modals when navbar is clicked
    if (projectModalContainer.classList.contains("active")) {
      projectModalContainer.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // Remove active class from all navigation links and pages
    navigationLinks.forEach(link => link.classList.remove("active"));
    pages.forEach(page => page.classList.remove("active"));

    // Find and activate the matching page
    const btnText = this.innerHTML.trim().toLowerCase();
    pages.forEach(page => {
      if (page.dataset.page.trim().toLowerCase() === btnText) {
        page.classList.add("active");
      }
    });

    // Activate the clicked link
    this.classList.add("active");
    window.scrollTo(0, 0);
  });
}