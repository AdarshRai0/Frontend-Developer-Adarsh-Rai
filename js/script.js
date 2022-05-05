window.addEventListener("load", ()=>{
  document.querySelector(".page-loader").classList.add("slide-out-right");
  setTimeout(() => {
  document.querySelector(".page-loader").style.display = "none";
    
  }, 1000);
})



let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;


//----------toogle body scrolling

function toggleBodyScrolling() {
  document.body.classList.toggle("hide-scrolling");
}

//filter portfolio items
const filterBtnContainer = document.querySelector(".portfolio-filter");
let portfolioItems;
filterBtnContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("portfolio-filter-btn") &&
    !e.target.classList.contains("active")
  ) {
    filterBtnContainer.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");
    toggleBodyScrolling();
    document.querySelector(".filter-status").classList.add("active");
    document.querySelector(
      ".filter-status p"
    ).innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
    setTimeout(() => {
      filterItems(e.target);
    }, 400);
    setTimeout(() => {
      document.querySelector(".filter-status").classList.remove("active");
      toggleBodyScrolling();
    }, 800);
  }
});

function filterItems(filterBtn) {
  const selectedCategory = filterBtn.getAttribute("data-filter");
  document.querySelectorAll(".portfolio-item").forEach((item) => {
    const category = item.getAttribute("data-category").split(",");
    if (
      category.indexOf(selectedCategory) !== -1 ||
      selectedCategory === "all"
    ) {
      item.classList.add("show");
    } else {
      item.classList.remove("show");
    }
  });
  portfolioItems = document.querySelectorAll(".portfolio-item.show");
}
filterItems(document.querySelector(".portfolio-filter-btn.active"));

// portfolio item details popup
let portfolioItemIndex;
document.addEventListener("click", (e) => {
  if (e.target.closest(".portfolio-item")) {
    const currentItem = e.target.closest(".portfolio-item");
    portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
    togglePopup();
    portfolioItemDetails();
    updateNextPreview();
  }
});
function togglePopup() {
  document.querySelector(".portfolio-popup").classList.toggle("open");
  toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
  document.querySelector(".pp-thumbnail img").src =
    portfolioItems[portfolioItemIndex].querySelector("img").src;

  document.querySelector(".pp-header h3").innerHTML = portfolioItems[
    portfolioItemIndex
  ].querySelector(".portfolio-item-title").innerHTML;

  document.querySelector(".pp-body").innerHTML = portfolioItems[
    portfolioItemIndex
  ].querySelector(".portfolio-item-details").innerHTML;

  document.querySelector(".pp-counter").innerHTML = `${
    portfolioItemIndex + 1
  } of ${portfolioItems.length} ( <span title="category">${
    document.querySelector(".portfolio-filter-btn.active").innerHTML
  }</span>)`;
}

function updateNextPreview() {
  if (portfolioItemIndex !== 0) {
    document.querySelector(".pp-footer-left").classList.remove("hidden");
    document.querySelector(".pp-footer-left h3").innerHTML =
      portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;
    document.querySelector(".pp-footer-left img").src =
      portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-left").classList.add("hidden");
  }
  if (portfolioItemIndex !== portfolioItems.length - 1) {
    document.querySelector(".pp-footer-right").classList.remove("hidden");
    document.querySelector(".pp-footer-right h3").innerHTML =
      portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;
    document.querySelector(".pp-footer-right img").src =
      portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
  } else {
    document.querySelector(".pp-footer-right").classList.add("hidden");
  }
}
document.querySelector(".pp-prev-btn").addEventListener("click", () => {
  changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
  changePortfolioItem("next");
});
function changePortfolioItem(direction) {
  console.log(direction);
  if(direction == "prev"){
    portfolioItemIndex--;
  }else{
    portfolioItemIndex++
  }
  document.querySelector(".pp-overlay").classList.add(direction);
  setTimeout(() => {
    document.querySelector(".pp-inner").scrollTo(0,0);
  portfolioItemDetails();
  updateNextPreview();
  }, 400);
  setTimeout(() => {
  document.querySelector(".pp-overlay").classList.remove(direction);
    
  }, 1000);
  
}



ScrollReveal().reveal(`.profile-pic`, { delay: 500 });
ScrollReveal().reveal(`.profile__name`, { delay: 550 });
ScrollReveal().reveal(`.skills__data`, { delay: 600 });
ScrollReveal().reveal(`.portfolio-filter`, { delay: 650 });
ScrollReveal().reveal(`.portfolio-item`, { interval: 100, delay: 500 });