
 function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
modalWindow.classList.add("hide");
document.body.style.overflow = '';
 } 
 
function showModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add("show");
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  } 



function modal(triggerSelector, modalSelector, modalTimerId) {

const modalBtn = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector);
     
   modalBtn.forEach(btn => {
    btn.addEventListener('click', ()=> showModal(modalSelector,modalTimerId));
});
   

modalWindow.addEventListener('click', (e) =>{
    if (e.target === modalWindow ||e.target.getAttribute('data-close') =='') {
        closeModal(modalSelector);
    }
});
  
document.addEventListener('keydown',(e) => {
if (e.code ==="Escape" && modalWindow.classList.contains('show')) {
    closeModal(modalSelector);
}
});



function showModalByScroll () {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal(modalSelector,modalTimerId);
        window.removeEventListener('scroll',showModalByScroll);
}
}

window.addEventListener('scroll',showModalByScroll);


}

export default modal;
export {showModal};
export {closeModal};