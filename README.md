# Painel de Veículos MOBS2

## Visão Geral
Este projeto é uma aplicação full-stack desenvolvida como parte de um case técnico. O objetivo é criar um painel para visualização de veículos de uma frota no mapa, com dados de telemetria e histórico de posições.

A arquitetura é baseada em microserviços e inclui:

- **Backend 1 (Laravel):** Responsável pelo CRUD de veículos e pela autenticação de usuários via JWT.
- **Backend 2 (NestJS):** Responsável por simular e fornecer dados de telemetria em tempo real a cada 5 segundos.
- **Frontend (Vue 3):** Uma Single Page Application (SPA) para login de usuários e visualização do painel com os veículos no Google Maps.
- **Banco de Dados (PostgreSQL):** Utilizado para a persistência dos dados de usuários e veículos gerenciados pelo Laravel.
- **Orquestração (Docker):** Todos os serviços são containerizados e gerenciados pelo Docker Compose, garantindo um ambiente de desenvolvimento e execução consistente e de fácil configuração.

## Funcionalidades Implementadas
- ✅ Autenticação de usuários com JWT.
- ✅ CRUD completo para o cadastro de veículos.
- ✅ Painel com visualização de múltiplos veículos no Google Maps.
- ✅ Popup com detalhes do veículo ao clicar em um marcador (Placa, Modelo, Velocidade, Combustível, etc.).
- ✅ Campo de busca para filtrar veículos por placa no mapa.
- ✅ Botão para mostrar e ocultar o histórico de posições dos veículos através de polilinhas.
- ✅ **Diferencial:** Atualização da posição dos veículos em tempo real via WebSocket.

## Pré-requisitos
- Docker
- Docker Compose

## Como Rodar o Projeto
Siga os passos abaixo para executar a aplicação completa em seu ambiente local.

### 1. Clonar o Repositório
```bash
git clone <URL_DO_SEU_REPOSITORIO_AQUI>
cd mobs2-case-tenico
```

### 2. Configurar Variáveis de Ambiente
Antes de iniciar, é necessário configurar as chaves de API e outras variáveis.

**Frontend (Vue.js):**
Crie o arquivo `frontend-vue/.env` e adicione sua chave da API do Google Maps:
```bash
VITE_GOOGLE_MAPS_API_KEY=SUA_CHAVE_DA_API_DO_GOOGLE_MAPS_AQUI
```

**Backend (Laravel):**
O arquivo `backend-laravel/.env.example` já serve como base. O `docker-compose.yml` injeta as variáveis do banco de dados automaticamente.

### 3. Instalar Dependências do Frontend
O `node_modules` do frontend precisa ser criado para que o editor de código (VS Code) funcione corretamente. Use o Docker para isso, sem precisar instalar Node.js na sua máquina:
```bash
docker compose run --rm vue npm install
```

### 4. Iniciar a Aplicação com Docker Compose
Este comando irá construir as imagens e iniciar todos os containers em background.
```bash
docker compose up -d --build
```

### 5. Preparar o Banco de Dados do Laravel
Com os containers rodando, execute as migrações e os "seeders" para criar as tabelas e popular o banco com dados de exemplo.
```bash
docker compose exec laravel php artisan migrate --seed
```

### Aplicação Pronta!
- **Frontend:** [http://localhost:5173](http://localhost:5173)
- **API Laravel:** [http://localhost:8000](http://localhost:8000)
- **API NestJS:** [http://localhost:3000](http://localhost:3000)

**Credenciais de Exemplo (criadas pelo seeder):**
- Email: `test@example.com`
- Senha: `password`

## Como Rodar os Testes Unitários
Para executar os testes de cada serviço, utilize os seguintes comandos:

**Laravel:**
```bash
docker compose exec laravel php artisan test
```

**NestJS:**
```bash
docker compose exec nestjs npm run test
```

## Endpoints da API
### Laravel (Autenticação e Veículos)
- `POST /api/register` - Cria um novo usuário.
- `POST /api/login` - Autentica um usuário e retorna um token JWT.
- `GET /api/vehicles` - Lista todos os veículos (requer autenticação).
- `POST /api/vehicles` - Cria um novo veículo (requer autenticação).
- `PUT /api/vehicles/:id` - Atualiza um veículo existente (requer autenticação).
- `DELETE /api/vehicles/:id` - Remove um veículo (requer autenticação).

### NestJS (Telemetria)
- `GET /telemetry/:vehicleId` - Retorna os dados de telemetria mais recentes para um veículo específico.
- `GET /telemetry/:vehicleId/history` - Retorna o histórico de posições para um veículo.
