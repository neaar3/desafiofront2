let timelapse = document.querySelector(".timelapse");
let promo = document.querySelector(".promo");
let bagInput = document.querySelector(".bagInput");
let min, seg;
let filmeAdicionado = false;
let indice = 0;
let novoFilme;
let link;
let variavelDeControle = 0;
let valorTotal = 0;
min = 5;
seg = 1;
function relogio() {
  if (min > 0 || seg > 0) {
    if (seg == 0) {
      seg = 59;
      min = min - 1;
    } else {
      seg = seg - 1;
    }
    if (min.toString().length == 1) {
      min = "0" + min;
    }
    if (seg.toString().length == 1) {
      seg = "0" + seg;
    }
    timelapse.innerText = min + ":" + seg;
    setTimeout("relogio()", 1000);
  } else {
    timelapse.innerText = "00:00";
    promo.remove();
  }
}
relogio();

promo.addEventListener("click", () => {
  document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
  promo.remove();
  desconto = true;
  document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
    valorTotal / 2
  }`;
});

let desconto = false;
function fetchJson(url) {
  return fetch(url).then((resposta) => {
    return resposta.json();
  });
}

fetchJson(
  "https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR"
).then((respostaJson) => {
  const filmes = respostaJson.results;

  const topCinco = document.querySelector(".container-1");

  for (let i = 0; i < 5; i++) {
    const card = document.createElement("div");
    topCinco.append(card);
    card.classList.add("filme");
    card.style.backgroundImage = `linear-gradient(
      rgba(0, 0, 0, 0.6), 
      rgba(0, 0, 0, 0.6)
    ),url(${filmes[i].poster_path})`;

    const filmeTopo = document.createElement("div");
    filmeTopo.classList.add("filme-topo");
    card.append(filmeTopo);

    const favorito = document.createElement("img");
    favorito.src = "./imgs/Star_2.png";
    filmeTopo.append(favorito);

    const filmeRodape = document.createElement("div");
    filmeRodape.classList.add("filme-rodape");
    card.append(filmeRodape);

    const filmeRodapeClasse = document.createElement("div");
    filmeRodapeClasse.classList.add("filme-rodape-classe");
    filmeRodape.append(filmeRodapeClasse);

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("span-title");
    if (filmes[i].title.length > 15) {
      let novoTitulo = filmes[i].title.slice(0, 13) + "...";
      spanTitle.innerText = `${novoTitulo}`;
    } else {
      spanTitle.innerText = `${filmes[i].title}`;
    }

    spanTitle.innerText = `${filmes[i].title}`;
    filmeRodapeClasse.append(spanTitle);

    const newDiv = document.createElement("div");
    filmeRodapeClasse.append(newDiv);

    const estrela = document.createElement("img");
    estrela.src = "./imgs/Star_1.png";
    newDiv.append(estrela);

    const spanNota = document.createElement("span");
    filmeRodape.classList.add("span-nota");
    spanNota.innerText = `${filmes[i].vote_average}`;
    newDiv.append(spanNota);

    const buttonSacola = document.createElement("button");
    buttonSacola.classList.add("filme-rodape-add");
    filmeRodape.append(buttonSacola);

    const spanSacola = document.createElement("span");
    spanSacola.innerText = "Sacola";
    buttonSacola.append(spanSacola);

    const spanPreco = document.createElement("span");
    spanPreco.classList.add("preco");
    spanPreco.innerText = `R$ ${filmes[i].price}`;
    buttonSacola.append(spanPreco);

    buttonSacola.addEventListener("click", () => {
      if (verificaSacola == 0) {
        valorTotal += filmes[i].price;
        contagemDeFilmes.push({ filme: filmes[i].title, qtd: 1 });
        document.querySelector(".bag-content").remove();
        document.querySelector(".bag-footer").remove();
        document.querySelector(".bag-footer-input").remove();

        const divSeparadora = document.createElement("div");
        divSeparadora.classList.add("div-separadora");
        document.querySelector(".bag-bottom").append(divSeparadora);

        const bagContentDois = document.createElement("div");
        bagContentDois.classList.add("bag-content-2");
        document.querySelector(".div-separadora").append(bagContentDois);
        bagContentDois.setAttribute("id", `content-${variavelDeControle}`);
        let minhaDivBag = document.getElementById(
          `content-${variavelDeControle}`
        );
        minhaDivBag.onclick = function () {
          let verificador = this.id;
          novoVerificador = verificador.split("-");
        };

        const filmeBag = document.createElement("div");
        filmeBag.classList.add("filme-bag");
        bagContentDois.append(filmeBag);

        const filmeIcon = document.createElement("div");
        filmeIcon.classList.add("filme-icon");
        filmeBag.append(filmeIcon);

        const imgFilmeIcon = document.createElement("img");
        imgFilmeIcon.src = filmes[i].poster_path;
        filmeIcon.append(imgFilmeIcon);

        const filmeInfo = document.createElement("div");
        filmeInfo.classList.add("filme-info");
        filmeBag.append(filmeInfo);

        const filmeInfoNome = document.createElement("div");
        filmeInfoNome.classList.add("filme-info-nome");
        filmeInfo.append(filmeInfoNome);
        filmeInfoNome.setAttribute("id", `nome-${variavelDeControle}`);
        filmeInfoNome.innerText = filmes[i].title;

        const filmeInfoPreco = document.createElement("div");
        filmeInfoPreco.classList.add("filme-info-preco");
        filmeInfo.append(filmeInfoPreco);
        filmeInfoPreco.setAttribute("id", `preco-${variavelDeControle}`);
        filmeInfoPreco.innerText = `R$ ${filmes[i].price}`;

        const filmeQtd = document.createElement("div");
        filmeQtd.classList.add("filme-qtd");
        bagContentDois.append(filmeQtd);

        const imgMais = document.createElement("img");
        imgMais.src = "./imgs/adicionar.png";
        filmeQtd.append(imgMais);
        imgMais.setAttribute("id", `mais-${variavelDeControle}`);
        let minhaDivMais = document.getElementById(
          `mais-${variavelDeControle}`
        );
        minhaDivMais.onclick = function () {
          let verificador = this.id;
          novoVerificador = verificador.split("-");
        };
        imgMais.addEventListener("click", () => {
          incrementaOuDecrementa(novoVerificador[1], 0);
        });

        const spanFilmeQtd = document.createElement("span");
        spanFilmeQtd.classList.add("filme-qtd-span");
        filmeQtd.append(spanFilmeQtd);
        spanFilmeQtd.setAttribute("id", `qtd-${variavelDeControle}`);

        let codigodofilme = contagemDeFilmes.find(
          (titulos) => titulos.filme === filmes[i].title
        );
        console.log(codigodofilme);
        spanFilmeQtd.innerText = codigodofilme.qtd;

        const imgLixeira = document.createElement("img");
        imgLixeira.classList.add("imagem-lixeira");
        imgLixeira.src = "./imgs/deletar.png";
        imgLixeira.style.backgroundColor = "#0B1217";
        filmeQtd.append(imgLixeira);
        imgLixeira.setAttribute("id", `lixeira-${variavelDeControle}`);
        let minhaDiv = document.getElementById(`lixeira-${variavelDeControle}`);
        minhaDiv.onclick = function () {
          let verificador = this.id;
          novoVerificador = verificador.split("-");
        };
        imgLixeira.addEventListener("click", () => {
          incrementaOuDecrementa(novoVerificador[1], 1);
        });
        console.log(variavelDeControle);
        console.log(oldId);
        variavelDeControle++;

        const bagFooterDois = document.createElement("div");
        bagFooterDois.classList.add("bag-footer");
        document.querySelector(".bag-bottom").append(bagFooterDois);

        const cupomP = document.createElement("p");
        cupomP.innerText = "Insira seu cupom";
        bagFooterDois.append(cupomP);

        const bagFooterDoisInput = document.createElement("div");
        bagFooterDoisInput.classList.add("bag-footer-input");
        document.querySelector(".bag-bottom").append(bagFooterDoisInput);

        const inputBagFooter = document.createElement("input");
        inputBagFooter.classList.add("bagInput");
        bagFooterDoisInput.append(inputBagFooter);
        inputBagFooter.placeholder = "Cupom de desconto";

        const imgTicket = document.createElement("img");
        imgTicket.src = "./imgs/Ticket.png";
        bagFooterDoisInput.append(imgTicket);

        const bagConfirmarDiv = document.createElement("div");
        bagConfirmarDiv.classList.add("bag-confirmar-div");
        document.querySelector(".bag-bottom").append(bagConfirmarDiv);

        const bagConfirmar = document.createElement("button");
        bagConfirmar.classList.add("bag-confirmar");
        bagConfirmar.setAttribute("form", "form-page");
        bagConfirmarDiv.append(bagConfirmar);

        const bagConfirmarTexto = document.createElement("div");
        bagConfirmarTexto.classList.add("bag-confirmar-texto");
        bagConfirmar.append(bagConfirmarTexto);
        bagConfirmarTexto.innerText = "Confirme seus dados";

        const bagConfirmarPreco = document.createElement("div");
        bagConfirmarPreco.classList.add("bag-confirmar-preco");
        bagConfirmar.append(bagConfirmarPreco);

        if (desconto) {
          document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
            valorTotal / 2
          }`;
          document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
        } else {
          document.querySelector(
            ".bag-confirmar-preco"
          ).innerText = `R$ ${valorTotal}`;
        }
        document
          .querySelector(".bag-confirmar")
          .addEventListener("click", () => {
            salvarLocal();
            window.location.replace("./form.html");
          });
        verificaSacola++;
      } else {
        for (let q = 0; q < contagemDeFilmes.length; q++) {
          if (filmes[i].title == contagemDeFilmes[q].filme) {
            filmeAdicionado = true;
            indice = q;
            break;
          } else {
            filmeAdicionado = false;
          }
        }
        if (filmeAdicionado) {
          valorTotal += filmes[i].price;
          if (desconto) {
            document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
              valorTotal / 2
            }`;
            document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
          } else {
            document.querySelector(
              ".bag-confirmar-preco"
            ).innerText = `R$ ${valorTotal}`;
          }
          contagemDeFilmes[indice].qtd++;
          for (let k = 0; k < contagemDeFilmes.length; k++) {
            let newId = document.getElementById(`nome-${k}`);
            let newQtd = document.getElementById(`qtd-${k}`);
            if (newId.innerText == filmes[i].title) {
              newQtd.innerText = contagemDeFilmes[indice].qtd;
              document.getElementById(`lixeira-${k}`).src = "./imgs/menos.png";
              continue;
            }
          }
        } else {
          valorTotal += filmes[i].price;
          document.querySelector(".bag-confirmar-div").remove();

          contagemDeFilmes.push({ filme: filmes[i].title, qtd: 1 });
          document.querySelector(".bag-footer").remove();
          document.querySelector(".bag-footer-input").remove();

          const bagContentDois = document.createElement("div");
          bagContentDois.classList.add("bag-content-2");
          document.querySelector(".div-separadora").append(bagContentDois);
          bagContentDois.setAttribute("id", `content-${variavelDeControle}`);
          let minhaDivBag = document.getElementById(
            `content-${variavelDeControle}`
          );
          minhaDivBag.onclick = function () {
            let verificador = this.id;
            novoVerificador = verificador.split("-");
          };

          const filmeBag = document.createElement("div");
          filmeBag.classList.add("filme-bag");
          bagContentDois.append(filmeBag);

          const filmeIcon = document.createElement("div");
          filmeIcon.classList.add("filme-icon");
          filmeBag.append(filmeIcon);

          const imgFilmeIcon = document.createElement("img");
          imgFilmeIcon.src = filmes[i].poster_path;
          filmeIcon.append(imgFilmeIcon);

          const filmeInfo = document.createElement("div");
          filmeInfo.classList.add("filme-info");
          filmeBag.append(filmeInfo);

          const filmeInfoNome = document.createElement("div");
          filmeInfoNome.classList.add("filme-info-nome");
          filmeInfo.append(filmeInfoNome);
          filmeInfoNome.setAttribute("id", `nome-${variavelDeControle}`);
          filmeInfoNome.innerText = filmes[i].title;

          const filmeInfoPreco = document.createElement("div");
          filmeInfoPreco.classList.add("filme-info-preco");
          filmeInfo.append(filmeInfoPreco);
          filmeInfoPreco.setAttribute("id", `preco-${variavelDeControle}`);
          filmeInfoPreco.innerText = `R$ ${filmes[i].price}`;

          const filmeQtd = document.createElement("div");
          filmeQtd.classList.add("filme-qtd");
          bagContentDois.append(filmeQtd);

          const imgMais = document.createElement("img");
          imgMais.src = "./imgs/adicionar.png";
          filmeQtd.append(imgMais);
          imgMais.setAttribute("id", `mais-${variavelDeControle}`);
          let minhaDivMais = document.getElementById(
            `mais-${variavelDeControle}`
          );
          minhaDivMais.onclick = function () {
            let verificador = this.id;
            novoVerificador = verificador.split("-");
          };
          imgMais.addEventListener("click", () => {
            incrementaOuDecrementa(novoVerificador[1], 0);
          });

          const spanFilmeQtd = document.createElement("span");
          spanFilmeQtd.classList.add("filme-qtd-span");
          filmeQtd.append(spanFilmeQtd);
          spanFilmeQtd.setAttribute("id", `qtd-${variavelDeControle}`);
          spanFilmeQtd.innerText = 1;

          const imgLixeira = document.createElement("img");
          imgLixeira.classList.add("imagem-lixeira");
          imgLixeira.src = "./imgs/deletar.png";
          imgLixeira.style.backgroundColor = "#0B1217";
          filmeQtd.append(imgLixeira);
          imgLixeira.setAttribute("id", `lixeira-${variavelDeControle}`);
          let minhaDiv = document.getElementById(
            `lixeira-${variavelDeControle}`
          );
          minhaDiv.onclick = function () {
            let verificador = this.id;
            novoVerificador = verificador.split("-");
          };
          oldId = variavelDeControle;
          imgLixeira.addEventListener("click", () => {
            incrementaOuDecrementa(novoVerificador[1], 1);
          });
          console.log(variavelDeControle);
          console.log(oldId);
          variavelDeControle++;

          const bagFooterDois = document.createElement("div");
          bagFooterDois.classList.add("bag-footer");
          document.querySelector(".bag-bottom").append(bagFooterDois);

          const cupomP = document.createElement("p");
          cupomP.innerText = "Insira seu cupom";
          bagFooterDois.append(cupomP);

          const bagFooterDoisInput = document.createElement("div");
          bagFooterDoisInput.classList.add("bag-footer-input");
          document.querySelector(".bag-bottom").append(bagFooterDoisInput);

          const inputBagFooter = document.createElement("input");
          inputBagFooter.classList.add("bagInput");
          bagFooterDoisInput.append(inputBagFooter);
          inputBagFooter.placeholder = "Cupom de desconto";

          const imgTicket = document.createElement("img");
          imgTicket.src = "./imgs/Ticket.png";
          bagFooterDoisInput.append(imgTicket);

          const bagConfirmarDiv = document.createElement("div");
          bagConfirmarDiv.classList.add("bag-confirmar-div");
          document.querySelector(".bag-bottom").append(bagConfirmarDiv);

          const bagConfirmar = document.createElement("button");
          bagConfirmar.classList.add("bag-confirmar");
          bagConfirmar.setAttribute("form", "form-page");
          bagConfirmarDiv.append(bagConfirmar);

          const bagConfirmarTexto = document.createElement("div");
          bagConfirmarTexto.classList.add("bag-confirmar-texto");
          bagConfirmar.append(bagConfirmarTexto);
          bagConfirmarTexto.innerText = "Confirme seus dados";

          const bagConfirmarPreco = document.createElement("div");
          bagConfirmarPreco.classList.add("bag-confirmar-preco");
          bagConfirmar.append(bagConfirmarPreco);
          if (desconto) {
            document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
              valorTotal / 2
            }`;
            document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
          } else {
            document.querySelector(
              ".bag-confirmar-preco"
            ).innerText = `R$ ${valorTotal}`;
          }
          document
            .querySelector(".bag-confirmar")
            .addEventListener("click", () => {
              salvarLocal();
              window.location.replace("./form.html");
            });
        }
      }
    });
  }
});

