 // Dados iniciais
 const dadosIniciais = [
    { nome: 'Chave de fenda', quantidade: 25 },
    { nome: 'Chave Philips', quantidade: 30 },
    { nome: 'Chave inglesa', quantidade: 30 },
    { nome: 'Estilete', quantidade: 30 },
    { nome: 'Régua', quantidade: 30 },
    { nome: 'Óculos de proteção', quantidade: 30 }
];

// Carregar dados do localStorage
function carregarDados() {
    const dados = JSON.parse(localStorage.getItem('tabelaDados'));
    if (!dados) {
        // Se não houver dados, usar os dados iniciais
        localStorage.setItem('tabelaDados', JSON.stringify(dadosIniciais));
    }
    preencherTabela();
}

// Preencher a tabela com os dados
function preencherTabela() {
    const tabelaBody = document.querySelector('#minhaTabela tbody');
    const dados = JSON.parse(localStorage.getItem('tabelaDados'));
    tabelaBody.innerHTML = ''; // Limpar tabela atual

    dados.forEach(item => {
        const linha = tabelaBody.insertRow();
        linha.insertCell(0).innerText = item.nome;
        linha.insertCell(1).innerText = item.quantidade;
        const acaoCell = linha.insertCell(2);
        acaoCell.innerHTML = `<button onclick="atualizarDados(this)">Atualizar</button>`;
    });
}

// Salvar dados no localStorage
function salvarDados() {
    const tabelaBody = document.querySelector('#minhaTabela tbody');
    const dados = Array.from(tabelaBody.rows).map(linha => {
        return {
            nome: linha.cells[0].innerText,
            quantidade: linha.cells[1].innerText
        };
    });
    localStorage.setItem('tabelaDados', JSON.stringify(dados));
}

// Atualizar dados da tabela
function atualizarDados(botao) {
    const linha = botao.parentElement.parentElement;
    const nome = linha.cells[0].innerText;
    const novaQuantidade = prompt(`Digite a nova quantidade para ${nome}:`, linha.cells[1].innerText);

    if (novaQuantidade !== null && !isNaN(novaQuantidade)) {
        linha.cells[1].innerText = novaQuantidade;
        salvarDados(); // Salvar alterações no localStorage
    } else {
        alert("Por favor, insira um número válido.");
    }
}

// Carregar os dados quando a página for carregada
window.onload = carregarDados;
