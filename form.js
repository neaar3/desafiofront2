document.querySelector(".bag").innerHTML = localStorage.getItem("itemSacola");
let itemDesconto = JSON.parse(localStorage.getItem("temDesconto"));
if (itemDesconto == true) {
  document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
}
const subtotal = document.createElement("div");
subtotal.classList.add("subtotal");
const subtotalSpan = document.createElement("span");
subtotalSpan.innerText = "Subtotal";
const valorFinalSubtotalSpan = document.createElement("span");
valorFinalSubtotalSpan.innerText = document.querySelector(
  ".bag-confirmar-preco"
).innerText;
document.querySelector(".div-separadora").append(subtotal);
subtotal.append(subtotalSpan);
subtotal.append(valorFinalSubtotalSpan);

let newCabecalho = document.querySelector(".bag-header");
let imgCabecalho = document.querySelector(".bag-header img");
let spanCabecalho = document.querySelector(".bag-header span");
imgCabecalho.remove();
spanCabecalho.innerText = "Resumo dos pedidos";
newCabecalho.style.backgroundColor = "#171b1e";
document.querySelector(".bag-confirmar-texto").innerText = "Comprar agora";

let inputs = document.querySelectorAll(".bloco input");
let botaoDisable = document.querySelector(".bag-confirmar");
let teste = 0;
botaoDisable.disabled = true;
for (i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", () => {
    let values = [];
    inputs.forEach((v) => values.push(v.value));
    botaoDisable.disabled = values.includes("");
  });
  document
    .querySelector(".bag-confirmar-texto")
    .addEventListener("click", () => {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length == 0) {
          testedeclique();
          teste++;
        }
      }
    });
}
function testedeclique() {
  if (teste == 0) {
    alert("Por favor, preencha todos os campos.");
  }
}
