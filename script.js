const images = {
  "paper": {
    "images": [
      'paper_art_0.jpeg',
      'paper_art_1.jpeg',
      'paper_art_2.jpeg',
      'paper_art_3.jpeg',
      'paper_art_4.jpeg',
      'paper_art_5.jpeg',
      'paper_art_6.jpeg',
      'paper_art_7.jpeg'],
    "alt": "Paper Art"
  },
  "cards": {
    "images":[
      'cards_1.jpeg',
      'cards_2.jpeg',
      'cards_3.jpeg'],
    "alt": "Cards"
  },
  "jewellery": {
    "images":[
      'jewellery_1.jpeg',
      'jewellery_2.jpeg'],
    "alt": "Jwellery"
  },
  "stone": {
    "images":[
      'stone_art_1.jpeg',
      'stone_art_2.jpeg'],
    "alt": "Stone Art"
  },
  "wall": {
    "images":[
      'wall_art_1.jpeg',
      'wall_art_2.jpeg',
      'wall_art_3.jpeg',
      'wall_art_4.jpeg',
      'wall_art_5.jpeg',
      'wall_art_6.jpeg',
      'wall_art_7.jpeg'],
    "alt": "Wall Art"
  },
  "selfi_point": {
    "images":[
      'selfi_point_1.jpeg',
      'selfi_point_2.jpeg'],
    "alt": "Selfi Point"
  },
  "decorative_items": {
    "images":[
      'decorative_items_1.jpeg',
      'decorative_items_2.jpeg',
      'decorative_items_3.jpeg',
      'decorative_items_4.jpeg'],
    "alt": "Decorative Items"
  },
}

const folder = 'photos_art';

let currentPage = 1;
let imagesPerPage = 3;
let currentCategory = 'all';

// Load Gallery with Pagination
function loadGallery() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ""; 
    
    let allImages = [];
    for (const [key, value] of Object.entries(images)) {
        if (currentCategory === 'all' || currentCategory === key) {
            value.images.forEach(filename => {
                allImages.push({ filename, key, alt: value.alt });
            });
        }
    }

    // Calculate pagination slice
    const start = (currentPage - 1) * imagesPerPage;
    const end = start + imagesPerPage;
    const paginatedItems = allImages.slice(start, end);

    paginatedItems.forEach(item => {
        const div = document.createElement('div');
        div.className = `photo-item ${item.key} show`; // Force show since we slice manually
        div.innerHTML = `<img src="${folder}/${item.filename}" alt="${item.alt}">`;
        gallery.appendChild(div);
    });

    renderPagination(allImages.length);
}

function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalItems / imagesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('a');
        btn.href = "javascript:void(0)";
        btn.innerHTML = i;
        btn.className = `w3-bar-item w3-button ${currentPage === i ? 'w3-black' : 'w3-hover-black'}`;
        btn.onclick = () => {
            currentPage = i;
            loadGallery();
            window.scrollTo(0, document.getElementById('gallery').offsetTop - 100);
        };
        paginationContainer.appendChild(btn);
    }
}

function filterSelection(c) {
    currentCategory = c;
    currentPage = 1; // Reset to page 1 on filter change
    loadGallery();
    
    var btns = document.querySelectorAll(".filter-buttons .btn");
    btns.forEach(btn => {
        btn.classList.remove("active");
        if(btn.getAttribute("onclick").includes(`'${c}'`)) btn.classList.add("active");
    });
}

var btnContainer = document.querySelector(".filter-buttons");
if (btnContainer) {
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
}

window.onload = loadGallery;

