FROM trevoreyre/node
ENV HOST 0.0.0.0
USER node

RUN mkdir /home/node/client
RUN mkdir /home/node/client/node_modules
RUN mkdir /home/node/server
RUN mkdir /home/node/server/node_modules

# Install app dependencies
RUN npm install -g @sanity/cli

WORKDIR /home/node