let generoTodos = document.querySelector("#generoTodos");
let generoAcao = document.querySelector("#generoAcao");
let generoRomance = document.querySelector("#generoRomance");
let generoFiccao = document.querySelector("#generoFiccao");
let generoTerror = document.querySelector("#generoTerror");
let generoFilme = "Todos";
let identificador = [];
let newFilmes = [];
let ladoEsquerdo = document.querySelector(".left-content");
let verificaSacola = 0;
let bagContent = document.querySelector(".bag-content");
let bagFooter = document.querySelector(".bag-footer");
let bagFooterInput = document.querySelector(".bag-footer-input");
let contagemDeFilmes = [{ filme: "TesteUnico", qtd: 0 }];

generoTodos.addEventListener("click", () => {
  eventoClique(generoTodos.innerText);
  marcarElemento(generoTodos);
});
generoAcao.addEventListener("click", () => {
  eventoClique(generoAcao.innerText);
  marcarElemento(generoAcao);
});
generoRomance.addEventListener("click", () => {
  eventoClique(generoRomance.innerText);
  marcarElemento(generoRomance);
});
generoFiccao.addEventListener("click", () => {
  eventoClique(generoFiccao.innerText);
  marcarElemento(generoFiccao);
});
generoTerror.addEventListener("click", () => {
  eventoClique(generoTerror.innerText);
  marcarElemento(generoTerror);
});

