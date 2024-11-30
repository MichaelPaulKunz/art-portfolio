let scrollContainer = document.querySelector('.gallery');
let backBtn = document.getElementById('backBtn');
let nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft += 225;
});

backBtn.addEventListener('click', () => {
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft -= 225;
})

let scrollContainer_2 = document.querySelector('#gallery_2');
let backBtn_2 = document.getElementById('backBtn_2');
let nextBtn_2 = document.getElementById('nextBtn_2');

scrollContainer_2.addEventListener('wheel', (e) => {
  e.defaultPrevented();
  scrollContainer_2.scrollLeft += e.deltaY;
  scrollContainer_2.style.scrollBehavior = 'auto';
});

nextBtn_2.addEventListener('click', () => {
  scrollContainer_2.style.scrollBehavior = 'smooth';
  scrollContainer_2.scrollLeft += 225;
});

backBtn_2.addEventListener('click', () => {
  scrollContainer_2.style.scrollBehavior = 'smooth';
  scrollContainer_2.scrollLeft -= 225;
})

// image modal
let modalImageContainer;
let modalTitleContainer;
let modalImage;
const modal = document.getElementById("myModal");
const exitModal = document.getElementById("exitModal");
// When the user clicks on <span> (x)
exitModal.onclick = function() {
  modal.style.display = "none";
  const image = document.getElementById('myModalImage');
  const title = document.getElementById('title');
  modalImageContainer.removeChild(image);
  modalTitleContainer.removeChild(title);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    const image = document.getElementById('myModalImage');
    const title = document.getElementById('title');
    modalImageContainer.removeChild(image);
    modalTitleContainer.removeChild(title);
  }
}

// When the user clicks the thumnbail, enlarged modal pops up
const thumbnails = document.getElementsByClassName('thumb');
const thumbs = Array.from(thumbnails);
thumbs.forEach(thumb => {
  thumb.onclick = function() {
    modal.style.display = "block";
    modalImageContainer = document.getElementById("modalImageContainer");
    modalTitleContainer = document.getElementById("modalTitleContainer");
    modalTitleContainer.innerHTML += `<h2 class='modal-title' id='title''>${thumb.alt}</h2>`;
    modalImageContainer.innerHTML += `<img class='modal-image' src=${thumb.src} id='myModalImage'>`;
    // resize for phone
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
     }, 1);
    }
  }
});