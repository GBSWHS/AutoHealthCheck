create schema gbswcovid;
create user gbswcovid@localhost;

grant all on gbswcovid.* to gbswcovid@localhost;

create table gbswcovid.users (
  birth varchar(6) not null, -- 생년월일
  name varchar(5) not null, -- 이름
  passwd varchar(4) not null, -- 비번
  type varchar(1) not null -- 타입 (T: 쌤, S: 학생) 'T'ype'S'cript
);
