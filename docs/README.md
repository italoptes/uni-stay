<div align="center">

<br/>

# 🏡 UniStay

**Encontre, cadastre e gerencie moradias estudantis com segurança e simplicidade.**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

<br/>

> *Desenvolvido para resolver um problema real: a dificuldade que estudantes enfrentam ao chegar em uma nova cidade e precisar encontrar moradia.*

<br/>

</div>

---

## 📌 Sobre o Projeto

O **UniStay** é uma plataforma full-stack que conecta estudantes a opções de moradia de forma segura e organizada. A aplicação foi construída com foco em **boas práticas de engenharia de software**, separação clara de responsabilidades e autenticação moderna via JWT.

Com o UniStay, o usuário pode:

- 🔐 Criar conta e autenticar-se com segurança (JWT stateless)
- 🏠 Cadastrar e gerenciar suas propriedades
- 🔍 Visualizar residências disponíveis
- 📋 Administrar suas próprias publicações

---

## 🚀 Tecnologias

<table>
  <thead>
    <tr>
      <th>Camada</th>
      <th>Tecnologia</th>
      <th>Finalidade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="6"><strong>🔙 Backend</strong></td>
      <td>Java 21</td>
      <td>Linguagem principal</td>
    </tr>
    <tr>
      <td>Spring Boot 4</td>
      <td>Framework base</td>
    </tr>
    <tr>
      <td>Spring Security + JWT</td>
      <td>Autenticação stateless</td>
    </tr>
    <tr>
      <td>Spring Data JPA</td>
      <td>Persistência de dados</td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td>Banco de dados relacional</td>
    </tr>
    <tr>
      <td>Swagger (springdoc-openapi)</td>
      <td>Documentação da API</td>
    </tr>
    <tr>
      <td rowspan="4"><strong>🎨 Frontend</strong></td>
      <td>React + Vite</td>
      <td>Interface do usuário</td>
    </tr>
    <tr>
      <td>TailwindCSS</td>
      <td>Estilização utilitária</td>
    </tr>
    <tr>
      <td>Axios</td>
      <td>Requisições HTTP</td>
    </tr>
    <tr>
      <td>React Router</td>
      <td>Navegação entre páginas</td>
    </tr>
  </tbody>
</table>

---

## 🧠 Arquitetura

O projeto segue uma arquitetura em **camadas bem definidas**, garantindo separação clara de responsabilidades e facilidade de manutenção.

### 🔙 Backend

```
entity → repository → service → controller
```

| Camada | Responsabilidade |
|--------|-----------------|
| `Controllers` | Endpoints REST — sem regra de negócio |
| `Services` | Regras de negócio — testadas com TDD |
| `Repositories` | Acesso ao banco via JPA |
| `DTOs` | Comunicação segura entre camadas |
| `Security` | Autenticação JWT stateless |

### 🎨 Frontend

```
pages → components → services → context → routes
```

| Camada | Responsabilidade |
|--------|-----------------|
| `Pages` | Telas da aplicação |
| `Components` | Elementos reutilizáveis |
| `Services` | Integração com a API |
| `Context` | Estado global de autenticação |
| `Routes` | Controle de navegação e proteção |

---

## 🔐 Autenticação

- Login via **JWT (JSON Web Token)**
- Token armazenado no `localStorage`
- **Interceptor Axios** para envio automático do token em todas as requisições
- Rotas protegidas *(em andamento)*

---

## ⚙️ Como Executar

### Pré-requisitos

- Java 21+
- Node.js 18+
- PostgreSQL rodando localmente

---

### 📦 Backend

```bash
cd backend
mvn spring-boot:run
```

Servidor disponível em: **`http://localhost:8080`**

Documentação Swagger: **`http://localhost:8080/swagger-ui.html`**

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em: **`http://localhost:5173`**

---

## 📡 Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/login` | Autenticação do usuário |
| `POST` | `/users` | Cadastro de novo usuário |
| `GET` | `/residences` | Listar todas as residências |
| `POST` | `/residences` | Criar nova residência |

> Documentação completa disponível via Swagger em `http://localhost:8080/swagger-ui.html`

---

## 📊 Status do Projeto

| Funcionalidade | Status |
|----------------|--------|
| Backend completo e testado | ✅ Concluído |
| Autenticação com JWT | ✅ Concluído |
| Frontend estruturado com React + Tailwind | ✅ Concluído |
| Login integrado com backend | ✅ Concluído |
| Proteção de rotas no frontend | 🚧 Em andamento |
| CRUD completo de residências no frontend | 🚧 Em andamento |
| Deploy (Docker + Cloud) | 📋 Planejado |

---

## 🎯 Objetivos do Projeto

O UniStay foi desenvolvido com múltiplos propósitos:

- 💼 **Portfólio profissional** — demonstração prática de habilidades full-stack
- 🧪 **Boas práticas** — TDD, arquitetura limpa e separação de responsabilidades
- 🌍 **Solução real** — plataforma pensada para um problema concreto de estudantes universitários

---

## 📋 Próximos Passos

- [ ] Proteção de rotas no frontend
- [ ] CRUD completo de residências no frontend
- [ ] Deploy com Docker + Cloud
- [ ] Melhorias de UX/UI
- [ ] Sistema de favoritos ou contato direto entre usuários

---

## 🧑‍💻 Autor

<div align="center">

**Ítalo Pontes**

Focado em backend, arquitetura e sistemas escaláveis — em constante evolução e aprendizado.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/italopontes)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/italoptes)

</div>

---

<div align="center">

*Se este projeto te ajudou ou chamou atenção, deixe uma* ⭐ *no repositório!*

</div>