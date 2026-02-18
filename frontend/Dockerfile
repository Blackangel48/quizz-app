# Image de base
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Port par défaut de Vite
EXPOSE 5173

# Commande pour lancer Vite en mode développement
CMD ["npm", "run", "dev", "--", "--host"]