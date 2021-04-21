FROM node:14

WORKDIR /build
RUN ln -s /dashboard/src /dashboard/angular.json \
  /dashboard/package-lock.json /dashboard/package.json \
  /dashboard/tsconfig.app.json /dashboard/tsconfig.json .

CMD npm ci && npm start -- -o --prod --host=0.0.0.0 --disable-host-check
