# Establece la imagen base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto al directorio de trabajo del contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Excluye la carpeta node_modules durante la copia
COPY .dockerignore ./

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
