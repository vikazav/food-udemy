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
      modalWindow = document.querySelector('.modal'),
      closeBtn = document.querySelector('[data-close]');

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
   
closeBtn.addEventListener('click',closeModal);
    
modalWindow.addEventListener('click', (e) =>{
    if (e.target === modalWindow) {
        closeModal();
    }
});
  
document.addEventListener('keydown',(e) => {
if (e.code ==="Escape" && modalWindow.classList.contains('show')) {
    closeModal();
}
});

//const modalTimerId = setTimeout(showModal, 3000);

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
    loadind: 'Loading...',
    success: 'Success!',
    failure: 'Failure(('
};
forms.forEach(item => {
    postData(item);
});

function postData (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loadind;
        form.append(statusMessage);

        const r = new XMLHttpRequest();
        r.open('POST', 'server.php');
        const formData = new FormData(form);
        //r.setRequestHeader('Content-type', 'mbltipart/form-data');
        r.send(formData);
        r.addEventListener('load', () => {
            if (r.status === 200) {
                console.log(r.response);
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
            } else {
                statusMessage.textContent = message.failure;
            }
        });
    
});


}
});
