FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:1
COPY app.js .
CMD ["node", "app.js"]