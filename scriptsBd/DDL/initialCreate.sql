create table employees
(id varchar(32) not null primary key,
name varchar(100) not null,
email varchar(100) not null,
maxCompanion int not null default 1);


create table companions
(id varchar(32) not null primary key,
name varchar(100) not null);

create table employee_companion
(id varchar(32) not null primary key,
idEmployee varchar(32) not null,
idCompanion varchar(32) not null);

alter table employee_companion add foreign key (idEmployee) references employees(id);

alter table employee_companion add foreign key (idCompanion) references employees(id);

create table systemUser
(id varchar(32) not null primary key,
email varchar(100) not null,
password varchar(100) not null);