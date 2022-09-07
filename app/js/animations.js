//Регистрация эффекта анимированного счетчика
gsap.registerEffect({
    name: "counter",
    extendTimeline: true,
    defaults: {
        end: 0,
        duration: 0.5,
        ease: "power1",
        increment: 1,
    },
    effect: (targets, config) => {
        let tl = gsap.timeline()
        let num = targets[0].innerText.replace(/\,/g, '')
        targets[0].innerText = num

        tl.to(targets, {
            duration: config.duration,
            innerText: config.end,
            //snap:{innerText:config.increment},
            modifiers: {
                innerText: function (innerText) {
                    return gsap.utils.snap(config.increment, innerText).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            },
            ease: config.ease
        }, 0)

        return tl
    }
})

ScrollTrigger.matchMedia({
    "(max-width: 768px)": function () {
        //АНИМАЦИИ техники
        {
            const trucks = document.querySelector('.trucks__photos');
            const trucksImgs = trucks.querySelectorAll('img');
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: trucks,
                    start: "top 70%",//"top 30%"
                    end: "bottom 80%",
                    //markers: true,
                    scrub: 1,
                    toggleActions: "play none none none",
                }
            })

            timeline.from(trucksImgs[0], {
                x: '100px',
                duration: 1,
                
            })

            timeline.from(trucksImgs[1], {
                x: '100px',
                duration: 1,
            }, '-=1')
        }
         //АНИМАЦИИ блока методов
        {
            //счетчики
            const methodsBenifits = document.querySelector('.methodsBenifits');
            const methodsBenifitsItems = methodsBenifits.querySelectorAll('.methodsBenifits__valueNum');
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: methodsBenifits,
                    start: "top 80%",
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            timeline.counter(methodsBenifitsItems[0], {
                end:5, 
                increment:1, 
                duration:1
            },)
            timeline.counter(methodsBenifitsItems[1], {
                end:10, 
                increment:1, 
                duration:1
            },'-=1')
        }
    },
    "(min-width: 768px)": function () {
        //АНИМАЦИИ баннеров с сотрудниками (оба банера)
        {
            const manBanners = document.querySelectorAll('.manBanner');
            manBanners.forEach((el) => {
                const manImg = el.querySelector('.manBanner__img')
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: "top 60%",
                        end: "bottom 20%",
                        //markers: true,
                        //scrub: 1,
                        toggleActions: "play none none none",
                    }
                })
                timeline.from(manImg, {
                    y: '-60px',
                    opacity: '0',
                    duration: 1,
                })
            })
        }

        //АНИМАЦИИ БЛОКА 1
        {
            const screen_1 = document.querySelector('.firstScreen');
            const title_1 = screen_1.querySelector('[data-anim-order="1"]');
            const title_2 = screen_1.querySelector('[data-anim-order="2"]');
            const benefit_1 = screen_1.querySelector('[data-anim-order="3"]');
            const benefit_2 = screen_1.querySelector('[data-anim-order="4"]');

            const screen_1_timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: screen_1,
                    start: "-50% bottom",
                    end: "top 20%",
                    //markers: true,
                    // scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            screen_1_timeline.from(title_1, {
                y: '-60px',
                opacity: '0',
                duration: .6,
            })
            screen_1_timeline.from(title_2, {
                x: '-80px',
                opacity: '0',
                duration: .6,
            })
            screen_1_timeline.from(benefit_1, {
                opacity: '0',
                duration: .6,
            })
            screen_1_timeline.from(benefit_2, {
                opacity: '0',
                duration: .6,
            })

        }
        //АНИМАЦИИ ОПЫТА
        {
            const experience = document.querySelector('.experience');
            const experienceItems = experience.querySelectorAll('.experience__eventsItem');
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: experience,
                    start: "top 80%",//"top 30%"
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            experienceItems.forEach((el) => {
                timeline.from(el, {
                    opacity: '0',
                    duration: .3,
                })
            })
        }
        //АНИМАЦИИ ПРЕИМУЩЕСТВ
        {
            const benifits = document.querySelector('.screen2 .benifits');
            const benifitsIcons = benifits.querySelectorAll('.benifits__itemIconWrap');
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: benifits,
                    start: "top 80%",//
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            const timeDelayArr = [.5, 1.5, 2.5, 0, 2, 1] //Смещения задержек,для имитации рандома
            benifitsIcons.forEach((el, index) => {
                timeline.from(el, {
                    x: '-20px',
                    opacity: '0',
                    duration: .3,
                }, `-=${timeDelayArr[index]}`)
            })
        }
        //АНИМАЦИИ после нашей работы
        {
            const afterWork = document.querySelector('.afterWork__row');
            const afterWorkLeft = afterWork.querySelectorAll('.afterWork__item--left');
            const afterWorkRight = afterWork.querySelectorAll('.afterWork__item--right');
            const leaf_1 = afterWork.querySelectorAll('.afterWork__shape--5');
            const leaf_2 = afterWork.querySelectorAll('.afterWork__shape--6');

            const blocksTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: afterWork,
                    start: "top 80%",//
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            const leafsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: afterWork,
                    start: "-30% 80%",//
                    end: "130% top",
                    //markers: true,
                    scrub: 1,
                    toggleActions: "play none none none",
                }
            })

            blocksTimeline.from(afterWorkLeft, {
                y: '-40px',
                opacity: '0',
                duration: .6,
            })

            blocksTimeline.from(afterWorkRight, {
                x: '40px',
                opacity: '0',
                duration: .6,
            })

            leafsTimeline.from(leaf_1, {
                rotate: '180',
                duration: .6,
            })
            leafsTimeline.from(leaf_2, {
                rotate: '180',
                duration: .6,
            }, '-=.6')
        }
        //АНИМАЦИИ техники
        {
            const trucks = document.querySelector('.trucks__photos');
            const trucksImgs = trucks.querySelectorAll('img');
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: trucks,
                    start: "top 70%",//"top 30%"
                    end: "bottom 80%",
                    //markers: true,
                    scrub: 1,
                    toggleActions: "play none none none",
                }
            })

            timeline.from(trucksImgs[2], {
                x: '300px',
                opacity: '0',
                duration: 1,
            })

            timeline.from(trucksImgs[0], {
                opacity: '0',
                duration: 1,
                delay: 1,
            })

            timeline.to(trucksImgs[2], {
                opacity: '0',
                duration: 1,
            }, '-=1')

            timeline.from(trucksImgs[3], {
                opacity: '0',
                duration: 1,
            })

        }
        //АНИМАЦИИ блока методов
        {
            //счетчики
            const methodsBenifits = document.querySelector('.methodsBenifits');
            const methodsBenifitsItems = methodsBenifits.querySelectorAll('.methodsBenifits__valueNum');
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: methodsBenifits,
                    start: "top 80%",
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            timeline.counter(methodsBenifitsItems[0], {
                end:5, 
                increment:1, 
                duration:1
            },)
            timeline.counter(methodsBenifitsItems[1], {
                end:10, 
                increment:1, 
                duration:1
            },'-=1')

            //Появляющиеся номера методов
            const methodsRow  = document.querySelector('.methods__row');
            const methodsNumbers = methodsRow.querySelectorAll('.methods__number')
            const methodsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: methodsRow,
                    start: "top 30%",
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            methodsNumbers.forEach((el) => {
                methodsTimeline.from(el, {
                    opacity: '0',
                    duration: .3,
                }) 
            })

        }
        //АНИМАЦИИ блока результатов
        {
            //анимация результатов
            const resultsRow= document.querySelector('.results__row');
            const resultsItems= resultsRow.querySelectorAll('.results__item');

            const itemsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: resultsRow,
                    start: "top 80%",//
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            
            resultsItems.forEach((el) => {
                itemsTimeline.from(el, {
                    opacity: '0',
                    duration: .1,
                })
            })

            //анимация листочков
            const rightBlock = document.querySelector('.results__right');
            const leaf_1 = rightBlock.querySelectorAll('.results__shape--1');
            const leaf_2 = rightBlock.querySelectorAll('.results__shape--2');

            const leafsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: rightBlock,
                    start: "-30% 80%",//
                    end: "130% top",
                    //markers: true,
                    scrub: 1,
                    toggleActions: "play none none none",
                }
            })

            leafsTimeline.from(leaf_1, {
                rotate: '80',
                duration: .6,
            })
            leafsTimeline.from(leaf_2, {
                rotate: '80',
                duration: .6,
            }, '-=.6')
        }
        //АНИМАЦИИ блока сроков
        {
            const fastWork= document.querySelector('.fastWork');
            const fastWorkItems= fastWork.querySelectorAll('.fastWork__item');

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: fastWork,
                    start: "top 80%",//
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })
            
            fastWorkItems.forEach((el) => {
                const elText = el.querySelector('.fastWork__itemInfo')
                timeline.from(el, {
                    x: '-60px',
                    opacity: '0',
                    duration: .1,
                })
                timeline.from(elText, {
                    opacity: '0',
                    duration: .2,
                    
                })
            })
        }
        //АНИМАЦИИ блока как мы работаем
        {
            //первая стадия
            const stage_1 = document.querySelector('.howWeDo__stage--1');
            const stage_1_title = stage_1.querySelector('.howWeDo__stageTitle');
            const stage_1_items = stage_1.querySelectorAll('.howWeDo__item')
            let stage_1_order = null // последоваьельность закраски блоков

            if(window.innerWidth >= 1201){
                stage_1_order = [0,1,2,5,4,3,6,7]
            }else if(window.innerWidth >= 817){
                stage_1_order =  [0,1,2,5,4,3,7,6]
            }else if(window.innerWidth >= 320){
                stage_1_order = [0,1,2,3,4,5,6,7]
            }
            
            const stage_1_timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: stage_1,
                    start: "top 80%",//
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })

            stage_1_timeline.from(stage_1_title, {
                opacity : '0',
                duration: .4,
            })

            stage_1_order.forEach((orderNumber) => {
                stage_1_timeline.from(stage_1_items[orderNumber], {
                    backgroundColor : 'transparent',
                    x:  [5,4,3].includes(orderNumber) ? '40px' : '-40px',
                    duration: .4,
                })
            })

            //вторая стадия
            const stage_2 = document.querySelector('.howWeDo__stage--2');
            const stage_2_title = stage_2.querySelector('.howWeDo__stageTitle');
            const stage_2_items = stage_2.querySelectorAll('.howWeDo__item')
            let stage_2_order = null;

            if(window.innerWidth >= 1201){
                stage_2_order = [0,1,2,5,4]
            }else if(window.innerWidth >= 817){
                stage_2_order =  [0,1,5,2,4]
            }else if(window.innerWidth >= 320){
                stage_2_order = [0,1,2,4,5]
            }

            const stage_2_timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: stage_2,
                    start: "top 80%",//
                    end: "bottom 50%",
                    //markers: true,
                    //scrub: 1,
                    toggleActions: "play none none none",
                }
            })

            stage_2_timeline.from(stage_2_title, {
                opacity : '0',
                duration: .4,
            })

            stage_2_order.forEach((orderNumber) => {
                stage_2_timeline.from(stage_2_items[orderNumber], {
                    backgroundColor : 'transparent',
                    x:  [5,4].includes(orderNumber) ? '40px' : '-40px',
                    duration: .4,
                })
            })
        }
    },
})