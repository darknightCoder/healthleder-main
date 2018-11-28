FROM node:10.5.0 as builder
RUN mkdir /rate-management
WORKDIR /rate-management
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM node:10.5.0
RUN mkdir /rate-management
WORKDIR /rate-management
COPY ./package.json ./package-lock.json ./
RUN npm install --only=prod
COPY --from=builder /rate-management/dist ./dist
CMD npm run start