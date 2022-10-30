FROM ubuntu:22.04

WORKDIR /usr/src/app

ADD --keep-git-dir=true https://github.com/LeVernicus/discord_practice_bot.git /buildkit

RUN npm install discord.js
RUN npm install dotenv

CMD [ "node", "index.js" ]

EXPOSE 80/TCP
EXPOSE 80/UDP
EXPOSE 443/TCP
EXPOSE 443/UDP