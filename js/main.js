// ------------------------------Navigation Menu -------------------------------------------------------------
(() =>{

const humbergerBtn = document.querySelector(".humburger-btn");
const navMenu = document.querySelector(".nav-menu");
 const closeNavBtn = navMenu.querySelector(".close-nave-menu");

 humbergerBtn.addEventListener("click", showNavMenue);
 closeNavBtn.addEventListener("click", hideNavMenu);
function showNavMenue(){
    navMenu.classList.add("open");
    bodyScrollingToggle();
}

function hideNavMenu(){
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
}

function fadeOutEffect(){
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() =>{
        document.querySelector(".fade-out-effect").classList.remove("active");
    },300)
}

// attach an event handler to document
document.addEventListener("click", (event) =>{
    if(event.target.classList.contains('link-item')){
        // make sure that event .target.hash has a value before overriding default behavior
        if(event.target.hash !==""){
            // prevent anchor click behavior
            event.preventDefault();
            var hash = event.target.hash;
           // deactivate existing active 'section'
           document.querySelector(".section.active").classList.add("hide");
           document.querySelector(".section.active").classList.remove("active");

           // activate new section
           document.querySelector(hash).classList.add("active");
           document.querySelector(hash).classList.remove("hide");

           // deactivate existing active navigation menu link item
           navMenu.querySelector(".active").classList.add("outer-shadow" , "hover-in-shadow");
           navMenu.querySelector(".active").classList.remove("active" , "inner-shadow");
           // if ckicked link item is contained within the navigation menu
            if(navMenu.classList.contains("open")){
           //activate new navigation menu link item
           event.target.classList.add("active", "inner-shadow");
           event.target.classList.remove("outer-shadow", "hover-in-shadow");

           // hide navigation menu

           hideNavMenu();
        }
        else{
            let navItems = navMenu.querySelectorAll(".link-item");
            navItems.forEach((item) =>{
                if(hash === item.hash){
                    // activate the new neiagtion men link item
                    item.classList.add("active", "inner-shadow");
                    item.classList.remove("outer-shadow", "hover-in-shadow");

                }
            })
            fadeOutEffect();
            
        }
        // add hash (#) to url  // it will show the location of existence if we go contact section it will show us the contact url upper
        window.location.hash = hash;
    }
}

})

})();


// skills education and experience code
(() => {

    const aboutSection = document.querySelector(".about-section"),
        tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {

        if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {

            const target = event.target.getAttribute("data-target");
            // deactivate the existin active tab item
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //activate new tab

            event.target.classList.add("active", "outer-shadow");
            // daactivat eht eeisting items of tab content

            aboutSection.querySelector(".tab-content.active").classList.remove("active");

            // activate new tab

            aboutSection.querySelector(target).classList.add("active");
        }

    })



})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

/*----------------Portfolio filter and popup------------------------------------------------*/

(() => {
    const filterContainer = document.querySelector(".portfolio-filter");
    const portfolioItemsContainer = document.querySelector(".portfolio-items");
    const portfolioItems = document.querySelectorAll(".portfolio-item");


    const popup = document.querySelector(".portfolio-popup");
    const prevBtn = popup.querySelector(".pp-prev");
    const nextBtn = popup.querySelector(".pp-next");
    const closeBtn = popup.querySelector(".pp-close");
    const projectDetailContainer = popup.querySelector(".pp-details");
    const projectDetailBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    // filter portfolilio items
    filterContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("filter-item") &&
            !event.target.classList.contains("active")) {

            // deactivating existing active filter -item
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate ne filter item
            event.target.classList.add("active", "outer-shadow");

            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if (target === item.getAttribute("data-category") || target === 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
               
            })
            

        }

    })

    portfolioItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
          // get the portfolio item index
          itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
          screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute
          ("data-screenshots");
          //convert screeshots into array
          screenshots = screenshots.split(",");
          if(screenshots.length === 1){
            prevBtn.style.display="none";
            nextBtn.style.display="none";
          }
          else{
            prevBtn.style.display="block";
            prevBtn.style.display="block";
          }
          slideIndex = 0;
          popupToggle();
          popupSlideShow();
          popupDetails();
        }
    })

    closeBtn.addEventListener("click",()=>{
        popupToggle();
        if(projectDetailContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideShow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        // activate loader until the oppup img loadied
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src=imgSrc;
        popupImg.onload= () =>{
            // deactivate loader after the popup loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex +1)+ " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex=0;
        }
        else{
            slideIndex++;
        }
        popupSlideShow();
    })


    // prev slide 
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex=screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideShow();
      
    })

     function popupDetails(){
        // fi portfolio item not exist
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailBtn.style.display="none";
            return;
        }
        projectDetailBtn.style.display="block";
        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
          // set the project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        // set the project title
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the projec category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
       // set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
     }
    projectDetailBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        
        if(projectDetailContainer.classList.contains("active")){
            projectDetailBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailBtn.querySelector("i").classList.add("fa-plus");
            projectDetailContainer.classList.remove("active");
            projectDetailContainer.style.maxHeight = 0 + "px";
        }
        else{
            projectDetailBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailBtn.querySelector("i").classList.add("fa-minus");
            projectDetailContainer.classList.add("active");
            projectDetailContainer.style.maxHeight = projectDetailContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailContainer.offsetTop);
        }
    }


})();


// ------------------------------------------------------------------------------------------------------------------------------------

(() =>{

    const slideContainer = document.querySelector(".testi-slider-container");
    const slides = slideContainer.querySelectorAll(".testi-item");
    
    const slideWidth = slideContainer.offsetWidth;
    const prevBtn = document.querySelector(".testi-slider-nav .prev");
    const nextBtn = document.querySelector(".testi-slider-nav .next");
    const activeSlide = slideContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    // set width to all slides
    slides.forEach((slide) =>{
        slide.style.width = slideWidth + "px";
    })

    // set widht of slidercontainer
    slideContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () =>{
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        slider();
    })
    

    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        }
        else{
            slideIndex--;
        }
        slider();
    })

    function slider(){
        //deactive existing active slide
        slideContainer.querySelector(".testi-item.active").classList.remove("active");
        // active new slide
        slides[slideIndex].classList.add("active");
        slideContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }

    slider();
})();


// // -------------------------------Hide all sections except active ------------------------------------------------------------
// (() =>{

//     const sections = document.querySelectorAll(".section");
//     sections.forEach((section) =>{
//         if(!section.classList.contains("active")){
//             section.classList.add("hide");
//         }
//     })

// })();



window.addEventListener("load", () =>{
    //prefloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display="none";
    }, 600)
})