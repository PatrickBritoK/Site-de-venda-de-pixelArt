function abrirModal() {
    document.getElementById("modal").style.display = "block";
  }
  
  function fecharModal() {
    document.getElementById("modal").style.display = "none";
  }

let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
  let itemCarrinho = carrinho.find(item => item.nome === nome);
  if (itemCarrinho) {
    itemCarrinho.quantidade++;
  } else {
    itemCarrinho = {
      nome: nome,
      preco: preco,
      quantidade: 1
    };
    carrinho.push(itemCarrinho);
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let carrinhoTable = document.getElementById("carrinhoCompras").getElementsByTagName('tbody')[0];
  carrinhoTable.innerHTML = "";
  let total = 0;
  carrinho.forEach(function(item) {
    let linha = carrinhoTable.insertRow();
    let colunaNome = linha.insertCell(0);
    let colunaPreco = linha.insertCell(1);
    let colunaQuantidade = linha.insertCell(2);
    let colunaRemover = linha.insertCell(3); // Adiciona a coluna "Remover"
    colunaNome.innerHTML = item.nome;
    colunaPreco.innerHTML = "R$" + item.preco;
    colunaQuantidade.innerHTML = item.quantidade;
    colunaRemover.innerHTML = "<button class='removerCarrinho' onclick=\"removerDoCarrinho('" + item.nome + "', 1)\">Remover</button>"; // Cria o botão "Remover"
    total += parseFloat(item.preco) * item.quantidade;
  });
  document.getElementById("precoTotal").innerHTML = total.toFixed(2);
}

function removerDoCarrinho(nome, quantidade) {
  let itemCarrinho = carrinho.find(item => item.nome === nome);
  if (itemCarrinho) {
    itemCarrinho.quantidade -= quantidade;
    if (itemCarrinho.quantidade <= 0) {
      carrinho = carrinho.filter(item => item.nome !== nome);
    }
  }
  atualizarCarrinho();
}
