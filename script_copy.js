//----------------TABS----------------------


window.addEventListener('DOMContentLoaded',() =>{
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabcontent () {
            tabsContent.forEach(item =>{
                item.style.display = "none";
            });
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }
        function showTabContent (i = 0) {
            tabsContent[i].style.display = "block";
            tabs[i].classList.add('tabheader__item_active');
        }
      
        hideTabcontent ();
        showTabContent ();
tabsParent.addEventListener('click',(event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
        tabs.forEach((item,i) => {
        if (target == item){
            hideTabcontent ();
            showTabContent (i);
        }
        });
    }

});

//----------------TIMER----------------------

const deadline  = '2021-12-19';
function getTimeRemaining(endtime) {
    const t= Date.parse(deadline) - Date.parse(new Date()),
          days = Math.floor(t/(1000*60*60*24)),
          hours = Math.floor(t/(1000*60*60)%24),
          minutes = Math.floor((t/1000/60)%60),
          seconds = Math.floor((t/1000)%60);

     return {
         'total':t,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
     };
}
function getZero (num) {
    if (num >=0 && num < 10){
        return `0${num}`;   
    } else {
        return num;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds'),
    timeInterval = setInterval(updateClock,1000);
    updateClock (); 
    function updateClock () {
        const t  = getTimeRemaining(endtime);
        days.innerHTML =getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

}
setClock('.timer', deadline);

//--------------MODAL--------------
const modalBtn = document.querySelectorAll('[data-modal]'),
      modalWindow = document.querySelector('.modal');
     

     function showModal() {
        modalWindow.classList.add("show");
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
      } 

     function closeModal() {
        modalWindow.classList.remove('show');
    modalWindow.classList.add("hide");
    document.body.style.overflow = '';
     } 
  
   
 modalBtn.forEach(btn => {
    btn.addEventListener('click',showModal);
});
   

    
modalWindow.addEventListener('click', (e) =>{
    if (e.target === modalWindow ||e.target.getAttribute('data-close') =='') {
        closeModal();
    }
});
  
document.addEventListener('keydown',(e) => {
if (e.code ==="Escape" && modalWindow.classList.contains('show')) {
    closeModal();
}
});

const modalTimerId = setTimeout(showModal, 50000);

function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll',showModalByScroll);
}
}

window.addEventListener('scroll',showModalByScroll);

// CARDS

class MenuCard {
    constructor (src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.transfer = 27;
        this.parent = document.querySelector(parentSelector);
        this.changeToUAH();
    } 
    changeToUAH () {
        this.price = this.price * this.transfer;
    }
    render() {
const element = document.createElement('div');
if (this.classes.length ===0) {
    this.element = "menu__item";
    element.classList.add(this.element);
} else {
this.classes.forEach(className => element.classList.add(className));
}
    element.innerHTML =`
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">????????:</div>
                    <div class="menu__item-total"><span>${this.price}</span> ??????/????????</div>
                </div>
            
    `;
    
this.parent.append(element);
    }
}
const getResource = async(url, data) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Could not fetch ${url}, status ${res.status}');
    }
    return await res.json();
};

getResource('http://localhost:3000/menu')
.then (data =>{
    data.forEach(({img, alt, title, descr, price})=>{
new MenuCard(img, alt, title, descr, price, '.menu .container').render();
    });
});
// getResource('http://localhost:3000/menu')
// .then(data => createCard(data)); 

// function createCard(data) {
//     data.forEach(({img, alt, title, descr, price})=> {
//     const element = document.createElement('div');
//     element.classList.add('menu__item');
//     element.innerHTML =`
//     <img src=${img} alt=${alt}>
//     <h3 class="menu__item-subtitle">${title}</h3>
//     <div class="menu__item-descr">${descr}</div>
//     <div class="menu__item-divider"></div>
//     <div class="menu__item-price">
//         <div class="menu__item-cost">????????:</div>
//         <div class="menu__item-total"><span>${price}</span> ??????/????????</div>
//     </div>
// `;
// document.querySelector('.menu .container').append(element);
//     });
// }

