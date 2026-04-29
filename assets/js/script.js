'use strict';



/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

addEventOnElements(navTogglers, "click", function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
});

addEventOnElements(navLinks, "click", function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});



/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});



/**
 * Element tilt effect
 */

const tiltElements = document.querySelectorAll("[data-tilt]");

const initTilt = function (event) {

  /** get tilt element center position */
  const centerX = this.offsetWidth / 2;
  const centerY = this.offsetHeight / 2;

  const tiltPosY = ((event.offsetX - centerX) / centerX) * 10;
  const tiltPosX = ((event.offsetY - centerY) / centerY) * 10;

  this.style.transform = `perspective(1000px) rotateX(${tiltPosX}deg) rotateY(${tiltPosY - (tiltPosY * 2)}deg)`;

}

addEventOnElements(tiltElements, "mousemove", initTilt);

addEventOnElements(tiltElements, "mouseout", function () {
  this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});



/**
 * Tab content
 */

const tabBtns = document.querySelectorAll("[data-tab-btn]");
const tabContents = document.querySelectorAll("[data-tab-content]");

let lastActiveTabBtn = tabBtns[0];
let lastActiveTabContent = tabContents[0];

const filterContent = function () {

  if (!(lastActiveTabBtn === this)) {

    lastActiveTabBtn.classList.remove("active");
    lastActiveTabContent.classList.remove("active");

    this.classList.add("active");
    lastActiveTabBtn = this;

    const currentTabContent = document.querySelector(`[data-tab-content="${this.dataset.tabBtn}"]`);

    currentTabContent.classList.add("active");
    lastActiveTabContent = currentTabContent;

  }

}

addEventOnElements(tabBtns, "click", filterContent);



/**
 * Custom cursor
 */

const cursors = document.querySelectorAll("[data-cursor]");
const hoveredElements = [...document.querySelectorAll("button"), ...document.querySelectorAll("a")];

window.addEventListener("mousemove", function (event) {

  const posX = event.clientX;
  const posY = event.clientY;

  /** cursor dot position */
  cursors[0].style.left = `${posX}px`;
  cursors[0].style.top = `${posY}px`;

  /** cursor outline position */
  setTimeout(function () {
    cursors[1].style.left = `${posX}px`;
    cursors[1].style.top = `${posY}px`;
  }, 80);

});

/** add hovered class when mouseover on hoverElements */
addEventOnElements(hoveredElements, "mouseover", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.add("hovered");
  }
});

/** remove hovered class when mouseout on hoverElements */
addEventOnElements(hoveredElements, "mouseout", function () {
  for (let i = 0, len = cursors.length; i < len; i++) {
    cursors[i].classList.remove("hovered");
  }
});



document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

e.preventDefault();

let nome = document.getElementById("nome").value;
let email = document.getElementById("email").value;
let telefone = document.getElementById("telefone").value;
let mensagem = document.getElementById("mensagem").value;

let texto = `Olá Jack Mários,

Tenho interesse nos seus serviços.

Nome: ${nome}
Email: ${email}
Telefone: ${telefone}
Mensagem: ${mensagem}`;

let numero = "244949535092"; // coloque seu número

let url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

window.open(url, "_blank");

});

});


const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {

reveals.forEach((el)=>{

const windowHeight = window.innerHeight;
const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
el.classList.add("active");
}

});

});




const form = document.getElementById("budgetForm")
const resultado = document.getElementById("resultado")

function calcular(){

let tipo = parseInt(document.getElementById("tipoProjeto").value) || 0
let paginas = parseInt(document.getElementById("paginas").value) || 0
let design = parseInt(document.getElementById("design").value) || 0
let integracoes = parseInt(document.getElementById("integracoes").value) || 0
let prazo = parseInt(document.getElementById("prazo").value) || 0

let precoPaginas = paginas * 20000

let total = tipo + precoPaginas + design + integracoes + prazo

resultado.innerText = total.toLocaleString("pt-PT") + " KZ"

return total
}

document.querySelectorAll("input,select").forEach(el=>{
el.addEventListener("change",calcular)
})

form.addEventListener("submit",function(e){

e.preventDefault()

let tipoProjeto = document.getElementById("tipoProjeto")
let paginas = document.getElementById("paginas")

if(tipoProjeto.value === ""){
alert("Selecione o tipo de projeto")
return
}

if(paginas.value === "" || paginas.value <= 0){
alert("Digite o número de páginas")
return
}

let total = calcular()

let mensagem =
`Olá Jack, utilizei o simulador do seu site.

Tipo de projeto: ${tipoProjeto.options[tipoProjeto.selectedIndex].text}
Número de páginas: ${paginas.value}

Orçamento estimado: ${total.toLocaleString("pt-PT")} KZ

Gostaria de conversar sobre o projeto.`

let numero = "244949535092"

let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`

window.open(url,"_blank")

})




const filters = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filters.forEach(btn => {

btn.addEventListener("click", () => {

document.querySelector(".filter-btn.active").classList.remove("active");

btn.classList.add("active");

const filter = btn.dataset.filter;

projects.forEach(card => {

if(filter === "all" || card.dataset.category === filter){

card.style.display = "block";

}else{

card.style.display = "none";

}

});

});

});


const progressBars = document.querySelectorAll(".progress-fill");

window.addEventListener("scroll", () => {

progressBars.forEach(bar => {

const position = bar.getBoundingClientRect().top;

if(position < window.innerHeight - 100){

bar.style.width = bar.dataset.width;

}

});

});
