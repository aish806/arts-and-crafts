// 1. List your image filenames here
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
  }
}

const folder = 'photos_art';

let currentPage = 1;
const imagesPerPage = 2; // Adjust this number based on your preference
let currentCategory = 'all';

// 2. Load Gallery with Pagination
function loadGallery() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = ""; // Clear existing
    
    // Flatten all images into one list or filter by category
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

// 4. Updated Filtering Logic for Pagination
function filterSelection(c) {
    currentCategory = c;
    currentPage = 1; // Reset to page 1 on filter change
    loadGallery();
    
    // Update active button styling
    var btns = document.querySelectorAll(".filter-buttons .btn");
    btns.forEach(btn => {
        btn.classList.remove("active");
        if(btn.getAttribute("onclick").includes(`'${c}'`)) btn.classList.add("active");
    });
}

// 3. W3.CSS Sidebar Logic
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

// 5. Active Button Styling
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

// Initialize everything

window.onload = loadGallery;

