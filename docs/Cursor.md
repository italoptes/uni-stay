# 🏠 Student Housing System

## 📌 Visão do Projeto

Sistema web para auxiliar estudantes a cadastrar e visualizar residências disponíveis para moradia.

A aplicação permite que usuários criem contas, realizem autenticação segura e gerenciem residências de forma prática e direta.

---

## 🎯 Objetivo

Desenvolver uma aplicação funcional do zero até produção em 1 semana, utilizando boas práticas de engenharia de software como:

* pequenas entregas contínuas
* testes automatizados (TDD)
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

* Java 21
* Spring Boot 4
* Spring Web MVC
* Spring Data JPA
* Spring Security (JWT, stateless)

### Frontend

* React
* HTML
* CSS

### Banco de Dados

* PostgreSQL

### Ferramentas

* Git + GitHub
* JUnit + Mockito (TDD)
* Docker (planejado)
* Swagger (springdoc-openapi)

---

## 🏗️ Arquitetura Backend

Arquitetura em camadas:

* **Controller** → entrada das requisições HTTP (sem lógica de negócio)
* **Service** → regras de negócio (testadas com TDD)
* **Repository** → acesso ao banco de dados
* **Entity** → entidades JPA
* **DTO** → entrada/saída da API (records)
* **Security** → autenticação e autorização (JWT)
* **OpenAPI** → documentação Swagger separada por interface

---

## 📂 Estrutura do Projeto

```
/backend
/frontend
/docs

/src/main/java/com/unistay/demo
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── security
 ├── api/dto
 ├── api/openapi
 └── api/exception
```

---

## 🧩 Entidades

### User

* id
* username (único)
* password (criptografado)
* phoneNumber
* implementa `UserDetails` (Spring Security)

---

### Residence

* id
* title
* description
* location
* price (> 0)
* contactPhone
* user (dono da residência)

---

## 🔐 Segurança

A aplicação utiliza autenticação **stateless com JWT**:

* Login via `/auth/login`
* Token enviado via header:

  ```
  Authorization: Bearer <token>
  ```
* Token validado em filtro (`SecurityFilter`)
* Usuário autenticado disponível via `SecurityContext`

### Regras:

* Apenas usuários autenticados podem acessar endpoints protegidos
* Usuário só pode editar/deletar suas próprias residências
* Nenhum `userId` é recebido via request (segurança baseada no token)

---

## 🧪 Funcionalidades (MVP)

### Autenticação

* Cadastro de usuário
* Login com geração de JWT

---

### Residências

* Criar residência (autenticado)
* Listar residências
* Atualizar residência (somente dono)
* Deletar residência (somente dono)

---

## 🔄 Fluxo Principal

1. Usuário se cadastra
2. Realiza login e recebe token JWT
3. Envia token nas requisições
4. Cadastra uma residência
5. Visualiza residências disponíveis
6. Edita/remove suas próprias residências

---

## ⚙️ Regras de Negócio

* Usuário deve estar autenticado para cadastrar residência
* Usuário só pode editar/deletar suas próprias residências
* Username deve ser único
* Password deve ser armazenado de forma segura (BCrypt)
* Dados inválidos geram exceções tratadas globalmente

---

## 🧪 Testes

* Testes unitários com JUnit + Mockito
* Foco na camada de Service
* Garantia das regras de negócio via TDD

---

## 📡 API

### Padrões utilizados:

* REST
* ResponseEntity
* HTTP status codes corretos
* DTOs (records) para entrada/saída
* GlobalExceptionHandler

---

## 📘 Documentação (Swagger)

A API possui documentação interativa via Swagger:

👉 http://localhost:8080/swagger-ui.html

### Características:

* Documentação separada via interfaces (`api.openapi`)
* Controllers implementam essas interfaces
* Endpoints públicos liberados no Spring Security

---

## 🚀 Deploy

* Aplicação rodará inicialmente em homelab
* Backend + PostgreSQL local
* Docker será utilizado posteriormente

---

## 📌 Diretrizes de Desenvolvimento

* Cada funcionalidade deve ser pequena e incremental
* Cada commit deve estar funcional
* Não avançar sem testar
* Refatorar continuamente
* Evitar código duplicado

---

## 🤖 Uso de IA no Projeto

A IA é utilizada como apoio no desenvolvimento:

* geração de código base
* sugestões de implementação
* criação de testes
* refatoração

O desenvolvedor é responsável por:

* decisões de arquitetura
* regras de negócio
* validação do código

---

## 📈 Estratégia de Desenvolvimento

O desenvolvimento segue ciclos curtos:

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

## 🔮 Próximos Passos

* Validação com Bean Validation (@Valid)
* Desenvolvimento do frontend (React + Vite)
* Integração completa frontend/backend
* Dockerização
* Deploy

---
