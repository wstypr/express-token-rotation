# choose the base image
FROM node:lts

# set working directory
WORKDIR /app

# copy files t /app
COPY . .

RUN npm install

ENV PORT=8000
ENV DB_URI=mongodb://user:password@mongodb:27017
ENV ACCESS_TOKEN_KEY=0BKO8y7UyTnSnr9nqGhmST/u1HEOVfp/YEIlw3hJgbg=
ENV REFRESH_TOKEN_KEY=QEgdzgpnuhyTRBvWZHW/KXCQ3+cQK36ziC9y/aKQvZc=
ENV ACCESS_TOKEN_EXPIRE=300
ENV REFRESH_TOKEN_EXPIRE=7d

EXPOSE 8000

CMD ["npm", "run", "start"]