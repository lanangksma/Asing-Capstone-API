FROM node:20
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000
ENV NODE_ENV=production
ENV JWT_SECRET=superduperrahasia
ENV GOOGLE_PASSWORD=superduperrahasianegaraindonesiatercinta
ENV COOKIE_PASSWORD=superduperrahasianegaraindonesiatercinta
ENV GOOGLE_CLIENT_ID=523913193618-7gbpo5eieba6b61t68911g109d6cco8o.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET=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
ENV GOOGLE_REDIRECT_URI=https://asing-api-m73lmtgayq-et.a.run.app/auth/google
ENV MODEL_URL=https://storage.googleapis.com/dragon-frost-model/model.json

CMD [ "npm", "start"]