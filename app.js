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

class FuncionarioController {
    constructor() {
        this.funcionarios = [];
        this.idEdicao = null;

        this.form = document.getElementById('formFuncionario');
        this.nomeEl = document.getElementById('nome');
        this.idadeEl = document.getElementById('idade');
        this.cargoEl = document.getElementById('cargo');
        this.salarioEl = document.getElementById('salario');
        this.tbody = document.getElementById('tabelaFuncionariosBody');
        this.outputEl = document.getElementById('resultadosRelatorios');

        this.registrarEventListeners();
        this.renderizarTabela();
    }

    registrarEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.salvarFuncionario();
        });

        document.getElementById('btnSalarioMaior5k').addEventListener('click', () => this.gerarRelatorioSalarioMaior5k());
        document.getElementById('btnMediaSalarial').addEventListener('click', () => this.gerarRelatorioMediaSalarial());
        document.getElementById('btnCargosUnicos').addEventListener('click', () => this.gerarRelatorioCargosUnicos());
        document.getElementById('btnNomesMaiusculo').addEventListener('click', () => this.gerarRelatorioNomesMaiusculo());
    }

    salvarFuncionario() {
        const nome = this.nomeEl.value;
        const idade = this.idadeEl.value;
        const cargo = this.cargoEl.value;
        const salario = this.salarioEl.value;

        if (this.idEdicao !== null) {
            const func = this.funcionarios[this.idEdicao];
            func.setNome(nome);
            func.setIdade(idade);
            func.setCargo(cargo);
            func.setSalario(salario);
            console.log("Funcionário editado!");
            this.idEdicao = null;
        } else {
            const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
            this.funcionarios.push(novoFuncionario);
            console.log("Funcionário cadastrado!");
        }

        this.renderizarTabela();
        this.form.reset();
    }

    renderizarTabela() {
        this.tbody.innerHTML = '';

        this.funcionarios.forEach((func, index) => {
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
            btnEditar.addEventListener('click', () => { this.prepararEdicao(index); });
            
            const btnExcluir = document.createElement('button');
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => { this.excluirFuncionario(index); });

            tdAcoes.appendChild(btnEditar);
            tdAcoes.appendChild(btnExcluir);
            tr.appendChild(tdAcoes);
            this.tbody.appendChild(tr);
        });
    }

    prepararEdicao(index) {
        const func = this.funcionarios[index];
        this.nomeEl.value = func.getNome();
        this.idadeEl.value = func.getIdade();
        this.cargoEl.value = func.getCargo();
        this.salarioEl.value = func.getSalario();
        this.idEdicao = index;
    }

    excluirFuncionario(index) {
        const nome = this.funcionarios[index].getNome();
        if (confirm(`Tem certeza que deseja excluir ${nome}?`)) {
            this.funcionarios.splice(index, 1);
            this.renderizarTabela();
            console.log(`Funcionário ${nome} excluído.`);
        }
    }

    exibirRelatorio(titulo, conteudo) {
        this.outputEl.innerText = `${titulo}\n\n${conteudo}`;
    }

    gerarRelatorioSalarioMaior5k() {
        const titulo = "Relatório: Salários > R$ 5000";
        const filtro = this.funcionarios.filter(func => func.getSalario() > 5000);
        
        let conteudo;
        if (filtro.length === 0) {
            conteudo = "Nenhum funcionário com salário acima de R$ 5000.";
        } else {
            conteudo = filtro.map(func => func.toString()).join("\n");
        }
        this.exibirRelatorio(titulo, conteudo);
    }

    gerarRelatorioMediaSalarial() {
        const titulo = "Relatório: Média Salarial";
        let conteudo;
        if (this.funcionarios.length === 0) {
            conteudo = "Nenhum funcionário cadastrado.";
        } else {
            const totalSalarios = this.funcionarios.reduce((soma, func) => soma + func.getSalario(), 0);
            const media = totalSalarios / this.funcionarios.length;
            conteudo = `A média salarial da empresa é: R$ ${media.toFixed(2)}`;
        }
        this.exibirRelatorio(titulo, conteudo);
    }

    gerarRelatorioCargosUnicos() {
        const titulo = "Relatório: Cargos Únicos";
        const todosCargos = this.funcionarios.map(func => func.getCargo());
        const cargosUnicos = [...new Set(todosCargos)];
        
        let conteudo;
        if (cargosUnicos.length === 0) {
            conteudo = "Nenhum cargo cadastrado.";
        } else {
            conteudo = cargosUnicos.join("\n");
        }
        this.exibirRelatorio(titulo, conteudo);
    }

    gerarRelatorioNomesMaiusculo() {
        const titulo = "Relatório: Nomes em Maiúsculo";
        const nomesMaiusculos = this.funcionarios.map(func => func.getNome().toUpperCase());
        
        let conteudo;
        if (nomesMaiusculos.length === 0) {
            conteudo = "Nenhum funcionário cadastrado.";
        } else {
            conteudo = nomesMaiusculos.join("\n");
        }
        this.exibirRelatorio(titulo, conteudo);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FuncionarioController();
});