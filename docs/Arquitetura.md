# 🏠 Student Housing System

## 📌 Visão do Projeto

Sistema web para auxiliar estudantes a cadastrar e visualizar residências disponíveis para moradia.

A aplicação permite navegação pública pelas residências e, após autenticação, gerenciamento das publicações próprias de forma prática e direta.

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

* React + Vite
* TailwindCSS
* Axios
* React Router

### Banco de Dados

* PostgreSQL

### Ferramentas

* Git + GitHub
* JUnit + Mockito (TDD)
* Docker (planejado)
* Swagger (springdoc-openapi)
* Cloudinary (upload de imagens via preset unsigned)

---

## 🏗️ Arquitetura Backend

Arquitetura em camadas:

* **Controller** → entrada das requisições HTTP (sem lógica de negócio)
* **Service** → regras de negócio
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
 ├── config
 ├── dto
 ├── openapi
 └── exception
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
* imageUrl (opcional, URL gerada pelo Cloudinary)
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

* `GET /residences` e `GET /residences/{id}` são públicos
* `GET /residences/me` exige autenticação
* Apenas usuários autenticados podem acessar endpoints protegidos de criação e manutenção
* Usuário só pode editar/deletar suas próprias residências
* Nenhum `userId` é recebido via request (segurança baseada no token)

---

## 🖼️ Upload de Imagens (Cloudinary)

* Fluxo: frontend envia imagem direto ao Cloudinary → recebe `secure_url` → envia URL para o backend
* O backend nunca contata a API do Cloudinary diretamente
* Upload preset: unsigned (não expõe API secret)
* Pasta no Cloudinary: `unistay/residences`
* Utilitário: `src/utils/uploadImage.js` com função `uploadImage(file)`
* Validações no frontend: formato (jpg, png, webp) e tamanho máximo 5MB
* Campo `imageUrl` é opcional em criação e edição de residências
* Preview da imagem exibido antes do envio com `URL.createObjectURL`
* Loading state durante o upload com botão desabilitado

---

## 📄 Paginação

* Endpoint `GET /residences` aceita `?page=0&size=9`
* Retorna `ResidencePageResponseDTO` com `content`, `currentPage`, `totalPages` e `totalElements`
* Ordenação por `id` decrescente (mais recentes primeiro)
* Frontend controla página atual com estado `currentPage`
* Troca de página dispara nova requisição e scroll suave para o topo
* Filtros de texto e preço resetam `currentPage` para `0` automaticamente
* `GET /residences/me` não é paginado

---

## 🧪 Funcionalidades (MVP)

### Autenticação

* Cadastro de usuário
* Login com geração de JWT

---

### Residências

* Listar residências publicamente
* Listagem pública paginada com parâmetros `page` e `size` (padrão: 9 por página)
* Buscar residência por ID publicamente
* Buscar residências do usuário autenticado em `/residences/me`
* Criar residência (autenticado)
* Atualizar residência (somente dono)
* Deletar residência (somente dono)
* Upload de imagem de capa ao criar/editar residência (opcional)
* Exibição da imagem nos cards da listagem e na página de detalhes
* Placeholder visual para residências sem imagem

---

### Frontend

* Login integrado com backend
* Cadastro de usuário
* Home pública e somente leitura
* Página pública de detalhes da residência
* Página protegida `"/my-residences"`
* Rotas públicas e protegidas funcionando
* CRUD de residências para o próprio usuário
* Estado de autenticação com Context API
* Integração completa com API backend via Axios

---

## 🔄 Fluxo Principal

1. Usuário acessa a plataforma sem login
2. Visualiza a listagem pública de residências
3. Abre os detalhes de uma residência
4. Se cadastra ou realiza login e recebe token JWT
5. Envia token nas requisições autenticadas
6. Gerencia suas próprias residências em `"/my-residences"`

---

## ⚙️ Regras de Negócio

* Usuário não precisa estar autenticado para listar residências ou ver detalhes
* Usuário deve estar autenticado para cadastrar residência
* Usuário só pode editar/deletar suas próprias residências
* Usuário autenticado pode listar apenas suas próprias residências com `/residences/me`
* Username deve ser único
* Password deve ser armazenado de forma segura (BCrypt)
* Dados inválidos geram exceções tratadas globalmente com respostas estruturadas

