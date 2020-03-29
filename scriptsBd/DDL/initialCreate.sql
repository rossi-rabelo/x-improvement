create table employees
(id varchar(32) not null primary key,
name varchar(100) not null,
email varchar(100) not null,
maxCompanion int not null default 1);


create table companions
(id varchar(32) not null primary key,
name varchar(100) not null);

create table users
(id varchar(32) not null primary key,
email varchar(100) not null,
password varchar(100) not null);

create table events
(id varchar(32) not null primary key,
maxCompanion int not null default 0,
name varchar(100) not null,
description varchar(100),
place varchar(100));

create table eventsEmployees
(id varchar(32) not null primary key,
idEvent varchar(32) not null,
idEmployee varchar(32) not null);

alter table eventsEmployees add foreign key (idEvent) references events(id);
alter table eventsEmployees add foreign key (idEmployee) references employees(id);

create table eventsEmployeesCompanions
(idEventEmployee varchar(32) not null,
idCompanion varchar(32) not null,
primary key (idEventEmployee, idCompanion));

alter table eventsEmployeesCompanions add foreign key (idEventEmployee) references eventsEmployees(id);
alter table eventsEmployeesCompanions add foreign key (idCompanion) references companions(id);