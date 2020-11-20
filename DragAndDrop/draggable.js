class draggable {

    update;
    constructor(options) {
        this.setupList(options);

        for (let listItem of options.el.children) {
            this.addDragAndDropHandler(listItem)
        }

        this.update = options.update;
    }




    setupList = (options) => {
        let { el: element, list, template} = options;

        if (!element) throw Error("the element is not exist!");
        if (!list) throw Error("the list is not exist!");
        if (!Array.isArray(list)) throw Error("the list is not 'Array', please enter array");
        if (!template) throw Error("the template is not exist!")
        if (typeof (template) != 'function') throw Error("the typeof 'template' must be function")

        list.forEach(item => element.innerHTML += template(item))
    }



    addDragAndDropHandler(element) {
        element.setAttribute('draggable', true);

        // element.addEventListener('drag', this.handleDrag.bind(this))
        element.addEventListener('dragstart',  this.handleDragStart.bind(this))
        element.addEventListener('dragenter',  this.handleDragEnter.bind(this))
        element.addEventListener('dragover',  this.handleDragOver.bind(this))
        element.addEventListener('dragleave',  this.handleDragLeave.bind(this))
        element.addEventListener('drop',  this.handleDragDrop.bind(this))
        element.addEventListener('dragend',  this.handleDragEnd.bind(this))

    }

    handleDragStart(element) {
        this.dragSourceEl = element.target;
        
        element.dataTransfer.setData('text/html' , element.target.outerHTML);
        element.target.classList.add('dragElem')
    }

   

    handleDragEnd = (element) => {
        element.target.classList.remove('dragElem');
    }

    handleDragEnter = (element) => {
        
    }

    handleDragOver = (element) => {
        if(element.preventDefault) element.preventDefault();
        element.target.classList.add('over')
    }

    
    handleDragDrop = (element) => {
        let target = element.target.closest('.list-item');
        
        target.parentNode.removeChild(this.dragSourceEl)
        let dropHTML = element.dataTransfer.getData('text/html');
        target.insertAdjacentHTML('beforebegin' , dropHTML);

        this.addDragAndDropHandler(target.previousSibling);
        element.target.classList.remove('over');

    }

    handleDragLeave = (element) => {
        element.target.classList.remove('over')
    }

}