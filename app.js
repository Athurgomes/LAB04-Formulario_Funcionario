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

function salvarFuncionario() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const cargo = document.getElementById('cargo').value;
    const salario = document.getElementById('salario').value;

    const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
    funcionarios.push(novoFuncionario);

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
            <td>
                </td>
        `;
        tbody.appendChild(tr);
    });
}

renderizarTabela();