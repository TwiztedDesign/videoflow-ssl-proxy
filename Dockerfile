FROM node:12.19.0-alpine3.10
WORKDIR /usr/ssl-proxy
COPY package*.json /usr/ssl-proxy/
RUN npm install
COPY ./ /usr/ssl-proxy/
CMD ["npm", "run", "start"]
EXPOSE 80
EXPOSE 443