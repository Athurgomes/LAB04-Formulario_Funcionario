class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = parseInt(idade);
        this.cargo = cargo;
        this.salario = parseFloat(salario);
    }
    getNome() { return this.nome; }
    setNome(nome) { this.nome = nome; }
    getIdade() { return this.idade; }
    setIdade(idade) { this.idade = parseInt(idade); }
    getCargo() { return this.cargo; }
    setCargo(cargo) { this.cargo = cargo; }
    getSalario() { return this.salario; }
    setSalario(salario) { this.salario = parseFloat(salario); }
    toString() {
        return `Nome: ${this.nome}, Cargo: ${this.cargo}, Salário: R$ ${this.salario.toFixed(2)}`;
    }
}

let funcionarios = [];
let idEdicao = null;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('formFuncionario').addEventListener('submit', (event) => {
        event.preventDefault();
        salvarFuncionario();
    });

    document.getElementById('btnSalarioMaior5k').addEventListener('click', gerarRelatorioSalarioMaior5k);
    document.getElementById('btnMediaSalarial').addEventListener('click', gerarRelatorioMediaSalarial);
    document.getElementById('btnCargosUnicos').addEventListener('click', gerarRelatorioCargosUnicos);
    document.getElementById('btnNomesMaiusculo').addEventListener('click', gerarRelatorioNomesMaiusculo);

    renderizarTabela();
});

function salvarFuncionario() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    if (idEdicao !== null) {
        const func = funcionarios[idEdicao];
        func.setNome(nome);
        func.setIdade(idade);
        func.setCargo(cargo);
        func.setSalario(salario);
        console.log("Funcionário editado!");
        idEdicao = null;
    } else {
        const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(novoFuncionario);
        console.log("Funcionário cadastrado!");
    }

    renderizarTabela();
    document.getElementById('formFuncionario').reset();
}

function renderizarTabela() {
    const tbody = document.getElementById('tabelaFuncionariosBody');
    tbody.innerHTML = '';

    funcionarios.forEach((func, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${func.getNome()}</td>
            <td>${func.getIdade()}</td>
            <td>${func.getCargo()}</td>
            <td>R$ ${func.getSalario().toFixed(2)}</td>
        `;
        
        const tdAcoes = document.createElement('td');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => { prepararEdicao(index); });
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => { excluirFuncionario(index); });

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdAcoes);
        tbody.appendChild(tr);
    });
}

function prepararEdicao(index) {
    const func = funcionarios[index];
    document.getElementById('nome').value = func.getNome();
    document.getElementById('idade').value = func.getIdade();
    document.getElementById('cargo').value = func.getCargo();
    document.getElementById('salario').value = func.getSalario();
    idEdicao = index;
}

function excluirFuncionario(index) {
    const nome = funcionarios[index].getNome();
    if (confirm(`Tem certeza que deseja excluir ${nome}?`)) {
        funcionarios.splice(index, 1);
        renderizarTabela();
        console.log(`Funcionário ${nome} excluído.`);
    }
}

function exibirRelatorio(titulo, conteudo) {
    const outputEl = document.getElementById('resultadosRelatorios');
    outputEl.innerText = `${titulo}\n\n${conteudo}`;
}

function gerarRelatorioSalarioMaior5k() {
    const titulo = "Relatório: Salários > R$ 5000";
    const filtro = funcionarios.filter(func => func.getSalario() > 5000);
    
    let conteudo;
    if (filtro.length === 0) {
        conteudo = "Nenhum funcionário com salário acima de R$ 5000.";
    } else {
        conteudo = filtro.map(func => func.toString()).join("\n");
    }
    exibirRelatorio(titulo, conteudo);
}

function gerarRelatorioMediaSalarial() {
    const titulo = "Relatório: Média Salarial";
    let conteudo;
    if (funcionarios.length === 0) {
        conteudo = "Nenhum funcionário cadastrado.";
    } else {
        const totalSalarios = funcionarios.reduce((soma, func) => soma + func.getSalario(), 0);
        const media = totalSalarios / funcionarios.length;
        conteudo = `A média salarial da empresa é: R$ ${media.toFixed(2)}`;
    }
    exibirRelatorio(titulo, conteudo);
}

function gerarRelatorioCargosUnicos() {
    const titulo = "Relatório: Cargos Únicos";
    const todosCargos = funcionarios.map(func => func.getCargo());
    const cargosUnicos = [...new Set(todosCargos)];
    
    let conteudo;
    if (cargosUnicos.length === 0) {
        conteudo = "Nenhum cargo cadastrado.";
    } else {
        conteudo = cargosUnicos.join("\n");
    }
    exibirRelatorio(titulo, conteudo);
}

function gerarRelatorioNomesMaiusculo() {
    const titulo = "Relatório: Nomes em Maiúsculo";
    const nomesMaiusculos = funcionarios.map(func => func.getNome().toUpperCase());
    
    let conteudo;
    if (nomesMaiusculos.length === 0) {
        conteudo = "Nenhum funcionário cadastrado.";
    } else {
        conteudo = nomesMaiusculos.join("\n");
    }
    exibirRelatorio(titulo, conteudo);
}