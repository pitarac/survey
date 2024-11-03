# Build stage
FROM node:14 as build

# Define o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código e cria o build
COPY . .

# Realiza o build da aplicação React
RUN npm run build

# Production stage
FROM nginx:stable-alpine

# Copia os arquivos do build para o diretório do Nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exponha a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
