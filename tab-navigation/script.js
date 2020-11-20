// let selectContent = document.querySelector('.cd-tabs-content li.selected');
let navigates = document.querySelectorAll('.cd-tabs-navigation li a');

navigates.forEach(nav => {
    nav.addEventListener('click' , function(e){
        e.preventDefault();
        document.querySelector('.cd-tabs-navigation li a.selected').classList.remove('selected');
        this.classList.add('selected');

        let textContent = this.getAttribute('data-content');

        document.querySelector('.cd-tabs-content li.selected').classList.remove('selected');
        document.querySelector(`.cd-tabs-content li[data-content = ${textContent}]`).classList.add('selected')
        
    })
}) 