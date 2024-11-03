# Usa uma imagem base do Node.js
FROM node:20

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para o contêiner
COPY . .

# Exponha a porta 3000
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
