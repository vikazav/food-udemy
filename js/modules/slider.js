function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
// SLIDER
let offset = 0;
let index = 1;
const slides = document.querySelectorAll(slide),
        sliderPrev = document.querySelector(prevArrow),
        sliderNext = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector( totalCounter),
        sliderField = document.querySelector(field),
        slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        width =  window.getComputedStyle(slidesWrapper).width;



// showSlide(index);   

// if ( slides.length <10) {
//  total.textContent = `0${slides.length}`;
//     } else {
//         total.textContent = slides.length;
//     }
    

// function showSlide(n) {
//     if ( n > slides.length ) {
//         index = 1;
//     }
//     if ( n < 1 ) {
//         index = slides.length;
//     }
//     slides.forEach ((item) => item.style.display = 'none');
//     slides[index -1].style.display = 'block';

//     if (slides.length <10) {
//         current.textContent = `0${index}`;
//            } else {
//                current.textContent = index;
//            }   
//    }
// function plusSlides(n) {
//     showSlide(index+=n);
// }

//  sliderPrev.addEventListener('click', function(){
//     plusSlides(-1);
// });
//  sliderNext.addEventListener('click', function(){
//     plusSlides(1);
//    });

// SLIDER CAROUSEL
//беремо стилі які дав css після рендеру сторінки
      

 if ( slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${index}`;
 } else {
        total.textContent = slides.length;
        current.textContent = index;
  }

slidesWrapper.style.overflow = 'hidden';
sliderField.style.width = 100 * slides.length + '%';
sliderField.style.transition = '0.5s all';
sliderField.style.display = 'flex';

slides.forEach (slide => {
    slide.style.width = width;
});
function addZero() {
    if ( slides.length <10) {
        current.textContent = `0${index}`;
     } else {
          current.textContent = index;
          }
}
 
slider.style.position = 'relative';
const indicators = document.createElement('ol'),
        dots =[];
indicators.classList.add('carousel-indicators');
indicators.style.cssText = `
position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;`;
slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to',i+1);
        
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i==0) {
            dot.style.opacity = 1;
        }
    indicators.append(dot);
    dots.push(dot);
   }
   function deleteNotDigits(str) {
    return  +str.replace(/\D/g, '');
  }
  function dotOpacity() {
    dots.forEach(dot => dot.style.opacity = ".5");
    dots[index-1].style.opacity = 1;
  }
 

sliderNext.addEventListener ('click',() => {
            if (offset == deleteNotDigits(width) * (slides.length-1)) {
        offset = 0;
            } else {
                offset += deleteNotDigits(width);
            }
        sliderField.style.transform = `translateX(-${offset}px)`;

        if ( index == slides.length) {
            index = 1;
            } else {
                index ++;
            }
            addZero();//виклик
        
         dotOpacity();   
});

sliderPrev.addEventListener ('click',() => {
    if (offset == 0) {
offset = deleteNotDigits(width) * (slides.length -1);
    } else {
        offset -=  deleteNotDigits(width);
    }
sliderField.style.transform = `translateX(-${offset}px`;

if ( index == 1) {
    index = slides.length;
    } else {
        index --;
    }
    addZero();//виклик

    dotOpacity();    

    });

dots.forEach(dot => {
    dot.addEventListener('click',(e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        index = slideTo;
        offset = deleteNotDigits(width) * (slideTo -1);
        sliderField.style.transform = `translateX(-${offset}px)`;
    addZero();//виклик
       

    dotOpacity();   
    });

});
}

export default slider;