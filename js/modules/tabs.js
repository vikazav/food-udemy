function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  //----------------TABS----------------------



    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

        function hideTabcontent () {
            tabsContent.forEach(item =>{
                item.style.display = "none";
            });
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
        function showTabContent (i = 0) {
            tabsContent[i].style.display = "block";
            tabs[i].classList.add(activeClass);
        }
      
        hideTabcontent ();
        showTabContent ();
tabsParent.addEventListener('click',(event) => {
    const target = event.target;
    if (target && target.classList.contains(tabsSelector.slice(1))) {  //видаляєм . з селектора класу який є в аргументі
        tabs.forEach((item,i) => {
        if (target == item){
            hideTabcontent ();
            showTabContent (i);
        }
        });
    }

});  
}

export default tabs;