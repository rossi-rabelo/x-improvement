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
name varchar(100) not null);

create table events_employees
(idEvent varchar(32) not null,
idEmployee varchar(32) not null,
primary key (idEvent, idEmployee));

alter table events_employees add foreign key (idEvent) references events(id);
alter table events_employees add foreign key (idEmployee) references employees(id);

create table events_employees_companions
(idEvent varchar(32) not null,
idEmployee varchar(32) not null,
idCompanion varchar(32) not null);

alter table events_employees_companions add foreign key (idEvent) references events(id);
alter table events_employees_companions add foreign key (idEmployee) references employees(id);
alter table events_employees_companions add foreign key (idCompanion) references companions(id);