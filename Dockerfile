# Usamos Node.js 18 como base
FROM node:18

# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm e instalar dependencias
COPY package.json package-lock.json ./

RUN npm install

# Copiar todo el código fuente al contenedor
COPY . .

# Construir la aplicación para producción
RUN npm run build-only

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar en modo producción usando el nuevo script start
CMD ["npm", "run", "start"]