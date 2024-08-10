# choose the base image
FROM node:lts

# set working directory
WORKDIR /app

# copy files t /app
COPY . .

RUN npm install

ENV PORT=8000
ENV DB_URI=mongodb+srv://devscale17:GYDhBOS0SSPF7sUc@devscalecluster.rs3arjh.mongodb.net/assignment3?retryWrites=true&w=majority&appName=DevscaleCluster
ENV ACCESS_TOKEN_KEY=0BKO8y7UyTnSnr9nqGhmST/u1HEOVfp/YEIlw3hJgbg=
ENV REFRESH_TOKEN_KEY=QEgdzgpnuhyTRBvWZHW/KXCQ3+cQK36ziC9y/aKQvZc=
ENV ACCESS_TOKEN_EXPIRE=300
ENV REFRESH_TOKEN_EXPIRE=7d

EXPOSE 8000

CMD ["npm", "run", "start"]