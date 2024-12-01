// toglge hamburger menu
let isDropdownShowing = false;
const topNav = document.getElementById('topNav');
const dropDown = document.getElementById('dropDown');
const backdrop = document.getElementById('dropdownBackdrop');
topNav.onclick = function() {
  if (isDropdownShowing) {
    dropDown.style.display = 'none';
    backdrop.style.display = 'none';
  } else {
    dropDown.style.display = 'block';
    backdrop.style.display = 'block';
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
  }
});

// resize modal when screen size changes
window.addEventListener("resize", () => {
  if (isModalShowing) {
    imageResize()
  }
});



// helper functions
function imageResize() {
  const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pictureFrame = document.getElementsByClassName('modal-content')[0];
    if (screenHeight > screenWidth) {
      // recenter image for portrait
      pictureFrame.style.margin = '50% auto';
      // resize image for portrait
      setTimeout(function(){
        const pictureItself = document.getElementsByClassName('modal-image')[0];
        pictureItself.style.maxHeight = '800px';
     }, 1);
    } else {
      // recenter image for landscape
      pictureFrame.style.margin = '5px auto;';
      // resize image for landscape
      setTimeout(function(){
        const pictureItself = document.getElementsByClassName('modal-image')[0];
        pictureItself.style.maxHeight = '555px';
     }, 0);
    }
}