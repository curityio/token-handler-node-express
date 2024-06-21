FROM node:20-bookworm-slim

RUN groupadd --gid 10000 apiuser \
  && useradd --uid 10001 --gid apiuser --shell /bin/bash --create-home apiuser

WORKDIR /usr/oauth-agent
COPY --chown=10001:10000 dist                /usr/oauth-agent/dist
COPY --chown=10001:10000 package*.json       /usr/oauth-agent/

RUN npm install --omit=dev

USER 10001

CMD ["node", "dist/server.js"]
