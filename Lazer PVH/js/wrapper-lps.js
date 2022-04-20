const wrapper1 = document.querySelector("#lpswrapper");
const btnmoveright = document.querySelector(".lpsbtnright");
const btnmoveleft = document.querySelector(".lpsbtnleft");
const item = document.querySelector(".lpsitem");
btnmoveright.addEventListener('click', moveright);
btnmoveleft.addEventListener('click', moveleft);
let btnmoverightoffsetWidth = 0;
let btnmoveleftoffsetWidth = 0;
let mult = 0;
if (screen.width < 768){ 
    mult = 3;   
} else{
    mult = 5;
}
btnmoveleft.classList.add("invisible");



createSections();
sectionAppendChild(mult);


function moveright(){
    btnmoveleftoffsetWidth = btnmoveleftoffsetWidth + item.offsetWidth*mult;
    btnmoveleft.style.left = btnmoveleftoffsetWidth + "px";
    wrapper1.scrollLeft += item.offsetWidth*mult;
    btnmoverightoffsetWidth = btnmoverightoffsetWidth - item.offsetWidth*mult;
    btnmoveright.style.right = btnmoverightoffsetWidth + "px";
    if (btnmoveleftoffsetWidth > 0){
        btnmoveleft.classList.remove("invisible");
    }
    if (btnmoverightoffsetWidth <= (item.offsetWidth*10 - item.offsetWidth*20)){
        btnmoveright.classList.toggle("invisible");
    }
}

function moveleft(){
    btnmoverightoffsetWidth = btnmoverightoffsetWidth + item.offsetWidth*mult;
    btnmoveright.style.right = btnmoverightoffsetWidth + "px";
    if (btnmoverightoffsetWidth >= (item.offsetWidth*10 - item.offsetWidth*20)){
        btnmoveright.classList.remove("invisible");
    }
    wrapper1.scrollLeft -= item.offsetWidth*mult;
    btnmoveleftoffsetWidth = btnmoveleftoffsetWidth - item.offsetWidth*mult;
    if(btnmoveleftoffsetWidth <= 0){
        btnmoveleft.style.left = btnmoveleftoffsetWidth;
        btnmoveleft.classList.add("invisible");
    }else{
        btnmoveleft.style.left = btnmoveleftoffsetWidth + "px";
    }    
}


function createSections(){
    if (screen.width < 768){
        for(let i = 1; i <= 5; i++){
            const section = document.createElement("section");
            section.id = "section" + i;
            wrapper1.appendChild(section);
        }    
    }else{
        for(let i = 1; i <= 3; i++){
            const section = document.createElement("section");
            section.id = "section" + i;
            wrapper1.appendChild(section);
        }
    }
}

function sectionAppendChild(mult){
        if (screen.width < 768){
            console.log("mult3");
            const section1 = document.querySelector("#section1");
            const section2 = document.querySelector("#section2");
            const section3 = document.querySelector("#section3");
            const section4 = document.querySelector("#section4");
            const section5 = document.querySelector("#section5");
            const itens = document.querySelectorAll(".lpsitem");
            let cont = 1;
            section1.appendChild(btnmoveleft);
            itens.forEach((item) => {
                if(cont <= 3){
                    section1.appendChild(item);
                    cont++;
                }else{
                    if(cont <= 6){
                    section1.appendChild(btnmoveright);
                    section2.appendChild(item);
                    cont++;
                    console.log(cont);
                    }else{
                        if(cont <= 9){
                            section3.appendChild(item);
                            cont++;
                        }else{
                            if(cont <= 12){
                                section4.appendChild(item);
                                cont++;
                            }else{
                                section5.appendChild(item);
                                cont++;
                            }
                        }

                        }
                    }
              })
            }else{
                const section1 = document.querySelector("#section1");
                const section2 = document.querySelector("#section2");
                const section3 = document.querySelector("#section3");
                const itens = document.querySelectorAll(".lpsitem");
                let cont = 1;
                section1.appendChild(btnmoveleft);
                itens.forEach((item) => {
                    if(cont <= 5){
                        section1.appendChild(item);
                        cont++;
                    }else{
                        if(cont <= 10){
                        section1.appendChild(btnmoveright);
                        section2.appendChild(item);
                        cont++;
                        console.log(cont);
                        }else{
                            section3.appendChild(item);
                            cont++;
                            }
                        }
                  })
            }
    }