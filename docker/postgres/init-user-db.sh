#!/bin/bash

set -ex
cd /var/lib/postgresql

psql -v ON_ERROR_STOP=1 --username "${POSTGRES_USER}" <<-EOL
    CREATE USER  louis CREATEDB;
    CREATE DATABASE MyRental2;
    GRANT ALL PRIVILEGES ON DATABASE MyRental2 TO louis;
EOL
