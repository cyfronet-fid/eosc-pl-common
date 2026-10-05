FROM node:20-bookworm AS build
WORKDIR /usr/src/app

RUN corepack enable

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN npx gulp build --production --env env/env.production.js \
    && npx gulp build --production --env env/env.development.js \
    && npx gulp build --production --env env/env.beta.js \
    && yarn run build:docs

FROM nginx:1.27-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf \
    && cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index docs/index.html;

    location / {
        try_files $uri $uri/ /docs/index.html;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
