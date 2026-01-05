# Image de base
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Exposition du port par défaut de Vite
EXPOSE 5173

# Commande pour lancer Vite en mode développement
# --host est nécessaire pour que Docker puisse rediriger le trafic
CMD ["npm", "run", "dev", "--", "--host"]