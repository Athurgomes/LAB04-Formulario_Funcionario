# Sistema de Gestão de Funcionários

Este é um projeto de estudo de caso para um sistema simples de gerenciamento de funcionários, implementado com HTML e JavaScript (front-end).

## Funcionalidades

O sistema permite:

* **Cadastrar** funcionários com Nome, Idade, Cargo e Salário.
* **Listar** os funcionários cadastrados em uma tabela.
* **Editar** os dados de um funcionário existente.
* **Excluir** um funcionário da lista.
* **Gerar Relatórios** (via console do navegador) usando `map`, `filter` e `reduce`, incluindo:
    * Salários acima de R$ 5000.
    * Média salarial da empresa.
    * Lista de cargos únicos.
    * Nomes dos funcionários em maiúsculo.

## Como Rodar o Projeto com Docker 

Este projeto é servido como um site estático usando Nginx dentro de um container Docker.

### Pré-requisitos

* Docker deve estar instalado e em execução.

### Passos

1.  **Construa (Build) a Imagem Docker**
    No terminal, na pasta do projeto, execute:
    ```bash
    docker build -t gestao-funcionarios .
    ```

2.  **Rode (Run) o Container**
    Após o build, execute:
    ```bash
    docker run -d -p 8080:80 gestao-funcionarios
    ```

3.  **Acesse o Sistema**
    Abra seu navegador e acesse: `http://localhost:8080`

4.  **Ver os Relatórios**
    Abra as "Ferramentas de Desenvolvedor" (Inspecionar) e vá para a aba **"Console"** para ver a saída dos relatórios.
