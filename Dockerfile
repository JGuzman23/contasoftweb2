# Stage 1: Build the Vue.js app
FROM node:latest as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

RUN npm run build

# Paso 7: Usa nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/dist/* /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

