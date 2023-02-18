# Seleccionar una imagen base con Node.js
FROM node:lts-alpine as build-stage

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de la aplicación al contenedor
COPY . .

# Instalar las dependencias de la aplicación
RUN npm install

# Construir la aplicación para producción
RUN npm run build

# Instalar http-server
RUN npm install -g http-server

# Establecer una variable de entorno para la URL de la API raíz
ENV VITE_APP_ROOT_API=${VITE_APP_ROOT_API}

# EXPOSE 9000

# Ejecutar el servidor
CMD [ "http-server", "dist", "-p", "9000" ]

