-- sudo -u postgres createdb log_server

-- sudo -u postgres psql log_server

CREATE EXTENSION "uuid-ossp";

-- psql log_server

create table ´user´ (
	login text primary key,
	password text not null
);
