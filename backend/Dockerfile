# Utilisation d'une image Node légère
FROM node:20-alpine

# Création du dossier de travail
WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Exposition du port (celui défini dans server.js)
EXPOSE 5000

# Commande de lancement
CMD ["node", "server.js"]