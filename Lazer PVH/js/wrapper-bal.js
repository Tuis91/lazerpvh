const balwrapper = document.querySelector("#balwrapper");
const balbtnright = document.querySelector(".balbtnright");
const balbtnleft = document.querySelector(".balbtnleft");
const balitem = document.querySelector(".balitem");
balbtnright.addEventListener('click', moveright);
balbtnleft.addEventListener('click', moveleft);
let balbtnrightoffsetWidth = 0;
let balbtnleftoffsetWidth = 0;
if (screen.width < 768){ 
    mult = 3;   
} else{
    mult = 5;
}
balbtnleft.classList.add("invisible");



createBalSections();
sectionBalAppendChild(mult);


function moveright(event){
    event.preventDefault();
    balbtnleftoffsetWidth = balbtnleftoffsetWidth + balitem.offsetWidth*mult;
    balbtnleft.style.left = balbtnleftoffsetWidth + "px";
    balwrapper.scrollLeft += balitem.offsetWidth*mult;
    balbtnrightoffsetWidth = balbtnrightoffsetWidth - balitem.offsetWidth*mult;
    balbtnright.style.right = balbtnrightoffsetWidth + "px";
    if (balbtnleftoffsetWidth > 0){
        balbtnleft.classList.remove("invisible");
    }
    if (balbtnrightoffsetWidth <= (balitem.offsetWidth*10 - balitem.offsetWidth*20)){
        balbtnright.classList.toggle("invisible");
    }
}

function moveleft(){
    balbtnrightoffsetWidth = balbtnrightoffsetWidth + balitem.offsetWidth*mult;
    balbtnright.style.right = balbtnrightoffsetWidth + "px";
    if (balbtnrightoffsetWidth >= (balitem.offsetWidth*10 - balitem.offsetWidth*20)){
        balbtnright.classList.remove("invisible");
    }
    balwrapper.scrollLeft -= balitem.offsetWidth*mult;
    balbtnleftoffsetWidth = balbtnleftoffsetWidth - balitem.offsetWidth*mult;
    if(balbtnleftoffsetWidth <= 0){
        balbtnleft.style.left = balbtnleftoffsetWidth;
        balbtnleft.classList.add("invisible");
    }else{
        balbtnleft.style.left = balbtnleftoffsetWidth + "px";
    }    
}


function createBalSections(){
    if (screen.width < 768){
        for(let i = 1; i <= 5; i++){
            const section = document.createElement("section");
            section.id = "balsection" + i;
            balwrapper.appendChild(section);
        }    
    }else{
        for(let i = 1; i <= 3; i++){
            const section = document.createElement("section");
            section.id = "balsection" + i;
            balwrapper.appendChild(section);
        }
    }
}

function sectionBalAppendChild(mult){
        if (screen.width < 768){
            console.log("mult3");
            const section1 = document.querySelector("#balsection1");
            const section2 = document.querySelector("#balsection2");
            const section3 = document.querySelector("#balsection3");
            const section4 = document.querySelector("#balsection4");
            const section5 = document.querySelector("#balsection5");
            const itens = document.querySelectorAll(".balitem");
            let cont = 1;
            section1.appendChild(balbtnleft);
            itens.forEach((balitem) => {
                if(cont <= 3){
                    section1.appendChild(balitem);
                    cont++;
                }else{
                    if(cont <= 6){
                    section1.appendChild(balbtnright);
                    section2.appendChild(balitem);
                    cont++;
                    console.log(cont);
                    }else{
                        if(cont <= 9){
                            section3.appendChild(balitem);
                            cont++;
                        }else{
                            if(cont <= 12){
                                section4.appendChild(balitem);
                                cont++;
                            }else{
                                section5.appendChild(balitem);
                                cont++;
                            }
                        }

                        }
                    }
              })
            }else{
                const section1 = document.querySelector("#balsection1");
                const section2 = document.querySelector("#balsection2");
                const section3 = document.querySelector("#balsection3");
                const balitens = document.querySelectorAll(".balitem");
                cont = 1;
                section1.appendChild(balbtnleft);
                balitens.forEach((balitem) => {
                    if(cont <= 5){
                        section1.appendChild(balitem);
                        cont++;
                    }else{
                        if(cont <= 10){
                        section1.appendChild(balbtnright);
                        section2.appendChild(balitem);
                        cont++;
                        console.log(cont);
                        }else{
                            section3.appendChild(balitem);
                            cont++;
                            }
                        }
                  })
            }
    }