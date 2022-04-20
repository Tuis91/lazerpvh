const img = document.querySelector(".hero-img");
const listaImgs = ["img/hero.jpg", "img/jalapao.jpg", "img/pista.jpg", "img/banho.png"];
const herolinks = ["img/jalapao.png", "img/salsalito.png", "img/pista.png", "img/banho.png"];
const sliderPosition = document.querySelector(".sliderposition");
const sliderContainer = document.querySelector("#slider-container");
const btnleft = document.querySelector("#btnleft");
const btnright = document.querySelector("#btnright");
const move = document.querySelectorAll(".move");
const herolink = document.querySelector(".herolink");
let time = 0;
let pos = 0;
let u = 0;
let o = 0;
img.src = listaImgs[pos]
img.classList.toggle("visible");



function next(){   
    img.classList.toggle("visible");
    setTimeout(() => {
        if (pos >= listaImgs.length - 1) {
            sliderPositions[pos].classList.remove("btnactive");              
            pos = 0;
            sliderPositions[pos].classList.toggle("btnactive");
            img.src = listaImgs[pos]
            herolink.href = herolinks[pos];
        }else{        
            sliderPositions[pos].classList.remove("btnactive");
            pos++;
            sliderPositions[pos].classList.toggle("btnactive");
            img.src = listaImgs[pos]        
            herolink.href = herolinks[pos];  
        }
        time = 0;
        herotimer.style.width = time + "%";
        img.classList.toggle("visible");
    }, 500);
}

function prev(){
    img.classList.toggle("visible");
    setTimeout(() => {
        if (pos <= 0) {
            sliderPositions[pos].classList.remove("btnactive");
            pos = listaImgs.length - 1;      
            sliderPositions[pos].classList.toggle("btnactive");
            img.src = listaImgs[pos]
            herolink.href = herolinks[pos];
        }else{
            sliderPositions[pos].classList.remove("btnactive");
            pos--;
            sliderPositions[pos].classList.toggle("btnactive");
            img.src = listaImgs[pos];
            herolink.href = herolinks[pos];
        }
        time = 0;
        herotimer.style.width = time + "%";
        img.classList.toggle("visible");
    }, 500);    
    
}


let hero = setInterval(() => {timer();}, 70);
let herotimer = document.querySelector(".herotimer");
sliderContainer.addEventListener('mouseover', pausehero);
sliderContainer.addEventListener('mouseout', backhero);

function pausehero (e) {
    togglevisible();
    clearInterval(hero);
}

function backhero (e) {
    togglevisible();
    clearInterval(hero);
    hero = setInterval(() => {timer();}, 70);
}

function togglevisible(){
    sliderPosition.classList.toggle("visible");
    move[0].classList.toggle("visible");
    move[1].classList.toggle("visible");
    btnleft.classList.toggle("visible");
    btnright.classList.toggle("visible");
}

function timer() {
    if (time >= 80){
        next();
        time = 1;
    }else{
        herotimer.style.width = time + "%";
        time++;
    }
}

// Ajustar altura dos botões laterais
move.forEach((item) => {
    item.style.height = img.height +"px";
});

move[0].addEventListener('click', prev);
move[1].addEventListener('click', next);

move[1].style.right = img.offsetLeft + "px";

//Adicionar botões por imagem
listaImgs.forEach((item) => {
    const btn = document.createElement("button");
    btn.classList.add("btnPosition");
    btn.id = "btn" + o;
    sliderPosition.appendChild(btn);
    o++;
});

const sliderPositions = document.querySelectorAll(".btnPosition");
let i = 0;
sliderPositions.forEach((item) => {
    sliderPositions[i].addEventListener('click', toogleactive);
    i++;
});

reposition();
function toogleactive (e) {    
    u = 0;
    sliderPositions.forEach((item) => {
        if (e.srcElement === item){
            img.classList.toggle("visible");   
            pos = u;
            item.classList.add("btnactive");
            setTimeout(() => {
                img.src = listaImgs[pos]
                herolink.href = herolinks[pos];
                time = 0;
                herotimer.style.width = time + "%";
                img.classList.toggle("visible");
            }, 500);
        }else{
           item.classList.remove("btnactive");
        }
        u++;
    });        
}
sliderPositions[0].classList.add("btnactive");

window.addEventListener('resize', reposition);

function reposition(e) {
    btnleft.style.top = img.offsetTop + (img.height/2) - 20 + "px";
    btnright.style.top = img.offsetTop + (img.height/2) - 20 + "px";
    btnleft.style.left = img.offsetLeft + 20 + "px";
    btnright.style.right = img.offsetLeft + 20 + "px";
    move.forEach((item) => {
        item.style.height = img.height +"px";
    });
    move[1].style.right = img.offsetLeft + "px";
    sliderPosition.style.top = img.offsetTop + img.height - 40 + "px";
    sliderPosition.style.left = img.offsetLeft + (img.width/2) - (sliderPosition.getBoundingClientRect().width / 2) + "px";
}