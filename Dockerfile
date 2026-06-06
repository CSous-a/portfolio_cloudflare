FROM node:22-alpine AS builder

ARG PUBLIC_WEB3FORMS_KEY
ENV PUBLIC_WEB3FORMS_KEY=$PUBLIC_WEB3FORMS_KEY

RUN corepack enable && corepack prepare pnpm@11.5.1 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# remove self-referencing link: dep that cannot be resolved inside the container
RUN node -e " \
  const fs = require('fs'); \
  const p = JSON.parse(fs.readFileSync('package.json', 'utf8')); \
  Object.keys(p.dependencies || {}).forEach(k => { \
    if (String(p.dependencies[k]).startsWith('link:')) delete p.dependencies[k]; \
  }); \
  fs.writeFileSync('package.json', JSON.stringify(p, null, 2)); \
"

RUN pnpm install --no-frozen-lockfile

COPY . .
RUN pnpm build


FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
