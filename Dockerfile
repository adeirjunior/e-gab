# Use uma imagem base Node.js
FROM node:20-alpine

# Instale as ferramentas de compilação necessárias
RUN apk add python3 make g++ gcc file nasm autoconf automake libtool

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
COPY ./prisma ./prisma

# Atualize o npm globalmente
RUN npm update -g npm

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . ./

# Comando para rodar a aplicação
CMD ["npm", "run", "dev"]
