FROM mongo:3.6.8

RUN mkdir -p /database

WORKDIR /database

COPY 01-products.json .

RUN chmod +x 01-products.json

WORKDIR /docker-entrypoint-initdb.d

COPY import.sh .

RUN chmod +x import.sh

RUN cat import.sh | tr -d '\r' > import.fixed.sh && mv -v  import.fixed.sh import.sh

CMD [ "bash", "/docker-entrypoint-initdb.d/import.sh", "database" ]

EXPOSE 27017