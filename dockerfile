# Étape 1 : Construire l'application Angular
FROM node:alpine AS build

WORKDIR /usr/src/app

# Copier les fichiers de l'application
COPY . .

# Installer les dépendances et compiler l'application Angular en mode production
RUN npm install -g @angular/cli && \
    npm install && \
    ng build --prod

# Étape 2 : Servir les fichiers compilés avec Nginx
FROM nginx:alpine

# Copier les fichiers compilés depuis l'étape de build vers le dossier Nginx
COPY --from=build /usr/src/app/dist/frontendFormation/usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
