FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm i

CMD ["npm", "start"]