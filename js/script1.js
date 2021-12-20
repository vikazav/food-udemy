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
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            
    `;
this.parent.append(element);
    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container",
   
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "vegy",
    'Меню “Премиум”',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    11,
    ".menu .container",
  
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "vegy",
    'Меню "Постное"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    7,
    ".menu .container",
      
).render();

//  FORMS

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};
forms.forEach(item => {
    postData(item);
});

function postData (form) {
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
        // const object = {};
        // formData.forEach(function(value, key) {
        //     object[key] = value;
        // });
        // const json = JSON.stringify(object);
               
        fetch('server.php', {
            method: 'POST',
            // headers: {'Content-type':'application/json'},
            body: formData
            }).then(data =>data.text())
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
        <div class = "modal__close" data-close>×</div>
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



});
