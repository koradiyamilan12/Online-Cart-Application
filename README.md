# Online Cart Application

The repository contains an Express API and a React frontend for the AMEX Technology Junior Developer technical assessment.

## Frontend

The Phase 0 frontend lives in [`frontend`](./frontend). It uses Vite, React, React Router, Redux Toolkit, Axios, Formik, Yup, Tailwind CSS, shadcn-compatible primitives, and React Icons.

### Run locally

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

The sample `VITE_API_BASE_URL` points to the local Express API at `http://localhost:3000/api`. Do not commit `.env` files containing environment-specific values.

### Quality checks

```bash
npm run lint
npm run build
```

Authentication is designed for the backend's HTTP-only cookie; the frontend never stores JWTs in `localStorage` or `sessionStorage`.
