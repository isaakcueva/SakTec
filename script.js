let darkmode= document.querySelector('#darkmode');

darkmode.onclick=()=>{
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace('bx-moon', 'bx-sun');
        document.body.classList.add('color');
    }else{
        darkmode.classList.replace('bx-sun', 'bx-moon');
        document.body.classList.remove('color');
    }
};

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('open');
};
const sr= ScrollReveal({
    distance: '70px',
    duration: 2700,
    reset: true
});

sr.reveal('.hero-text',{delay:200, origin: 'bottom'});
sr.reveal('.hero-img',{delay:350, origin: 'top'});
sr.reveal('.down-arrow',{delay:450, origin: 'right'});
sr.reveal('.gallery-img-1', { delay: 200, origin: 'left' });
sr.reveal('.gallery-img-2', { delay: 350, origin: 'top' });
sr.reveal('.gallery-img-3', { delay: 450, origin: 'right' });
sr.reveal('.gallery-img-4', { delay: 450, origin: 'right' });
sr.reveal('.gallery-img-5', { delay: 450, origin: 'bottom' });
sr.reveal('.celulares-container', { delay: 200, origin: 'bottom' });
sr.reveal('.brand-title', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-1', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-2', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-3', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-4', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-5', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-6', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-7', { delay: 200, origin: 'bottom' });
sr.reveal('.celular-img-8', { delay: 200, origin: 'bottom' });

sr.reveal('.tablet-img-1', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-2', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-3', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-4', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-5', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-6', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-7', { delay: 200, origin: 'bottom' });
sr.reveal('.tablet-img-8', { delay: 200, origin: 'bottom' });

sr.reveal('.acc-img-1', { delay: 200, origin: 'bottom' });
sr.reveal('.acc-img-2', { delay: 200, origin: 'bottom' });
sr.reveal('.acc-img-3', { delay: 200, origin: 'bottom' });
sr.reveal('.acc-img-4', { delay: 200, origin: 'bottom' });

const downArrow = document.querySelector('.down-arrow');

downArrow.addEventListener('click', () => {
    // Obtiene el elemento del footer por su identificador
    const footer = document.getElementById('miFooter');

    // Usa el método `scrollIntoView` para desplazarte hasta el footer
    footer.scrollIntoView({ behavior: 'smooth' });
});




