(function(){
   
   const toLeftSlide = document.querySelector(".chevron-left");
   const toRightSlide = document.querySelector(".chevron-right");
   const images = document.querySelectorAll(".image-container");
   const pageCircles = [];
   const pagination = document.querySelector(".pagination");
   let currentImage = 0;
   let listOfImages = [];
   let clickInterval;
   const container = document.querySelector(".container");
   let initialX = null;
   let currentX = null;

   const createPaginationCircle = (imageIndex) => {
      const circleDiv = document.createElement("div");
      circleDiv.classList.add("circle");
      circleDiv.setAttribute("data-imageIndex", imageIndex);
      pagination.append(circleDiv);
      pageCircles.push(circleDiv);
   }
   
   images.forEach(e => {
      let imageIndex = e.getAttribute("data-imageIndex");
      listOfImages.push(imageIndex);
      createPaginationCircle(imageIndex);
   })

   
   const paginate = (index) => {
      images.forEach(e => {
         if(e.getAttribute("data-imageIndex") === index) {
            pageCircles.forEach(e => {
               e.classList.remove("isActive");
            })
            pageCircles[index].classList.add("isActive");
         }
      })
   }
   
   const moveToRight = () => {
      if(currentImage < listOfImages.length - 1) {
         images[currentImage].classList.add("leftOut");
         currentImage = currentImage + 1;
         imageToDisplay()
      } else {
         images[currentImage].classList.add("leftOut");
         currentImage = 0;
         imageToDisplay()
      }
   }
   const moveToLeft = () => {
      if(currentImage > 0) {
         images[currentImage].classList.add("rightOut");
         currentImage = (currentImage - 1);
         imageToDisplay()
      } else {
         images[currentImage].classList.add("rightOut");
         currentImage = listOfImages.length - 1;
         imageToDisplay()
      }
   }
   
   const clickToLeft = () => {
      clearInterval(clickInterval);
      moveToLeft();
   }
   
   const clickToRight = () => {
      clearInterval(clickInterval);
      moveToRight();
   }
   
   const imageToDisplay = () => {
      for (let i = 0; i < images.length; i++) {
         let index = images[i].getAttribute("data-imageIndex");
         let image = images[i];
         
         if(currentImage == index) {
            image.classList.remove("leftOut");
            image.classList.remove("rightOut");
            image.classList.remove("groupHidden");
            image.classList.add("groupDisplayed");
            paginate(index)
         } else {
            image.classList.add("groupHidden");
            image.classList.remove("groupDisplayed");
         }
      }
   }
   
   const autoMoveToRight = () => {
      moveToRight();
   }
   
   const autoSlide = () => {
      clickInterval = setInterval(autoMoveToRight, 3000);
   }
   
   window.onload = () => {
      autoSlide();
   }

   // window.addEventListener("resize", () => {
   //    if(window.innerWidth <= 625) {
   //    }
   // })
   
   imageToDisplay()
   toLeftSlide.addEventListener("click", clickToLeft)
   toRightSlide.addEventListener("click", clickToRight)
   pageCircles.forEach(e => {
      e.addEventListener("click", () => {
         clearInterval(clickInterval);
         let newImageIndex = parseInt(e.getAttribute("data-imageIndex"));
         if (newImageIndex > currentImage) {
            moveToRight();
         } else {
            moveToLeft();
         }
         currentImage = newImageIndex;
         imageToDisplay();
      })
   })


   container.addEventListener("touchstart", e => {
      // e.preventDefault();
      ;[...e.changedTouches].forEach(touch => {
         const dot = document.createElement("div");
         dot.classList.add("dot");
         dot.style.top = `${touch.pageY}px`;
         dot.style.left = `${touch.pageX}px`;
         dot.id = touch.identifier;
         document.body.append(dot);
      })
   })

   container.addEventListener("touchmove", e => {
      ;[...e.changedTouches].forEach(touch => {
         const dot = document.getElementById(touch.identifier);
         dot.style.top = `${touch.pageY}px`;
         dot.style.left = `${touch.pageX}px`;
      })
   })

   container.addEventListener("touchend", e => {
      ;[...e.changedTouches].forEach(touch => {
         const dot = document.getElementById(touch.identifier);
         dot.remove();
      })
   })

   container.addEventListener("touchcancel", e => {
      ;[...e.changedTouches].forEach(touch => {
         const dot = document.getElementById(touch.identifier);
         dot.remove();
      })
   })

}())
