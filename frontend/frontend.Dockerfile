# Stage 1: Build React app
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .
RUN npm run build

# Stage 2: Serve via Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
