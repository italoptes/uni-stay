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

O **UniStay** é uma plataforma full-stack que conecta estudantes a opções de moradia de forma segura e organizada.A aplicação foi construída com foco em boas práticas de engenharia de software, incluindo separação clara de responsabilidades, arquitetura em camadas e autenticação moderna via JWT.

Com o UniStay, o usuário pode:

- 🔐 Criar conta e autenticar-se com segurança (JWT stateless)
- 🔍 Visualizar residências disponíveis sem precisar de login
- 🏠 Visualizar detalhes de residências publicadas
- 🏠 Cadastrar e gerenciar suas próprias residências após autenticação
- 📋 Administrar suas próprias publicações em uma área pessoal

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
      <td rowspan="7"><strong>🔙 Backend</strong></td>
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
      <td>Cloudinary</td>
      <td>Armazenamento de imagens</td>
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
| `Services` | Regras de negócio |
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
- Rotas protegidas no frontend para ações privadas

### Acesso Público

- `GET /residences`
- `GET /residences/{id}`
- Página inicial `"/"`

Sem autenticação, o usuário pode:

- visualizar todas as residências
- acessar os detalhes de cada residência

### Acesso Autenticado

Usuários autenticados podem:

- criar residências
- editar e remover apenas suas próprias residências
- acessar a página pessoal `"/my-residences"`

> A autorização de edição e remoção continua sendo validada no backend com base no usuário autenticado via JWT.

---

## 🖼️ Upload de Imagens

- O upload é feito diretamente do frontend para o Cloudinary usando um upload preset unsigned
- O backend recebe apenas a URL final da imagem, sem contato direto com a API do Cloudinary
- Campo `imageUrl` é opcional em todas as operações de residência
- Formatos aceitos: jpg, png, webp
- Tamanho máximo: 5MB (validado no frontend)
- As imagens ficam armazenadas na pasta `unistay/residences` no Cloudinary

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
| `GET` | `/residences` | Listar todas as residências (público) |
| `GET` | `/residences/{id}` | Buscar residência por ID (público) |
| `GET` | `/residences/me` | Listar residências do usuário autenticado |
| `POST` | `/residences` | Criar nova residência (autenticado) |
| `PUT` | `/residences/{id}` | Atualizar residência própria (autenticado) |
| `DELETE` | `/residences/{id}` | Remover residência própria (autenticado) |

> O campo `imageUrl` é opcional em `POST /residences` e `PUT /residences/{id}`. A URL é gerada pelo Cloudinary no frontend antes de ser enviada ao backend.
>
> Documentação completa disponível via Swagger em `http://localhost:8080/swagger-ui.html`

### `GET /residences/me`

Retorna apenas as residências pertencentes ao usuário autenticado.

- utiliza o usuário resolvido a partir do JWT
- não recebe `userId` na request
- é usado pelo frontend na página `"/my-residences"`

---

## 🖥️ Comportamento do Frontend

### Home Page

- pública
- exibe todas as residências
- comportamento somente leitura
- contém navegação `Ver detalhes`
- não exibe ações de editar ou excluir

### Página de Detalhes

- rota pública: `"/residences/:id"`
- exibe as informações da residência selecionada

### Página `"/my-residences"`

- protegida por autenticação
- lista apenas as residências do usuário autenticado
- permite editar e excluir

### Navbar

Sem autenticação:

- `Início`
- `Entrar`
- `Cadastrar`

Com autenticação:

- `Início`
- `Minhas residências`
- `Nova residência`
- `Sair`

---

## ✅ Validação e Tratamento de Erros

O backend utiliza **Bean Validation** nos DTOs de entrada e tratamento centralizado com `GlobalExceptionHandler`.

### Respostas estruturadas de validação

Erros de validação de payload retornam HTTP `400` com estrutura compatível para consumo do frontend:

```json
{
  "timestamp": "2026-04-04T16:00:00",
  "status": 400,
  "error": "Validation failed",
  "message": "Validation error",
  "path": "/users",
  "errors": {
    "username": "must not be blank",
    "password": "size must be between 6 and 255"
  }
}
```

### Status importantes

- `400` → erros de validação
- `401` → falha de autenticação, como credenciais inválidas
- `403` → falha de autorização, como tentativa de editar ou excluir residência de outro usuário

---

## 🔄 Fluxo Principal Atual

1. Usuário acessa a plataforma sem precisar de login
2. Navega pela listagem pública de residências
3. Visualiza os detalhes de uma residência
4. Realiza cadastro ou login
5. Gerencia suas próprias residências em `"/my-residences"`

---

## 🚀 Melhorias Recentes

- upload de imagem de capa para residências via Cloudinary (upload direto do frontend, backend salva apenas a URL)
- exibição da imagem nos cards da Home e na página de detalhes da residência
- placeholder visual verde com ícone para residências sem imagem
- validação de formato (jpg, png, webp) e tamanho máximo (5MB) no frontend
- separação clara entre acesso público e ações privadas
- endpoint `GET /residences/me` para gerenciamento por usuário autenticado
- validação com resposta estruturada por campo
- melhor feedback visual de erro e sucesso no frontend
- página pessoal para gerenciamento das residências do usuário
- redesign completo das páginas LandingPage, Home, ResidenceDetails e MyResidences
- skeleton loading nas listagens de residências
- filtro client-side por texto (título e localização) e por faixa de preço
- página 404 para rotas inexistentes
- interceptor de resposta Axios para redirecionamento automático em erros 401/403
- validação no frontend nos formulários de criação e edição de residências
- navbar com `sticky top-0` e `z-index` corrigido

---

## 📊 Status do Projeto

| Funcionalidade | Status |
|----------------|--------|
| Backend completo | ✅ Concluído |
| Autenticação com JWT | ✅ Concluído |
| Frontend estruturado com React + Tailwind | ✅ Concluído |
| Login integrado com backend | ✅ Concluído |
| Separação entre rotas públicas e protegidas | ✅ Concluído |
| CRUD de residências com área pessoal do usuário | ✅ Concluído |
| Redesign de UI | ✅ Concluído |
| Filtros client-side por texto e preço | ✅ Concluído |
| Validação no frontend | ✅ Concluído |
| Página 404 | ✅ Concluído |
| Interceptor Axios 401/403 | ✅ Concluído |
| Upload de imagem via Cloudinary | ✅ Concluído |
| Deploy (Docker + Cloud) | 📋 Planejado |

---

## 🎯 Objetivos do Projeto

O UniStay foi desenvolvido com múltiplos propósitos:

- 💼 **Portfólio profissional** — demonstração prática de habilidades full-stack
- 🧪 **Boas práticas** — arquitetura limpa e separação de responsabilidades
- 🌍 **Solução real** — plataforma pensada para um problema concreto de estudantes universitários

---

## 📋 Próximos Passos

- [x] Deploy com Docker + Cloud
- [ ] Melhorias iniciais de UX/UI
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
