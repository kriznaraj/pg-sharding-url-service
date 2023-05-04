FROM postgres:15-bullseye
COPY init.sql /docker-entrypoint-initdb.d

