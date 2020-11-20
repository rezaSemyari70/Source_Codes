class slider  {

    sliderIndex = 1;

    constructor(options){
        this.options = options;
        this.initialStuff();
        this.createNextAndPrevButtons();
        this.createDots();
        this.showSlides(1);
        this.autoChangeSlide();
    }

    initialStuff = ()=> {
        let {el : sliderElement , sliderClass , auto} = this.options
        if(!sliderElement) throw Error("slider element is not exist")
        Number.isInteger(auto) ? this.auto = auto : this.auto = 0 
        this.sliders = [...sliderElement.children].filter(element => element.classList.contains(sliderClass) )
    }

    createNextAndPrevButtons(){
        let {el : sliderElement} = this.options;
        sliderElement.insertAdjacentHTML('afterbegin' , `
            <a class="next">&#10094</a>
            <a class="prev">&#10095</a>
        `)

        sliderElement.querySelector('.next').addEventListener('click' , () => this.changeSlider(this.sliderIndex += 1))
        sliderElement.querySelector('.prev').addEventListener('click' , () => this.changeSlider(this.sliderIndex -= 1))
    }

    changeSlider(n){
        this.resetInterval();
        this.showSlides(  n )
    }

    currentSlider = n => {
        this.resetInterval();
        this.showSlides( this.sliderIndex = n );
    }

    createDots(){
        let { el : sliderElement , currentSlider} = this.options;
        
        let dotElements = [...this.sliders].map((slider , index)=> `<span class="dot" data-slide=${index + 1}></span>` );
        let dots = document.createElement('div');
        dots.classList.add('dots');
        dots.innerHTML = `${dotElements.join('')}`;

        sliderElement.after(dots);
        this.dots = dots.querySelectorAll('.dot');
        this.dots.forEach(dot => dot.addEventListener('click' , e => this.currentSlider(parseInt(e.target.dataset.slide)) ))
    }

    showSlides(number){
        let { el : sliderElement , sliderClass , currentSlider , auto } = this.options;

        if(number > this.sliders.length) this.sliderIndex = 1 ;
        if(number < 1) this.sliderIndex = this.sliders.length ;

        sliderElement.querySelector(`.${sliderClass}.active`).classList.remove('active');
        this.dots.forEach(dot => dot.classList.remove('active'));

        this.sliders[this.sliderIndex -1].classList.add('active');
        this.dots[this.sliderIndex -1].classList.add('active');

        if(currentSlider) currentSlider(this.sliders[this.sliderIndex -1])
        
    }

    autoChangeSlide(){
        if(this.auto !== 0){
            this.intervalId = setInterval(() => this.showSlides(this.sliderIndex += 1), this.auto);
        }
    }

    resetInterval(){
        clearInterval(this.intervalId);
        this.autoChangeSlide();
    }
    
}




