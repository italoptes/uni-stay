# 🏠 Student Housing System

## 📌 Visão do Projeto

Sistema web simples para auxiliar estudantes a cadastrar e visualizar residências disponíveis para moradia.

A aplicação permitirá que usuários criem contas, façam login e gerenciem residências cadastradas de forma prática e direta.

---

## 🎯 Objetivo

Desenvolver uma aplicação funcional do zero até produção em 1 semana, utilizando boas práticas de engenharia de software como:

* pequenas entregas contínuas
* testes automatizados
* organização em camadas
* uso de IA como apoio no desenvolvimento

---

## 👤 Público-alvo

* Estudantes que procuram moradia
* Usuários que desejam cadastrar residências disponíveis

---

## 🚫 Fora do Escopo (IMPORTANTE)

Para manter o projeto simples e executável em 1 semana, NÃO será implementado:

* sistema de pagamento
* chat entre usuários
* sistema de avaliações
* notificações avançadas
* marketplace complexo

---

## 🧱 Stack Tecnológica

### Backend

* Java
* Spring Boot

### Frontend

* React
* HTML
* CSS

### Banco de Dados

* PostgreSQL

### Ferramentas

* Git + GitHub
* JUnit (testes)
* Docker (opcional, apenas se necessário)

---

## 🏗️ Arquitetura Backend

Arquitetura em camadas:

* **Controller** → entrada das requisições HTTP
* **Service** → regras de negócio
* **Repository** → acesso ao banco de dados
* **Model** → entidades

---

## 📂 Estrutura Inicial do Projeto

/backend
/frontend
/docs

---

## 🧩 Entidades

### User

* id
* username (único)
* password (criptografado)
* phoneNumber

---

### Residence

* id
* title
* description
* location
* price
* contactPhone (opcional)
* user_id (dono da residência)

---

## 🔐 Funcionalidades (MVP)

### Autenticação

* Cadastro de usuário (username, password, telefone)
* Login com username e password

---

### Residências

* Criar residência
* Listar residências
* Atualizar residência
* Deletar residência

---

## 🔄 Fluxo Principal

1. Usuário acessa o sistema
2. Realiza cadastro ou login
3. Cadastra uma residência
4. Visualiza residências disponíveis
5. Edita ou remove suas próprias residências

---

## ⚙️ Regras de Negócio

* Usuário deve estar autenticado para cadastrar residência
* Usuário só pode editar/deletar suas próprias residências
* Username deve ser único
* Password deve ser armazenado de forma segura (criptografia)

---

## 🧪 Testes

* Testes unitários com JUnit
* Testar principalmente a camada de Service
* Garantir que regras de negócio estão corretas

---

## 🚀 Deploy

* Aplicação será executada em homelab pessoal
* Backend e banco podem rodar localmente
* Docker será utilizado apenas se necessário

---

## 📌 Diretrizes de Desenvolvimento

* Cada funcionalidade deve ser pequena e incremental
* Cada commit deve estar funcional
* Não avançar sem testar
* Refatorar continuamente quando necessário
* Evitar código duplicado

---

## 🤖 Uso de IA no Projeto

A IA será utilizada como apoio no desenvolvimento:

* geração de código base
* sugestões de implementação
* criação de testes
* refatoração

O desenvolvedor é responsável por:

* decisões de arquitetura
* regras de negócio
* validação do código gerado

---

## 📈 Estratégia de Desenvolvimento

O desenvolvimento seguirá ciclos curtos:

1. Implementar pequena funcionalidade
2. Testar
3. Ajustar/refatorar
4. Commit
5. Repetir

---

## ⚠️ Princípios Importantes

* Simplicidade acima de complexidade
* Funcional antes de perfeito
* Evolução contínua ao invés de planejamento excessivo
* Disciplina no processo

---
