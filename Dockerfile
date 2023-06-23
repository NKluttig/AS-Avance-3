# Imagen base
FROM node:14-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de la aplicación
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Puerto expuesto por la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD [ "npm", "start" ]
