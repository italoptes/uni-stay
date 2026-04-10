# 🏠 UniStay

**Encontre, cadastre e gerencie moradias estudantis com segurança e simplicidade.**

[![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com)

<br/>

> *Desenvolvido para resolver um problema real: a dificuldade que estudantes enfrentam ao chegar em uma nova cidade e precisar encontrar moradia.*

<br/>

---

## 📖 Sobre o Projeto

O **UniStay** é uma plataforma full-stack que conecta estudantes a opções de moradia de forma segura e organizada. A aplicação foi construída com foco em boas práticas de engenharia de software, incluindo separação clara de responsabilidades, arquitetura em camadas e autenticação moderna via JWT.

Com o UniStay, o usuário pode:

- 🔐 Criar conta e autenticar-se com segurança (JWT stateless)
- 🏘️ Visualizar residências disponíveis sem precisar de login
- 🔍 Visualizar detalhes de residências publicadas
- ➕ Cadastrar e gerenciar suas próprias residências após autenticação
- 📋 Administrar suas próprias publicações em uma área pessoal

---

## 🛠️ Tecnologias

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
      <td rowspan="7"><strong>⚙️ Backend</strong></td>
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
    <tr>
      <td rowspan="2"><strong>☁️ Infra</strong></td>
      <td>Docker + Docker Compose</td>
      <td>Containerização e orquestração</td>
    </tr>
    <tr>
      <td>Nginx</td>
      <td>Servidor do frontend em produção</td>
    </tr>
  </tbody>
</table>

---

## ☁️ Deploy

A aplicação está **completamente deployada em produção** com domínio personalizado, separação entre backend, frontend e banco de dados em serviços cloud independentes.

🌐 **Acesse agora: [unistay.shop](https://unistay.shop)**

---

### 🏗️ Arquitetura de Deploy

```
Usuário (Browser)
↓
Frontend → Vercel (unistay.shop)
↓ HTTPS (Axios)
Backend → Render (Web Service)
↓
PostgreSQL → Render (Managed DB)
```

| Camada | Serviço | Status |
|--------|---------|--------|
| **Frontend** | Vercel + domínio personalizado (`unistay.shop`) | ✅ Online |
| **Backend (API)** | Render (Docker — Web Service) | ✅ Online |
| **Banco de Dados** | PostgreSQL gerenciado pelo Render | ✅ Conectado |

---

### 🔙 Backend (Render)

O backend é uma aplicação Spring Boot containerizada com Docker e executada como Web Service no Render.

**Build:**
- Multi-stage Docker build com Maven Wrapper (`./mvnw clean package`)
- Imagem final contém apenas o runtime Java (leve e otimizada)

**Configuração via variáveis de ambiente:**

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
PORT=8080
```

> Nenhuma configuração sensível está hardcoded no código.

---

### 🗄️ Banco de Dados (Render)

- PostgreSQL provisionado e gerenciado pelo Render
- Acesso via URL interna (baixa latência com o backend)
- Schema gerenciado automaticamente pelo Hibernate:

```properties
spring.jpa.hibernate.ddl-auto=update
```

---

### 🌐 Frontend (Vercel)

O frontend está deployado no Vercel com domínio personalizado e se comunica com o backend via variável de ambiente:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

---

### 🔒 Segurança

- Autenticação via JWT (stateless)
- Token enviado no header: `Authorization: Bearer <token>`
- Backend e banco desacoplados do ambiente local
- CORS configurado para aceitar requisições do domínio de produção

---

## 🏛️ Arquitetura

O projeto segue uma arquitetura em **camadas bem definidas**, garantindo separação clara de responsabilidades e facilidade de manutenção.

### ⚙️ Backend
entity → repository → service → controller

| Camada | Responsabilidade |
|--------|-----------------|
| `Controllers` | Endpoints REST — sem regra de negócio |
| `Services` | Regras de negócio |
| `Repositories` | Acesso ao banco via JPA |
| `DTOs` | Comunicação segura entre camadas |
| `Security` | Autenticação JWT stateless |

### 🎨 Frontend
pages → components → services → context → routes

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

### Acesso Autenticado

Usuários autenticados podem:

- criar residências
- editar e remover apenas suas próprias residências
- acessar a página pessoal `"/my-residences"`

> A autorização de edição e remoção é validada no backend com base no usuário autenticado via JWT.

---

## 🖼️ Upload de Imagens

- Upload feito diretamente do frontend para o Cloudinary usando upload preset unsigned
- O backend recebe apenas a URL final da imagem
- Campo `imageUrl` é opcional em todas as operações de residência
- Formatos aceitos: jpg, png, webp — tamanho máximo: 5MB
- Imagens armazenadas na pasta `unistay/residences` no Cloudinary

---

## 🐳 Docker

O projeto está totalmente containerizado com **Docker Compose**, permitindo subir toda a stack com um único comando.

### Estrutura de containers

| Container | Imagem | Porta |
|-----------|--------|-------|
| `unistay-postgres` | postgres:15 | 5432 |
| `unistay-backend` | eclipse-temurin:21-jdk | 8080 |
| `unistay-frontend` | nginx:alpine | 80 |

### Arquivos de configuração

```
/backend
  Dockerfile          # Build do .jar com Maven Wrapper
/frontend
  Dockerfile          # Build do React + serve com Nginx
docker-compose.yml    # Orquestração dos 3 containers
.env                  # Variáveis de ambiente (não versionar)
```

### Variáveis de ambiente (`.env`)

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/unistay
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=sua_senha

JWT_SECRET=sua_chave_super_segura
```

> ⚠️ O host do banco dentro do Docker é `postgres` (nome do container), não `localhost`.

### `application.properties` (configuração com variáveis de ambiente)

```properties
server.port=${PORT:8080}

spring.datasource.url=${SPRING_DATASOURCE_URL}
spring.datasource.username=${SPRING_DATASOURCE_USERNAME}
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

api.security.secret=${JWT_SECRET}
```

### CORS

O backend está configurado para aceitar requisições de origens diferentes. Em `SecurityConfig.java`, as origens permitidas incluem tanto o ambiente local quanto o ambiente de produção:

```java
configuration.setAllowedOrigins(List.of(
                                        "http://localhost:3000",
    "http://localhost:5173",
                                        "https://unistay.shop"
));
```

---

## ▶️ Como Executar

### Com Docker (recomendado)

**Pré-requisitos:** Docker e Docker Compose plugin instalados.

```bash
# Clonar o repositório
git clone https://github.com/italoptes/unistay.git
cd unistay

# Subir toda a stack
docker compose up -d --build
```

Acesse:
- Frontend → **`http://localhost:3000`**
- Backend / Swagger → **`http://localhost:8080/swagger-ui.html`**

Para derrubar:
```bash
docker compose down
```

Para rebuildar após mudanças:
```bash
docker compose down
docker compose up -d --build
```

---

### Sem Docker (desenvolvimento local)

**Pré-requisitos:** Java 21+, Node.js 18+, PostgreSQL rodando localmente.

#### ⚙️ Backend

```bash
cd backend
mvn spring-boot:run
```

Servidor disponível em: **`http://localhost:8080`**

Swagger: **`http://localhost:8080/swagger-ui.html`**

#### 🎨 Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em: **`http://localhost:5173`**

> Ao rodar sem Docker, ajuste o `.env` do frontend:
> ```env
> VITE_API_URL=http://localhost:8080
> ```

---

## 📡 Endpoints Principais

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth/login` | Autenticação do usuário |
| `POST` | `/users` | Cadastro de novo usuário |
| `GET` | `/residences` | Listar residências (público) — suporta `?page=0&size=9` |
| `GET` | `/residences/{id}` | Buscar residência por ID (público) |
| `GET` | `/residences/me` | Listar residências do usuário autenticado |
| `POST` | `/residences` | Criar nova residência (autenticado) |
| `PUT` | `/residences/{id}` | Atualizar residência própria (autenticado) |
| `DELETE` | `/residences/{id}` | Remover residência própria (autenticado) |

> Resposta paginada de `GET /residences`:
> ```json
> {
>   "content": [...],
>   "currentPage": 0,
>   "totalPages": 5,
>   "totalElements": 43
> }
> ```

---

## 🖥️ Comportamento do Frontend

### Home Page
- pública, somente leitura
- exibe todas as residências com navegação `Ver detalhes`

### Página de Detalhes
- rota pública: `"/residences/:id"`

### Página `"/my-residences"`
- protegida por autenticação
- lista residências do usuário autenticado
- permite editar e excluir

### Navbar

| Sem autenticação | Com autenticação |
|-----------------|-----------------|
| Início | Início |
| Entrar | Minhas residências |
| Cadastrar | Nova residência |
| — | Sair |

---

## ✅ Validação e Tratamento de Erros

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

| Status | Significado |
|--------|-------------|
| `400` | Erros de validação |
| `401` | Falha de autenticação |
| `403` | Falha de autorização |

---

## 🔄 Fluxo Principal

1. Usuário acessa a plataforma sem login
2. Navega pela listagem pública de residências
3. Visualiza os detalhes de uma residência
4. Realiza cadastro ou login
5. Gerencia suas próprias residências em `"/my-residences"`

---

## 📊 Status do Projeto

| Funcionalidade | Status |
|----------------|--------|
| Backend completo | ✅ Concluído |
| Autenticação com JWT | ✅ Concluído |
| Frontend estruturado com React + Tailwind | ✅ Concluído |
| Login integrado com backend | ✅ Concluído |
| Separação entre rotas públicas e protegidas | ✅ Concluído |
| CRUD de residências com área pessoal | ✅ Concluído |
| Redesign de UI | ✅ Concluído |
| Filtros client-side por texto e preço | ✅ Concluído |
| Validação no frontend | ✅ Concluído |
| Página 404 | ✅ Concluído |
| Interceptor Axios 401/403 | ✅ Concluído |
| Upload de imagem via Cloudinary | ✅ Concluído |
| Paginação no backend com Pageable | ✅ Concluído |
| Docker + Docker Compose | ✅ Concluído |
| Deploy em Render + Vercel | ✅ Concluído |
| Domínio personalizado (unistay.shop) | ✅ Concluído |

---

## 🎯 Objetivos do Projeto

- 💼 **Portfólio profissional** — demonstração prática de habilidades full-stack
- 🏗️ **Boas práticas** — arquitetura limpa e separação de responsabilidades
- 🎓 **Solução real** — plataforma pensada para um problema concreto de estudantes

---

## 👨‍💻 Autor

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