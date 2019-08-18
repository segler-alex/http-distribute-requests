FROM node:10-alpine
WORKDIR /root
COPY . /root
RUN npm i
EXPOSE 3000
CMD ["npm","start"]