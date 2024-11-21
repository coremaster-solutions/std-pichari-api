# STD Sistema de Trámite Documentario

## Initial project

### Softwares requirement

1. Install Redis for management jobs
   - Homebrew for (Mac OS) https://formulae.brew.sh/formula/redis
2. Install Libreoffice for convert documents with extension .doc .docx
   - Follow this page for Mac OS https://www.libreoffice.org/get-help/install-howto/macos/

### Install dependencies

```bash
pnpm install
```

### Copy file .env.example to .env

```bash
cp .env.example .env
```

### Run project

```bash
pnpm run dev
```

### Build project

```bash
pnpm run build
```

## Database commands

### Run migrate

```bash
pnpm run db:migrate
```

### Run seed with default data

```bash
pnpm run db:seed
```
