create table InstaUser (
    name varchar(20) not null,
    age smallint ,
    email varchar(30) unique,
    follower int default 0,
    followering int default 0,
    constraint age_check check (age>=13)
);

insert into InstaUser (id,name,age) values (6,'g',10);
select * from INSTAUSER;

truncate table post;
alter table InstaUser add id int primary key;

create table post (
    pid int primary key,
    text varchar(1000) ,
    user_id int,
    foreign  key (user_id) references InstaUser(id)
)

select * from INSTAUSER
fetch first 1 rows only;

SELECT * 
FROM INSTAUSER 
WHERE ROWNUM <= 2;

select * from INSTAUSER
order by age desc;

select age, count(id) from INSTAUSER
group by age ;

select age, count(id) from INSTAUSER
group by age 
 having (age>15);

INSERT ALL 
    INTO InstaUser (id, name, age, email, follower, followering) VALUES (1, 'Rahul Sharma', 24, 'rahul@email.com', 1500, 320)
    INTO InstaUser (id, name, age, email, follower, followering) VALUES (2, 'Ananya Iyer', 14, 'ananya@email.com', 450, 600)
    INTO InstaUser (id, name, age, email, follower, followering) VALUES (3, 'Amit Patel', 19, 'amit@email.com', 0, 0)
    INTO InstaUser (id, name, age, email, follower, followering) VALUES (4, 'Sneha Reddy', 19, 'sneha@email.com', 2300, 150)
    INTO InstaUser (id, name, age, email, follower, followering) VALUES (5, 'Vikram Malhotra', 32, 'vikram@email.com', 9800, 450)
SELECT * FROM dual;

-- Commit to save changes permanently
COMMIT;

INSERT ALL
    INTO post (pid, text, user_id) VALUES (101, 'Loving the weather today! #sunny', 1)
    INTO post (pid, text, user_id) VALUES (102, 'Just finished reading a fantastic book.', 1)
    INTO post (pid, text, user_id) VALUES (103, 'Happy Birthday to my best friend! 🎉', 2)
    INTO post (pid, text, user_id) VALUES (104, 'Code is poetry. #programming #oracle', 4)
SELECT * FROM dual;

-- Commit to save changes permanently
COMMIT;
 

 
 update  InstaUser set FOLLOWER=200
 where id=3;

commit;

delete from post 
where user_id in (select id from INSTAUSER where age=19);

delete from  INSTAUSER where age=19;  

rollback;

select * from INSTAUSER;
 select * from POST;


alter table InstaUser
 add sub Int default 0;

alter table InstaUser
 drop column sub ;

 alter table InstaUser
 rename column follower to followers;

 alter table InstaUser
modify   age  smallint;

ALTER TABLE InstaUser 
DROP CONSTRAINT age_check;

ALTER TABLE InstaUser 
ADD CONSTRAINT check_age CHECK (age >= 13);

commit;