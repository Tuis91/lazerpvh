const imggrande = document.querySelector(".principal");
const itenslocal = document.querySelectorAll(".itens");
let src = "";

itenslocal.forEach((item) => {
    item.addEventListener('click', trocarimagemprincipal);
})

function trocarimagemprincipal(event){
    itenslocal.forEach((item) => {
        item.classList.remove("active");
    })
    event.srcElement.classList.add("active");
    src = event.srcElement.src;
    imggrande.src = src;
}