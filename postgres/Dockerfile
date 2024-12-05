FROM postgres:15

ARG CRON_DB
ENV CRON_DB $CRON_DB


RUN apt-get update && apt-get install -y curl
RUN apt-get -y install postgresql-15-cron
RUN echo "shared_preload_libraries='pg_cron'" >> /usr/share/postgresql/postgresql.conf.sample
RUN echo "cron.database_name='${CRON_DB}'" >> /usr/share/postgresql/postgresql.conf.sample
