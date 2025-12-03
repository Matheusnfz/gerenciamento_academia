# Backend - Gerenciamento de Academia

## Requisitos
- Node.js 18+ recomendado
- MongoDB (local ou Atlas)

## Instalação
1. Copie `.env.example` para `.env` e ajuste variáveis.
2. `npm install`
3. Rodar MongoDB (ex: `mongod`) ou usar Docker.
4. Rodar seed admin: `npm run seed`
5. Rodar em dev: `npm run dev`

API padrão: `http://localhost:3001/api`

CORS: configurado para `CORS_ORIGIN` no `.env`.

Endpoints principais:
- `POST /api/auth/register`
- `POST /api/auth/login`
- CRUD: `/api/alunos`, `/api/planos`, `/api/matriculas`, `/api/exercicios`, `/api/treinos`, `/api/presencas`, `/api/pagamentos`

Use token JWT no header:
`Authorization: Bearer <token>`
