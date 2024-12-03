// toggle hamburger menu
let isDropdownShowing = false;
const topNav = document.getElementById('topNav');
const dropDown = document.getElementById('dropDown');
const backdrop = document.getElementById('dropdownBackdrop');
topNav.onclick = function() {
  if (isDropdownShowing) {
    dropDown.style.display = 'none';
    backdrop.style.display = 'none';
  } else {
    backdrop.style.display = 'block';
    dropDown.style.display = 'block';
  }
  isDropdownShowing = !isDropdownShowing;
}
// side scrolling behavior
const scrollContainers = document.getElementsByClassName('gallery');
const backBtns = document.getElementsByClassName('backBtn');
const nextBtns = document.getElementsByClassName('nextBtn');

const scrollArray = Array.from(scrollContainers);
const backArray = Array.from(backBtns);
const nextArray = Array.from(nextBtns);

scrollArray.forEach((scroll, index) => {
  backArray[index].addEventListener('click', () => {
    scroll.style.behavior = 'smooth';
    scroll.scrollLeft -= 225;
  })
  nextArray[index].addEventListener('click', () => {
    scroll.style.scrollBehavior = 'smooth';
    scroll.scrollLeft += 225;
  })
});

// image modal behavior
let modalImageContainer;
let modalTitleContainer;
let modalImage;
let isModalShowing = false;
const modal = document.getElementById("myModal");
const exitModal = document.getElementById("exitModal");
// exit modal from X button
exitModal.onclick = function() {
  isModalShowing = false;
  modal.style.display = "none";
  const image = document.getElementById('myModalImage');
  const title = document.getElementById('title');
  modalImageContainer.removeChild(image);
  modalTitleContainer.removeChild(title);

  currentGallery.style.overflowX = 'scroll';
  imagesInCurrentGallery = [];
  currentGallery = {};
  currentImage = '';
}

// exit modal and dropdown by clicking outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    isModalShowing = false;
    modal.style.display = "none";
    const image = document.getElementById('myModalImage');
    const title = document.getElementById('title');
    modalImageContainer.removeChild(image);
    modalTitleContainer.removeChild(title);


    currentGallery.style.overflowX = 'scroll';
    imagesInCurrentGallery = [];
    currentGallery = {};
    currentImage = '';
  }

  if (event.target == backdrop) {
    isDropdownShowing = false;
    dropDown.style.display = 'none';
    backdrop.style.display = 'none';
  }
}

// click thumbnail, get modal
const thumbnails = document.getElementsByClassName('thumb');
const thumbs = Array.from(thumbnails);
let imagesInCurrentGallery = [];
let currentGallery, currentImage;
thumbs.forEach(thumb => {
  thumb.onclick = function() {
    isModalShowing = true;
    modal.style.display = "block";
    modalImageContainer = document.getElementById("modalImageContainer");
    modalTitleContainer = document.getElementById("modalTitleContainer");
    modalTitleContainer.innerHTML += `<h2 class='modal-title' id='title''>${thumb.alt}</h2>`;
    modalImageContainer.innerHTML += `<a id='myModalImage' href=${thumb.src}><img class='modal-image' src=${thumb.src}></a>`;
    // resize for phone
    imageResize();
    // get gallery info for scrolling
    getGallery(thumb);
    getImages(currentGallery);
    currentImage = thumb.alt;
    currentGallery.style.overflowX = 'hidden';
  }
});

// resize modal when screen size changes
window.addEventListener("resize", () => {
  if (isModalShowing) {
    imageResize();
  }
});

// modal scroll phone
let touchStartX;
const imageContainer = document.getElementById('modalImageContainer');

imageContainer.addEventListener('touchstart', (event) => {
  touchStartX = event.touches[0].clientX;
}, {passive: true});

imageContainer.addEventListener('touchend', (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const threshold = 50;
  let nextImage;

  imagesInCurrentGallery.forEach((image, index) => {
      if (image.alt === currentImage) {
        if (touchEndX < touchStartX - threshold && index < imagesInCurrentGallery.length - 1) {
          nextImage = imagesInCurrentGallery[index + 1];
        }
        if (touchEndX > touchStartX + threshold  && index > 0) {
          nextImage = imagesInCurrentGallery[index - 1];
        }
      }
    });

    if (nextImage) {
      const image = document.getElementById('myModalImage');
      const title = document.getElementById('title');
      modalImageContainer.removeChild(image);
      modalTitleContainer.removeChild(title);
      currentImage = nextImage.alt;
      modalTitleContainer.innerHTML += `<h2 class='modal-title' id='title''>${nextImage.alt}</h2>`;
      modalImageContainer.innerHTML += `<a id='myModalImage' href=${nextImage.src}><img class='modal-image' src=${nextImage.src}></a>`;
    }

    imageResize();
});

// modal scroll laptop
document.addEventListener('keydown', function(e) {
  imageResize();
  if (isModalShowing) {
    let nextImage;
    imagesInCurrentGallery.forEach((image, index) => {
        if (image.alt === currentImage) {
          if (e.key === 'ArrowRight' && index < imagesInCurrentGallery.length - 1) {
            nextImage = imagesInCurrentGallery[index + 1];
          }
          if (e.key === 'ArrowLeft' && index > 0) {
            nextImage = imagesInCurrentGallery[index - 1];
          }
        }
      });
    if (nextImage) {
      const image = document.getElementById('myModalImage');
      const title = document.getElementById('title');
      modalImageContainer.removeChild(image);
      modalTitleContainer.removeChild(title);
      currentImage = nextImage.alt;
      modalTitleContainer.innerHTML += `<h2 class='modal-title' id='title''>${nextImage.alt}</h2>`;
      modalImageContainer.innerHTML += `<a id='myModalImage' href=${nextImage.src}><img class='modal-image' src=${nextImage.src}></a>`;
    }
  }
});

// helper functions
function imageResize() {
  const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pictureFrame = document.getElementsByClassName('modal-content')[0];
    if (screenHeight > screenWidth) {
      // recenter image for portrait
      pictureFrame.style.margin = '40% auto';
      // resize image for portrait
      setTimeout(function(){
        const pictureItself = document.getElementsByClassName('modal-image')[0];
        pictureItself.style.maxHeight = '800px';
     }, 1);
    } else {
      // recenter image for landscape
      pictureFrame.style.margin = '5px auto;';
      pictureFrame.style.padding = '10px';
      // resize image for landscape
      setTimeout(function(){
        const pictureItself = document.getElementsByClassName('modal-image')[0];
        pictureItself.style.maxHeight = '555px';
     }, 0);
    }
}

// find all images in given gallery, add src and alt to array
function getImages(gallery) {
  const children = Array.from(gallery.children);
  if (!children.length) {
    return;
  }
  children.forEach(child => {
    if (child.tagName === 'IMG') {
      imagesInCurrentGallery.push({alt: child.alt, src: child.src});
    } else {
      getImages(child);
    }
  })
}

// find the gallery of the given images
function getGallery(element) {
  const parent = element.parentElement;
  // end if we reach the top
  if (!parent) {
    return;
  }
  const classList = Array.from(parent.classList);
  // crawl till we find the gallery
  if (classList.includes('gallery')) {
    currentGallery = parent;
  } else {
    getGallery(parent);
  }
}