function eventoClique(event) {
  adicionarGenero(event);

  newFilmes = [];
  identificador = [];
  cont = 0;
}

function marcarElemento(event) {
  let variavel1 = document.querySelector(".marcado");
  variavel1.setAttribute("class", "desmarcado");
  event.setAttribute("class", "marcado");
}

function adicionarGenero(genero) {
  fetchJson(
    "https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR"
  ).then((respostaJson) => {
    let genres = respostaJson.genres;
    let cont = 0;
    for (let i = 0; i < genres.length; i++) {
      if (genero == genres[i].name && cont == 0) {
        identificador = [];
        identificador.push(genres[i].id);
        cont++;
      } else if (genero != genres[i].name && cont == 0) {
        identificador.push(genres[i].id);
      }
    }
    if (identificador.length > 1) {
      link =
        "https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR";
    } else {
      link = `https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${identificador[0]}&language=pt-BR`;
    }
    filmesGenero();
  });
}

function filmesGenero() {
  fetchJson(`${link}`).then((respostaJson) => {
    document.querySelector(".container-2").remove();
    let newContainer = document.createElement("div");
    newContainer.classList.add("container-2");
    ladoEsquerdo.append(newContainer);

    const filmes = respostaJson.results;

    const restante = document.querySelector(".container-2");
    for (let x = 0; x < identificador.length; x++) {
      for (let i = 0; i < filmes.length; i++) {
        for (let j = 0; j < filmes[i].genre_ids.length; j++) {
          if (filmes[i].genre_ids[j] == identificador[x]) {
            if (newFilmes.includes(filmes[i])) {
              continue;
            } else {
              newFilmes.push(filmes[i]);
            }
          }
        }
      }
    }
    for (let i = 0; i < newFilmes.length; i++) {
      const card = document.createElement("div");
      restante.append(card);
      card.classList.add("filme");
      card.style.backgroundImage = `linear-gradient(
            rgba(0, 0, 0, 0.6), 
            rgba(0, 0, 0, 0.6)
          ),url(${newFilmes[i].poster_path})`;

      const filmeTopo = document.createElement("div");
      filmeTopo.classList.add("filme-topo");
      card.append(filmeTopo);

      const favorito = document.createElement("img");
      favorito.src = "./imgs/Star_2.png";
      filmeTopo.append(favorito);

      const filmeRodape = document.createElement("div");
      filmeRodape.classList.add("filme-rodape");
      card.append(filmeRodape);

      const filmeRodapeClasse = document.createElement("div");
      filmeRodapeClasse.classList.add("filme-rodape-classe");
      filmeRodape.append(filmeRodapeClasse);

      const spanTitle = document.createElement("span");
      spanTitle.classList.add("span-title");
      if (newFilmes[i].title.length > 15) {
        let novoTitulo = newFilmes[i].title.slice(0, 13) + "...";
        spanTitle.innerText = `${novoTitulo}`;
      } else {
        spanTitle.innerText = `${newFilmes[i].title}`;
      }
      filmeRodapeClasse.append(spanTitle);

      const newDiv = document.createElement("div");
      filmeRodapeClasse.append(newDiv);

      const estrela = document.createElement("img");
      estrela.src = "./imgs/Star_1.png";
      newDiv.append(estrela);

      const spanNota = document.createElement("span");
      filmeRodape.classList.add("span-nota");
      spanNota.innerText = `${newFilmes[i].vote_average}`;
      newDiv.append(spanNota);

      const buttonSacola = document.createElement("button");
      buttonSacola.classList.add("filme-rodape-add");
      filmeRodape.append(buttonSacola);

      const spanSacola = document.createElement("span");
      spanSacola.innerText = "Sacola";
      buttonSacola.append(spanSacola);

      const spanPreco = document.createElement("span");
      spanPreco.classList.add("preco");
      spanPreco.innerText = `R$ ${newFilmes[i].price}`;
      buttonSacola.append(spanPreco);

      buttonSacola.addEventListener("click", () => {
        if (verificaSacola == 0) {
          valorTotal += newFilmes[i].price;
          contagemDeFilmes.push({ filme: newFilmes[i].title, qtd: 1 });
          document.querySelector(".bag-content").remove();
          document.querySelector(".bag-footer").remove();
          document.querySelector(".bag-footer-input").remove();

          const divSeparadora = document.createElement("div");
          divSeparadora.classList.add("div-separadora");
          document.querySelector(".bag-bottom").append(divSeparadora);

          const bagContentDois = document.createElement("div");
          bagContentDois.classList.add("bag-content-2");
          document.querySelector(".div-separadora").append(bagContentDois);
          bagContentDois.setAttribute("id", `content-${variavelDeControle}`);
          let minhaDivBag = document.getElementById(
            `content-${variavelDeControle}`
          );
          minhaDivBag.onclick = function () {
            let verificador = this.id;
            novoVerificador = verificador.split("-");
          };

          const filmeBag = document.createElement("div");
          filmeBag.classList.add("filme-bag");
          bagContentDois.append(filmeBag);

          const filmeIcon = document.createElement("div");
          filmeIcon.classList.add("filme-icon");
          filmeBag.append(filmeIcon);

          const imgFilmeIcon = document.createElement("img");
          imgFilmeIcon.src = newFilmes[i].poster_path;
          filmeIcon.append(imgFilmeIcon);

          const filmeInfo = document.createElement("div");
          filmeInfo.classList.add("filme-info");
          filmeBag.append(filmeInfo);

          const filmeInfoNome = document.createElement("div");
          filmeInfoNome.classList.add("filme-info-nome");
          filmeInfo.append(filmeInfoNome);
          filmeInfoNome.setAttribute("id", `nome-${variavelDeControle}`);
          if (newFilmes[i].title.length > 15) {
            let novoTitulo = newFilmes[i].title.slice(0, 13) + "...";
            filmeInfoNome.innerText = `${novoTitulo}`;
          } else {
            filmeInfoNome.innerText = `${newFilmes[i].title}`;
          }

          const filmeInfoPreco = document.createElement("div");
          filmeInfoPreco.classList.add("filme-info-preco");
          filmeInfo.append(filmeInfoPreco);
          filmeInfoPreco.setAttribute("id", `preco-${variavelDeControle}`);
          filmeInfoPreco.innerText = `R$ ${newFilmes[i].price}`;

          const filmeQtd = document.createElement("div");
          filmeQtd.classList.add("filme-qtd");
          bagContentDois.append(filmeQtd);

          const imgMais = document.createElement("img");
          imgMais.src = "./imgs/adicionar.png";
          filmeQtd.append(imgMais);
          imgMais.setAttribute("id", `mais-${variavelDeControle}`);
          let minhaDivMais = document.getElementById(
            `mais-${variavelDeControle}`
          );
          minhaDivMais.onclick = function () {
            let verificador = this.id;
            novoVerificador = verificador.split("-");
          };

          imgMais.addEventListener("click", () => {
            incrementaOuDecrementa(novoVerificador[1], 0);
          });

          const spanFilmeQtd = document.createElement("span");
          spanFilmeQtd.classList.add("filme-qtd-span");
          filmeQtd.append(spanFilmeQtd);
          spanFilmeQtd.setAttribute("id", `qtd-${variavelDeControle}`);

          let codigodofilme = contagemDeFilmes.find(
            (titulos) => titulos.filme === newFilmes[i].title
          );
          console.log(codigodofilme);
          spanFilmeQtd.innerText = codigodofilme.qtd;

          const imgLixeira = document.createElement("img");
          imgLixeira.classList.add("imagem-lixeira");
          imgLixeira.src = "./imgs/deletar.png";
          imgLixeira.style.backgroundColor = "#0B1217";
          filmeQtd.append(imgLixeira);
          imgLixeira.setAttribute("id", `lixeira-${variavelDeControle}`);
          let minhaDiv = document.getElementById(
            `lixeira-${variavelDeControle}`
          );
          minhaDiv.onclick = function () {
            let verificador = this.id;
            novoVerificador = verificador.split("-");
          };

          imgLixeira.addEventListener("click", () => {
            incrementaOuDecrementa(novoVerificador[1], 1);
          });
          console.log(variavelDeControle);
          console.log(oldId);
          variavelDeControle++;

          const bagFooterDois = document.createElement("div");
          bagFooterDois.classList.add("bag-footer");
          document.querySelector(".bag-bottom").append(bagFooterDois);

          const cupomP = document.createElement("p");
          cupomP.innerText = "Insira seu cupom";
          bagFooterDois.append(cupomP);

          const bagFooterDoisInput = document.createElement("div");
          bagFooterDoisInput.classList.add("bag-footer-input");
          document.querySelector(".bag-bottom").append(bagFooterDoisInput);

          const inputBagFooter = document.createElement("input");
          inputBagFooter.classList.add("bagInput");
          bagFooterDoisInput.append(inputBagFooter);
          inputBagFooter.placeholder = "Cupom de desconto";

          const imgTicket = document.createElement("img");
          imgTicket.src = "./imgs/Ticket.png";
          bagFooterDoisInput.append(imgTicket);

          const bagConfirmarDiv = document.createElement("div");
          bagConfirmarDiv.classList.add("bag-confirmar-div");
          document.querySelector(".bag-bottom").append(bagConfirmarDiv);

          const bagConfirmar = document.createElement("button");
          bagConfirmar.classList.add("bag-confirmar");
          bagConfirmar.setAttribute("form", "form-page");
          bagConfirmarDiv.append(bagConfirmar);

          const bagConfirmarTexto = document.createElement("div");
          bagConfirmarTexto.classList.add("bag-confirmar-texto");
          bagConfirmar.append(bagConfirmarTexto);
          bagConfirmarTexto.innerText = "Confirme seus dados";

          const bagConfirmarPreco = document.createElement("div");
          bagConfirmarPreco.classList.add("bag-confirmar-preco");
          bagConfirmar.append(bagConfirmarPreco);
          if (desconto) {
            document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
              valorTotal / 2
            }`;
            document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
          } else {
            document.querySelector(
              ".bag-confirmar-preco"
            ).innerText = `R$ ${valorTotal}`;
          }
          document
            .querySelector(".bag-confirmar")
            .addEventListener("click", () => {
              salvarLocal();
              window.location.replace("./form.html");
            });

          verificaSacola++;
        } else {
          for (let q = 0; q < contagemDeFilmes.length; q++) {
            if (newFilmes[i].title == contagemDeFilmes[q].filme) {
              console.log(newFilmes[i].title);
              filmeAdicionado = true;
              indice = q;
              break;
            } else {
              filmeAdicionado = false;
            }
          }
          if (filmeAdicionado) {
            valorTotal += newFilmes[i].price;
            if (desconto) {
              document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
                valorTotal / 2
              }`;
              document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
            } else {
              document.querySelector(
                ".bag-confirmar-preco"
              ).innerText = `R$ ${valorTotal}`;
            }
            contagemDeFilmes[indice].qtd++;
            for (let k = 0; k < contagemDeFilmes.length; k++) {
              let newId = document.getElementById(`nome-${k}`);
              let newQtd = document.getElementById(`qtd-${k}`);
              if (newId.innerText == newFilmes[i].title) {
                newQtd.innerText = contagemDeFilmes[indice].qtd;
                document.getElementById(`lixeira-${k}`).src =
                  "./imgs/menos.png";
                continue;
              }
            }
          } else {
            valorTotal += newFilmes[i].price;
            document.querySelector(".bag-confirmar-div").remove();

            contagemDeFilmes.push({ filme: newFilmes[i].title, qtd: 1 });
            document.querySelector(".bag-footer").remove();
            document.querySelector(".bag-footer-input").remove();

            const bagContentDois = document.createElement("div");
            bagContentDois.classList.add("bag-content-2");
            document.querySelector(".div-separadora").append(bagContentDois);
            bagContentDois.setAttribute("id", `content-${variavelDeControle}`);
            let minhaDivBag = document.getElementById(
              `content-${variavelDeControle}`
            );
            minhaDivBag.onclick = function () {
              let verificador = this.id;
              novoVerificador = verificador.split("-");
            };

            const filmeBag = document.createElement("div");
            filmeBag.classList.add("filme-bag");
            bagContentDois.append(filmeBag);

            const filmeIcon = document.createElement("div");
            filmeIcon.classList.add("filme-icon");
            filmeBag.append(filmeIcon);

            const imgFilmeIcon = document.createElement("img");
            imgFilmeIcon.src = newFilmes[i].poster_path;
            filmeIcon.append(imgFilmeIcon);

            const filmeInfo = document.createElement("div");
            filmeInfo.classList.add("filme-info");
            filmeBag.append(filmeInfo);

            const filmeInfoNome = document.createElement("div");
            filmeInfoNome.classList.add("filme-info-nome");
            filmeInfo.append(filmeInfoNome);
            filmeInfoNome.setAttribute("id", `nome-${variavelDeControle}`);
            if (newFilmes[i].title.length > 15) {
              let novoTitulo = newFilmes[i].title.slice(0, 13) + "...";
              filmeInfoNome.innerText = `${novoTitulo}`;
            } else {
              filmeInfoNome.innerText = `${newFilmes[i].title}`;
            }

            const filmeInfoPreco = document.createElement("div");
            filmeInfoPreco.classList.add("filme-info-preco");
            filmeInfo.append(filmeInfoPreco);
            filmeInfoPreco.setAttribute("id", `preco-${variavelDeControle}`);
            filmeInfoPreco.innerText = `R$ ${newFilmes[i].price}`;

            const filmeQtd = document.createElement("div");
            filmeQtd.classList.add("filme-qtd");
            bagContentDois.append(filmeQtd);

            const imgMais = document.createElement("img");
            imgMais.src = "./imgs/adicionar.png";
            filmeQtd.append(imgMais);
            imgMais.setAttribute("id", `mais-${variavelDeControle}`);
            let minhaDivMais = document.getElementById(
              `mais-${variavelDeControle}`
            );
            minhaDivMais.onclick = function () {
              let verificador = this.id;
              novoVerificador = verificador.split("-");
            };
            imgMais.addEventListener("click", () => {
              incrementaOuDecrementa(novoVerificador[1], 0);
            });

            const spanFilmeQtd = document.createElement("span");
            spanFilmeQtd.classList.add("filme-qtd-span");
            filmeQtd.append(spanFilmeQtd);
            spanFilmeQtd.setAttribute("id", `qtd-${variavelDeControle}`);
            spanFilmeQtd.innerText = 1;

            const imgLixeira = document.createElement("img");
            imgLixeira.classList.add("imagem-lixeira");
            imgLixeira.src = "./imgs/deletar.png";
            imgLixeira.style.backgroundColor = "#0B1217";
            filmeQtd.append(imgLixeira);
            imgLixeira.setAttribute("id", `lixeira-${variavelDeControle}`);
            let minhaDiv = document.getElementById(
              `lixeira-${variavelDeControle}`
            );
            minhaDiv.onclick = function () {
              let verificador = this.id;
              novoVerificador = verificador.split("-");
            };
            console.log(
              document.getElementById(`lixeira-${variavelDeControle}`)
            );
            oldId = variavelDeControle;
            imgLixeira.addEventListener("click", () => {
              incrementaOuDecrementa(novoVerificador[1], 1);
            });
            console.log(variavelDeControle);
            console.log(oldId);

            variavelDeControle++;

            const bagFooterDois = document.createElement("div");
            bagFooterDois.classList.add("bag-footer");
            document.querySelector(".bag-bottom").append(bagFooterDois);

            const cupomP = document.createElement("p");
            cupomP.innerText = "Insira seu cupom";
            bagFooterDois.append(cupomP);

            const bagFooterDoisInput = document.createElement("div");
            bagFooterDoisInput.classList.add("bag-footer-input");
            document.querySelector(".bag-bottom").append(bagFooterDoisInput);

            const inputBagFooter = document.createElement("input");
            inputBagFooter.classList.add("bagInput");
            bagFooterDoisInput.append(inputBagFooter);
            inputBagFooter.placeholder = "Cupom de desconto";

            const imgTicket = document.createElement("img");
            imgTicket.src = "./imgs/Ticket.png";
            bagFooterDoisInput.append(imgTicket);

            const bagConfirmarDiv = document.createElement("div");
            bagConfirmarDiv.classList.add("bag-confirmar-div");
            document.querySelector(".bag-bottom").append(bagConfirmarDiv);

            const bagConfirmar = document.createElement("button");
            bagConfirmar.classList.add("bag-confirmar");
            bagConfirmar.setAttribute("form", "form-page");
            bagConfirmarDiv.append(bagConfirmar);

            const bagConfirmarTexto = document.createElement("div");
            bagConfirmarTexto.classList.add("bag-confirmar-texto");
            bagConfirmar.append(bagConfirmarTexto);
            bagConfirmarTexto.innerText = "Confirme seus dados";

            const bagConfirmarPreco = document.createElement("div");
            bagConfirmarPreco.classList.add("bag-confirmar-preco");
            bagConfirmar.append(bagConfirmarPreco);
            if (desconto) {
              document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
                valorTotal / 2
              }`;
              document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
            } else {
              document.querySelector(
                ".bag-confirmar-preco"
              ).innerText = `R$ ${valorTotal}`;
            }
            document
              .querySelector(".bag-confirmar")
              .addEventListener("click", () => {
                salvarLocal();
                window.location.replace("./form.html");
              });
          }
        }
      });
    }
  });
}
let oldId;
let listaLixeira;
let indiceCaixa;
let novoVerificador;
let deletado = false;
adicionarGenero("Todos");
function incrementaOuDecrementa(id, event) {
  deletado = false;
  if (event == 0) {
    let valor = document.getElementById(`qtd-${id}`).innerText;
    valor = Number(valor);
    if (valor == 1) {
      document.getElementById(`lixeira-${id}`).src = "./imgs/menos.png";
    }
    document.getElementById(`qtd-${id}`).innerText = valor + 1;
    let novoPreco = document.getElementById(`preco-${id}`).innerText;
    let novoPrecoSplit = novoPreco.split(" ");
    novoPreco = Number(novoPrecoSplit[1]);
    valorTotal += novoPreco;
    if (desconto) {
      document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
        valorTotal / 2
      }`;
      document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
    } else {
      document.querySelector(
        ".bag-confirmar-preco"
      ).innerText = `R$ ${valorTotal}`;
    }
  } else {
    let valor = document.getElementById(`qtd-${id}`).innerText;
    valor = Number(valor);
    if (valor == 2) {
      document.getElementById(`lixeira-${id}`).src = "./imgs/deletar.png";
    }
    if (valor == 1) {
      document.getElementById(`qtd-${id}`).innerText = valor - 1;
      let novoPreco = document.getElementById(`preco-${id}`).innerText;
      let novoPrecoSplit = novoPreco.split(" ");
      novoPreco = Number(novoPrecoSplit[1]);
      valorTotal -= novoPreco;
      if (desconto) {
        document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
          valorTotal / 2
        }`;
        document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
      } else {
        document.querySelector(
          ".bag-confirmar-preco"
        ).innerText = `R$ ${valorTotal}`;
      }
      document.getElementById(`content-${id}`).remove();
      verificaSacola = 0;
      valorTotal = 0;
      contagemDeFilmes = [];
      if (document.querySelector(".bag-content-2") == null) {
        document.querySelector(
          ".bag-bottom"
        ).innerHTML = `<div class="bag-content">
        <p class="title">Sua sacola está vazia</p>
        <p class="subtitle">Adicione filmes agora</p>
        <img src="./imgs/Social_Media.png" alt=""/>
      </div>
      <div class="bag-footer">
        <p>Insira seu cupom</p>
      </div>
      <div class="bag-footer-input">
        <input type="text" placeholder="Cupom de desconto" class="bagInput"/>
        <img src="./imgs/Ticket.png" alt=""/>
      </div>`;
      }
      deletado = true;
    }
    if (!deletado) {
      document.getElementById(`qtd-${id}`).innerText = valor - 1;
      let novoPreco = document.getElementById(`preco-${id}`).innerText;
      let novoPrecoSplit = novoPreco.split(" ");
      novoPreco = Number(novoPrecoSplit[1]);
      valorTotal -= novoPreco;
      if (desconto) {
        document.querySelector(".bag-confirmar-preco").innerText = `R$ ${
          valorTotal / 2
        }`;
        document.querySelector(".bagInput").value = "HTMLNAOELINGUAGEM";
      } else {
        document.querySelector(
          ".bag-confirmar-preco"
        ).innerText = `R$ ${valorTotal}`;
      }
    }
  }
}
let bagParaStorage = document.querySelector(".bag").innerHTML;
let control = 0;
function salvarLocal() {
  localStorage.removeItem("itemSacola");
  localStorage.removeItem("temDesconto");
  localStorage.setItem("temDesconto", desconto);
  console.log(localStorage.getItem("itemSacola"));
  bagParaStorage = document.querySelector(".bag").innerHTML;
  localStorage.setItem("itemSacola", bagParaStorage);
  console.log(localStorage.getItem("itemSacola"));
}
