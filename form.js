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
let novoVerificador = 0;
document.querySelector(".bag-confirmar-texto").innerText = "Comprar agora";
document.querySelector(".bag-confirmar-texto").addEventListener("click", () => {
  let inputs = document.querySelectorAll(".bloco input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length == 0) {
      console.log("entrei aqui");
      alert("Por favor, preencha todos os campos.");
      break;
    } else {
      console.log("entrei aqui");
      window.location.replace("./success.html");
      break;
    }
  }
});
