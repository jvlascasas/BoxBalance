let saldo = localStorage.getItem("saldo")
  ? parseFloat(localStorage.getItem("saldo"))
  : 0;

let historico = JSON.parse(localStorage.getItem("historico")) || [];

function atualizarTela() {
  document.getElementById("saldo").innerText =
    "Saldo: " + saldo;
}

function salvar() {
  localStorage.setItem("saldo", saldo);
}

function adicionar() {
  let valor = parseFloat(document.getElementById("valor").value);
  let obs = document.getElementById("obs").value;

  if (!valor) return;

  saldo += valor;

  historico.push({
    tipo: "entrada",
    valor: valor,
    obs: obs,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("historico", JSON.stringify(historico));

  salvar();
  atualizarTela();
  limparCampos();
}

function remover() {
  let valor = parseFloat(document.getElementById("valor").value);
  let obs = document.getElementById("obs").value;

  if (!valor) return;

  saldo -= valor;

  historico.push({
    tipo: "saida",
    valor: valor,
    obs: obs,
    data: new Date().toLocaleString()
  });

  localStorage.setItem("historico", JSON.stringify(historico));

  salvar();
  atualizarTela();
  limparCampos();
}

function limparCampos() {
  document.getElementById("valor").value = "";
  document.getElementById("obs").value = "";
}

function atualizarDataHora() {
  const agora = new Date();
  document.getElementById("dataHora").innerText =
    agora.toLocaleString();
}

setInterval(atualizarDataHora, 1000);

atualizarTela();


function renderHistorico() {
  const lista = document.getElementById("listaHistorico");
  lista.innerHTML = "";

  historico.forEach(item => {
    const li = document.createElement("li");

    li.innerText =
      `${item.tipo === "entrada" ? "+" : "-"} R$ ${item.valor} | ${item.obs} | ${item.data}`;

    lista.appendChild(li);
  });
}

function toggleHistorico() {
  const historico = document.getElementById("historicoBox");
  const caixa = document.getElementById("caixaBox");

  historico.classList.toggle("hidden");
  caixa.classList.add("hidden");

  renderHistorico();
}

function toggleCaixa() {
  const caixa = document.getElementById("caixaBox");
  const historico = document.getElementById("historicoBox");

  caixa.classList.toggle("hidden");
  historico.classList.add("hidden");
}

function calcularCaixas() {
  let valorCaixa = parseFloat(document.getElementById("valorCaixa").value);

  if (!valorCaixa || valorCaixa <= 0) {
    alert("Digite um valor válido");
    return;
  }

  let total = saldo * valorCaixa;

  document.getElementById("resultadoCaixa").innerText =
    `Valor total em caixas: R$ ${total.toFixed(2)}`;
}

function fecharHistorico() {
  document.getElementById("historicoBox").classList.add("hidden");
}

function fecharCaixa() {
  document.getElementById("caixaBox").classList.add("hidden");
}