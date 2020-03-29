create table employees
(id varchar(32) not null primary key default replace(uuid(), '-', ''),
name varchar(100) not null,
email varchar(100) not null unique);


create table companions
(id varchar(32) not null primary key default replace(uuid(), '-', ''),
name varchar(100) not null unique);

create table users
(id varchar(32) not null primary key default replace(uuid(), '-', ''),
email varchar(100) not null unique,
password varchar(100) not null);

create table events
(id varchar(32) not null primary key default replace(uuid(), '-', ''),
maxCompanion int not null default 0,
name varchar(100) not null unique,
description varchar(100),
place varchar(100),
image varchar(200) not null);

create table eventsEmployees
(id varchar(32) not null primary key default replace(uuid(), '-', ''),
idEvent varchar(32) not null,
idEmployee varchar(32) not null);

alter table eventsEmployees add foreign key (idEvent) references events(id);
alter table eventsEmployees add foreign key (idEmployee) references employees(id);

create table eventsEmployeesCompanions
(id varchar(32) not null primary key default replace(uuid(), '-', ''),
idEventEmployee varchar(32) not null,
idCompanion varchar(32) not null);

alter table eventsEmployeesCompanions add foreign key (idEventEmployee) references eventsEmployees(id);
alter table eventsEmployeesCompanions add foreign key (idCompanion) references companions(id);
alter table eventsemployeescompanions add unique(idEventEmployee, idCompanion);