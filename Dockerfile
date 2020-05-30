# Pull node image
FROM node:12.17.0-alpine3.11 as build-stage

# set working directory
WORKDIR /app

# add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy files
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent


#add app
COPY . ./

# start app
CMD ["npm", "start"]


# docker build -t samplereact
# docker run  -it  --rm -v ${PWD}:/app  -v /app/node_modules    -p 3001:3000   -e CHOKIDAR_USEPOLLING=true   samplereact
# docker run  -it  --rm -v %cd%:/app  -v /app/node_modules    -p 3001:3000   -e CHOKIDAR_USEPOLLING=true   samplereact