//  FORMS

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: '??????????????! ?????????? ???? ?? ???????? ????????????????',
    failure: '??????-???? ?????????? ???? ??????...'
};
forms.forEach(item => {
    bindPostData(item);
});

const postData = async(url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-type':'application/json'},
        body: data 
    });
    return await res.json();
    
};


function bindPostData (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: auto;
        `;
        //form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);
       
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries (formData.entries()));

                              
            postData('http://localhost:3000/requests', json)
                .then(data =>{
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=>{
                showThanksModal(message.failure);
            }).finally(()=>{
                form.reset(); 
            });
  
    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    showModal();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML =`
    <div class= "modal__content"> 
        <div class = "modal__close" data-close>??</div>
        <div class = "modal__title">${message}</div>
        </div>
    `;
document.querySelector('.modal').append(thanksModal);

setTimeout(()=>{
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    closeModal();
}, 4000);

}


fetch('http://localhost:3000/menu')
.then(data => data.json())
.then(res => console.log(res));




// SLIDER
let offset = 0;
let index = 1;
const slides = document.querySelectorAll('.offer__slide'),
        sliderPrev = document.querySelector('.offer__slider-prev'),
        sliderNext = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        sliderField = document.querySelector('.offer__slider-innner'),
        slider = document.querySelector('.offer__slider'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
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
//???????????? ?????????? ?????? ?????? css ?????????? ?????????????? ????????????????
      

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
            addZero();//????????????
        
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
    addZero();//????????????

    dotOpacity();    

    });

dots.forEach(dot => {
    dot.addEventListener('click',(e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        index = slideTo;
        offset = deleteNotDigits(width) * (slideTo -1);
        sliderField.style.transform = `translateX(-${offset}px)`;
    addZero();//????????????
       

    dotOpacity();   
    });

});

   
// CALC

let result = document.querySelector('.calculating__result span');
let sex = 'female', height, weight, age, ratio = 1.375;
if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
    

} else {
    ratio='1.375';
    localStorage.setItem('ratio',1.375);

}
if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  
} else {
    sex='female';
    localStorage.setItem('sex','female');
}

function initLocalSettinds(selector, activeClass) {
const elements = document.querySelectorAll('.calculating__choose-item');
elements.forEach(elem =>{
elem.classList.remove();
if (elem.getAttribute('id') === localStorage.getItem( 'sex') ) {
    elem.classList.add(activeClass);
}
if (elem.getAttribute('data-ratio') === localStorage.getItem( 'ratio') ) {
    elem.classList.add(activeClass);
}
});
}
initLocalSettinds('#gender div', 'calculating__choose-item_active');
initLocalSettinds('.calculating__choose_bigv div','calculating__choose-item_active');

function calc () {
    if (!sex || !height || !weight || !ratio) {
       result.textContent = "____";
       return;
     }
     if (sex ==='female') {
        result.textContent =Math.round((447.6 + (9.2 * weight) + (3.1 *height) - (4.3 * age)) * ratio);
     } else {
        result.textContent =Math.round((88.36 + (13.4 * weight) + (4.8 *height) - (5.7 *age)) * ratio);
     }
}
calc();

function getStaticDate(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem =>{
    elem.addEventListener('click',(e) => {
        if (e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', e.target.getAttribute('data-ratio') );
        } else {
            sex = e.target.getAttribute('id');
            localStorage.setItem('sex', e.target.getAttribute('id'));
        }
        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
        });
            e.target.classList.add(activeClass);
            calc();
    });
    });
}

getStaticDate('#gender div', 'calculating__choose-item_active');
getStaticDate('.calculating__choose_big div','calculating__choose-item_active');

function getDynamicDate(selector) {
const input = document.querySelector(selector);
input.addEventListener('input',() => {
  if (input.value.match(/\D/g )) {
      input.style.border = '1px solid red';
    } else {
        input.style.border = 'none';
switch(input.getAttribute('id')) {
    case "height":
        height = +input.value;
        break;
    case "weight":
        weight = +input.value;
        break;
    case "age":
        age = +input.value;
        break;
    }
}
calc();
});
}

getDynamicDate('#height');
getDynamicDate('#weight');
getDynamicDate('#age');





















});