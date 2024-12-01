/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
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

// exit modal by clicking outside of it
window.onclick = function(event) {
  isModalShowing = false;
  if (event.target == modal) {
    modal.style.display = "none";
    const image = document.getElementById('myModalImage');
    const title = document.getElementById('title');
    modalImageContainer.removeChild(image);
    modalTitleContainer.removeChild(title);
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