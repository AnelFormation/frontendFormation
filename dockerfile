# Étape 1 : Construire l'application Angular
FROM node:alpine AS build

WORKDIR /usr/src/app

# Copier les fichiers de l'application
COPY . .

# Installer Angular CLI, les dépendances et construire l'application
RUN npm install -g @angular/cli && \
    npm install && \
    ng build --configuration production

# Étape 2 : Servir les fichiers compilés avec Nginx
FROM nginx:alpine

# Copier les fichiers compilés depuis l'étape de build vers le dossier Nginx
COPY --from=build /usr/src/app/dist/frontend-formation /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
