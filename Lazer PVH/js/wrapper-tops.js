const topswrapper = document.querySelector("#topswrapper");
const topsbtnright = document.querySelector(".topsbtnright");
const topsbtnleft = document.querySelector(".topsbtnleft");
const topsitem = document.querySelector(".topsitem");
topsbtnright.addEventListener('click', moveright);
topsbtnleft.addEventListener('click', moveleft);
let topsbtnrightoffsetWidth = 0;
let topsbtnleftoffsetWidth = 0;
if (screen.width < 768){ 
    mult = 3;   
} else{
    mult = 5;
}
topsbtnleft.classList.add("invisible");



createtopsSections();
sectiontopsAppendChild(mult);


function moveright(){
    topsbtnleftoffsetWidth = topsbtnleftoffsetWidth + topsitem.offsetWidth*mult;
    topsbtnleft.style.left = topsbtnleftoffsetWidth + "px";
    topswrapper.scrollLeft += topsitem.offsetWidth*mult;
    topsbtnrightoffsetWidth = topsbtnrightoffsetWidth - topsitem.offsetWidth*mult;
    topsbtnright.style.right = topsbtnrightoffsetWidth + "px";
    if (topsbtnleftoffsetWidth > 0){
        topsbtnleft.classList.remove("invisible");
    }
    if (topsbtnrightoffsetWidth <= (topsitem.offsetWidth*10 - topsitem.offsetWidth*20)){
        topsbtnright.classList.toggle("invisible");
    }
}

function moveleft(){
    topsbtnrightoffsetWidth = topsbtnrightoffsetWidth + topsitem.offsetWidth*mult;
    topsbtnright.style.right = topsbtnrightoffsetWidth + "px";
    if (topsbtnrightoffsetWidth >= (topsitem.offsetWidth*10 - topsitem.offsetWidth*20)){
        topsbtnright.classList.remove("invisible");
    }
    topswrapper.scrollLeft -= topsitem.offsetWidth*mult;
    topsbtnleftoffsetWidth = topsbtnleftoffsetWidth - topsitem.offsetWidth*mult;
    if(topsbtnleftoffsetWidth <= 0){
        topsbtnleft.style.left = topsbtnleftoffsetWidth;
        topsbtnleft.classList.add("invisible");
    }else{
        topsbtnleft.style.left = topsbtnleftoffsetWidth + "px";
    }    
}


function createtopsSections(){
    if (screen.width < 768){
        for(let i = 1; i <= 5; i++){
            const section = document.createElement("section");
            section.id = "topssection" + i;
            topswrapper.appendChild(section);
        }    
    }else{
        for(let i = 1; i <= 3; i++){
            const section = document.createElement("section");
            section.id = "topssection" + i;
            topswrapper.appendChild(section);
        }
    }
}

function sectiontopsAppendChild(mult){
        if (screen.width < 768){
            console.log("mult3");
            const section1 = document.querySelector("#topssection1");
            const section2 = document.querySelector("#topssection2");
            const section3 = document.querySelector("#topssection3");
            const section4 = document.querySelector("#topssection4");
            const section5 = document.querySelector("#topssection5");
            const itens = document.querySelectorAll(".topsitem");
            let cont = 1;
            section1.appendChild(topsbtnleft);
            itens.forEach((topsitem) => {
                if(cont <= 3){
                    section1.appendChild(topsitem);
                    cont++;
                }else{
                    if(cont <= 6){
                    section1.appendChild(topsbtnright);
                    section2.appendChild(topsitem);
                    cont++;
                    console.log(cont);
                    }else{
                        if(cont <= 9){
                            section3.appendChild(topsitem);
                            cont++;
                        }else{
                            if(cont <= 12){
                                section4.appendChild(topsitem);
                                cont++;
                            }else{
                                section5.appendChild(topsitem);
                                cont++;
                            }
                        }

                        }
                    }
              })
            }else{
                const section1 = document.querySelector("#topssection1");
                const section2 = document.querySelector("#topssection2");
                const section3 = document.querySelector("#topssection3");
                const topsitens = document.querySelectorAll(".topsitem");
                cont = 1;
                section1.appendChild(topsbtnleft);
                topsitens.forEach((topsitem) => {
                    if(cont <= 5){
                        section1.appendChild(topsitem);
                        cont++;
                    }else{
                        if(cont <= 10){
                        section1.appendChild(topsbtnright);
                        section2.appendChild(topsitem);
                        cont++;
                        console.log(cont);
                        }else{
                            section3.appendChild(topsitem);
                            cont++;
                            }
                        }
                  })
            }
    }