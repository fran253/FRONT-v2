FROM node:18-alpine AS build-stage
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:alpine AS production-stage

# Crear configuración de Nginx directamente en el Dockerfile
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 30d; \
        add_header Cache-Control "public, no-transform"; \
    } \
    \
    location /src/assets/ { \
        alias /usr/share/nginx/html/src/assets/; \
        expires 30d; \
        add_header Cache-Control "public, no-transform"; \
    } \
    \
    location = /index.html { \
        add_header Cache-Control "no-cache, no-store, must-revalidate"; \
        add_header Pragma "no-cache"; \
        add_header Expires 0; \
    } \
    \
    location ~ /\. { \
        deny all; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copiar archivos construidos desde la etapa de build
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copiar carpeta de assets para mantener rutas originales
COPY --from=build-stage /app/src/assets /usr/share/nginx/html/src/assets

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]