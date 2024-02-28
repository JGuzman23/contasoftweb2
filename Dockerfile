# Stage 1: Build the Vue.js app
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build

# Stage 2: Serve the built Vue.js app using Nginx
FROM nginx:alpine
COPY --from=node /app/dist/sakai-ng /usr/share/nginx/html/

