FROM trevoreyre/node
ENV HOST 0.0.0.0
USER node

RUN mkdir /home/node/client
RUN mkdir /home/node/client/node_modules
RUN mkdir /home/node/server
RUN mkdir /home/node/server/node_modules

# Install app dependencies
RUN yarn global add @sanity/cli
RUN yarn global add netlify-cli

WORKDIR /home/node
