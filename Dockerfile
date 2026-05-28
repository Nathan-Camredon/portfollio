# Étape 1 : Build de l'application
FROM node:20-alpine AS build
WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./
# Installation propre des dépendances
RUN npm ci

# Copie du reste du code source
COPY . .

# Compilation de l'application Vite
RUN npm run build

# Étape 2 : Serveur Nginx pour la production
FROM nginx:alpine

# Suppression de la page par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie des fichiers compilés depuis l'étape de build
COPY --from=build /app/dist /usr/share/nginx/html

# Copie de notre configuration Nginx optimisée pour une SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposition du port 80
EXPOSE 80

# Démarrage de Nginx
CMD ["nginx", "-g", "daemon off;"]
