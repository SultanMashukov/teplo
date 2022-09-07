{
    //Скрипт скроллера
    document.querySelector('.scroller__row').addEventListener('click', (e) => {
        let scrollerItem = null;

        if(e.target.classList.contains('scroller__item')){
            scrollerItem = e.target;
        }else if(e.target.closest('.scroller__item')){
            scrollerItem = e.target.closest('.scroller__item');
        }
        
        if(!scrollerItem)
            return;
        
        const transformVal = 54 * (scrollerItem.dataset.number-1)
        document.querySelector('.scroller__row').querySelectorAll('.scroller__item').forEach((item) => {
            item.classList.remove('scroller__item--active')
        })
        scrollerItem.classList.toggle('scroller__item--active')
        document.querySelector('.scroller__indicator').style.transform = `translateY(${transformVal}px)`;
        document.querySelector(`.screen${scrollerItem.dataset.number}`).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}


{
    //скрипт шапки при скролле
    //Скрывает меню при скролле вверх, и отбражает при скролле вниз
    const elHeader = document.querySelector('.header__inner');
    let currentScrollPostion = document.documentElement.scrollTop;
    window.addEventListener('scroll',function () {
        const scrollPostion = document.documentElement.scrollTop;
        //Включение и выключение уменьшенной версии шапки
        if((scrollPostion > 50) && !elHeader.classList.contains('header__inner--fixed')){
            elHeader.classList.add('header__inner--fixed')
        }else if((scrollPostion < 50) && elHeader.classList.contains('header__inner--fixed')){
            elHeader.classList.remove('header__inner--fixed')
        }
        //Включение и выключение видимости шапки при скролле
        if(currentScrollPostion > scrollPostion){
            elHeader.classList.remove('header__inner--hidden')
        }
        else{
            elHeader.classList.add('header__inner--hidden')
        }
        currentScrollPostion = scrollPostion; 
    })
}

{
    //скрипты мобильного меню
    document.querySelector('.mobileHaeder__toggleMenu').addEventListener('click',function(){
        document.querySelector('.hamburger-menu').classList.toggle('animate');
        document.body.classList.toggle('scrollBlocked');
        document.querySelector('.header__content').classList.toggle('header__content--active');
        
    })

}

{
    document.querySelector('.goToStart').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.header').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

//слайдер цен на телефонах
{
    let priceSliders = null;
    const sliderOptions = {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        initialSlide: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            
        },
        navigation: {
            nextEl: '.prices__sliderArrow--next',
            prevEl: '.prices__sliderArrow--prev',
        },
    }

    if(window.innerWidth < 768){
        priceSliders = new Swiper('.swiper', sliderOptions)
    }
    
    //монтаж/демонтаж слайдеров при ресайзе
    window.addEventListener('resize',(e) => {
        if( (window.innerWidth < 768) && !priceSliders ){
            priceSliders = new Swiper('.swiper', sliderOptions)
        }else if((window.innerWidth > 768) && priceSliders){
            priceSliders.forEach((el) => {
                el.destroy()
            })
            priceSliders = null;
        }
    })
    
}