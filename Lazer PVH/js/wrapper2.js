// const btnmoveright = document.querySelector(".wrapperbtnright");
// const btnmoveleft = document.querySelector(".wrapperbtnleft");
const item = document.querySelector(".item");
// btnmoveright.addEventListener('click', moveright);
// btnmoveleft.addEventListener('click', moveleft);
let btnmoverightoffsetWidth = 0;
let btnmoveleftoffsetWidth = 0;
let mult = 0;
let numberOfSection = 0;
let numberOfWrappers = 1;
if (screen.width < 768){ 
    mult = 3;   
} else{
    mult = 5;
}
// btnmoveleft.classList.add("invisible");


createSections();
sectionAppendChild(mult);

createSections();
sectionAppendChild(mult);

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
    const wrapper1 = document.querySelector("#wrapper" + numberOfWrappers);
    if (screen.width < 768){
        for(let i = 1; i <= 5; i++){
            numberOfSection++;
            const section = document.createElement("section");
            section.id = "section" + numberOfSection;
            wrapper1.appendChild(section);
        }    
        section1 = document.querySelector("#section" + numberOfSection);
        section2 = document.querySelector("#section" + numberOfSection);
        section3 = document.querySelector("#section" + numberOfSection);
        section4 = document.querySelector("#section" + numberOfSection);
        section5 = document.querySelector("#section" + numberOfSection);
    }else{
        for(let i = 1; i <= 3; i++){
            numberOfSection++;
            const section = document.createElement("section");
            section.id = "section" + numberOfSection;
            wrapper1.appendChild(section);
        }
        section1 = document.querySelector("#section" + (numberOfSection-2));
        section2 = document.querySelector("#section" + (numberOfSection-1));
        section3 = document.querySelector("#section" + numberOfSection);
    }
    btnmoveleft = document.createElement("a");
    btnmoveright = document.createElement("a");
    btnmoveleft.classList.add("wrapperbtnleft");
    btnmoveleft.classList.add("wrapperbtn");
    btnmoveleft.classList.add("wrapperbtn" + numberOfWrappers);

    btnmoveright.classList.add("wrapperbtnright");
    btnmoveright.classList.add("wrapperbtn");
    btnmoveright.classList.add("wrapperbtn" + numberOfWrappers);
    numberOfWrappers++;
}

function sectionAppendChild(mult){
        if (screen.width < 768){
            const itens = document.querySelectorAll(".sec1");
            let cont = 1;
            // section1.appendChild(btnmoveleft);
            itens.forEach((item) => {
                if(cont <= 3){
                    section1.appendChild(item);
                    cont++;
                }else{
                    if(cont <= 6){
                    // section1.appendChild(btnmoveright);
                    section2.appendChild(item);
                    cont++;
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
                const itens = document.querySelectorAll(".sec" + (numberOfWrappers - 1));
                let cont = 1;
                // section1.appendChild(btnmoveleft);
                itens.forEach((item) => {
                    if(cont <= 5){
                        console.log(section1);
                        section1.appendChild(item);
                        cont++;
                    }else{
                        if(cont <= 10){
                        // section1.appendChild(btnmoveright);
                        section2.appendChild(item);
                        cont++;
                        }else{
                            section3.appendChild(item);
                            cont++;
                            }
                        }
                  })
            }
    }