---

## 🧪 Testes

* Testes unitários planejados com JUnit + Mockito
* Foco previsto na camada de Service
* TDD não está ativo no estado atual do repositório

---

## 📡 API

### Padrões utilizados:

* REST
* ResponseEntity
* HTTP status codes corretos
* DTOs (records) para entrada/saída
* GlobalExceptionHandler
* respostas estruturadas para erros de validação

### Validação e erros

* Bean Validation aplicada nos DTOs de entrada
* `400` para erros de validação
* `401` para falhas de autenticação
* `403` para falhas de autorização

Exemplo de resposta de validação:

```json
{
  "errors": {
    "field": "message"
  }
}
```

### UX do frontend

* feedback de erro por campo em formulários
* mensagens gerais para erros de autenticação ou falhas inesperadas
* mensagens de sucesso após cadastro, criação, edição e exclusão

---

## 📘 Documentação (Swagger)

A API possui documentação interativa via Swagger:

👉 http://localhost:8080/swagger-ui.html

### Características:

* Documentação separada via interfaces (`api.openapi`)
* Implementação atual em `com.unistay.demo.openapi`
* Controllers implementam essas interfaces
* Endpoints públicos liberados no Spring Security

---

## 🚀 Deploy

A aplicação está **completamente deployada em produção** com domínio personalizado.

🌐 **Acesse agora: [unistay.shop](https://unistay.shop)**

### Arquitetura de Deploy

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

### Backend (Render)

Aplicação Spring Boot containerizada com Docker, executada como Web Service no Render.

**Build:** multi-stage Docker com Maven Wrapper (`./mvnw clean package`). Imagem final contém apenas o runtime Java.

**Variáveis de ambiente necessárias:**

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=
JWT_SECRET=
PORT=8080
```

> Nenhuma configuração sensível está hardcoded no código.

### Banco de Dados (Render)

* PostgreSQL provisionado e gerenciado pelo Render
* Acesso via URL interna (baixa latência com o backend)
* Schema gerenciado automaticamente pelo Hibernate (`ddl-auto=update`)

### Frontend (Vercel)

Deployado no Vercel com domínio personalizado. Comunica com o backend via variável de ambiente:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Segurança em Produção

* JWT stateless — token enviado via `Authorization: Bearer <token>`
* CORS configurado para aceitar apenas origens confiáveis:

```java
configuration.setAllowedOrigins(List.of(
    "http://localhost:3000",
    "http://localhost:5173",
    "https://unistay.shop"
));
```

* Backend e banco totalmente desacoplados do ambiente local
* Nenhuma credencial versionada no repositório

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

* Melhorias de UX/UI
* Dockerização
* Deploy

---

## 🆕 Melhorias Recentes

* paginação no backend com Pageable no endpoint `GET /residences`
* `ResidencePageResponseDTO` com `content`, `currentPage`, `totalPages` e `totalElements`
* controles de navegação entre páginas no frontend
* reset automático de página ao aplicar filtros
* exibição do total de residências encontradas
* upload de imagem de capa via Cloudinary com preset unsigned
* utilitário `uploadImage.js` para envio direto ao Cloudinary
* preview de imagem nos formulários de criação e edição
* placeholder verde com ícone SVG para residências sem imagem
* validação de formato e tamanho no frontend antes do upload
* separação entre navegação pública e operações autenticadas
* endpoint `GET /residences/me`
* home pública com visualização somente leitura
* página `"/my-residences"` para gerenciamento do usuário
* validação estruturada com erros por campo
* feedback visual de sucesso e erro no frontend
* redesign completo das páginas LandingPage, Home, ResidenceDetails e MyResidences
* skeleton loading nas listagens de residências
* filtro client-side por texto (título e localização) e por faixa de preço
* página 404 para rotas inexistentes
* interceptor de resposta Axios para redirecionamento automático em erros 401/403
* validação no frontend nos formulários de criação e edição de residências
* navbar com `sticky top-0` e `z-index` corrigido

---