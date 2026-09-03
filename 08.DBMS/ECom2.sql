-- 1. Create and populate Product table
CREATE TABLE product2 (
    pid INT PRIMARY KEY,
    pname VARCHAR(30),
    color VARCHAR(30)
);

INSERT INTO product2 (pid, pname, color) VALUES 
(101, 'Laptop', 'Black'),
(102, 'Mouse', 'White'),
(103, 'Keyboard', 'Grey'),
(104, 'Monitor', 'Black'),
(105, 'Printer', 'White'),
(106, 'Webcam', 'Silver'),
(107, 'Speaker', 'Blue');


INSERT ALL 
    INTO product2 (pid, pname, color) VALUES (101, 'Laptop', 'Black')
    INTO product2 (pid, pname, color) VALUES (102, 'Mouse', 'White')
    INTO product2 (pid, pname, color) VALUES (103, 'Keyboard', 'Grey')
    INTO product2 (pid, pname, color) VALUES (104, 'Monitor', 'Black')
    INTO product2 (pid, pname, color) VALUES (105, 'Printer', 'White')
    INTO product2 (pid, pname, color) VALUES (106, 'Webcam', 'Silver')
    INTO product2 (pid, pname, color) VALUES (107, 'Speaker', 'Blue')
SELECT * FROM dual;

-- Remember to commit your changes in Oracle
COMMIT;


-- 2. Create and populate Supplies table (Fixed commas and name)
CREATE TABLE suppliers (
    sid INT PRIMARY KEY,
    sname VARCHAR(30),
    address VARCHAR(100)
);

INSERT all
    INTO suppliers (sid, sname, address) VALUES (201, 'TechZone Pvt Ltd', 'Delhi')
    INTO suppliers (sid, sname, address) VALUES(202, 'Global Electronics', 'Mumbai')
    INTO suppliers (sid, sname, address) VALUES(203, 'Smart Supplies', 'Bengaluru')
    INTO suppliers (sid, sname, address) VALUES(204, 'Future Tech', 'Chennai')
    INTO suppliers (sid, sname, address) VALUES(205, 'Elite Traders', 'Kolkata')
    INTO suppliers (sid, sname, address) VALUES(206, 'Digital World', 'Hyderabad')
    INTO suppliers (sid, sname, address) VALUES(207, 'Prime Components', 'Pune')
select * from dual;


create  table catalog2 (
    sid int ,
    pid int,
    price int ,
    foreign key (sid) references suppliers(sid),
    foreign key (pid) references product2(pid),
     primary key (sid,pid) 
);

-- 2. Insert all 10 records from the assignment sheet
INSERT all 
    INTO catalog2 (pid, sid, price) VALUES  (101, 201, 55000)
    INTO catalog2 (pid, sid, price) VALUES(101, 202, 54500)
    INTO catalog2 (pid, sid, price) VALUES(102, 203, 650)
    INTO catalog2 (pid, sid, price) VALUES(102, 205, 620)
    INTO catalog2 (pid, sid, price) VALUES(103, 201, 1200)
    INTO catalog2 (pid, sid, price) VALUES(103, 204, 1180)
    INTO catalog2 (pid, sid, price) VALUES(104, 206, 14500)
    INTO catalog2 (pid, sid, price) VALUES(106, 204, 2200)
    INTO catalog2 (pid, sid, price) VALUES(107, 203, 3500)
    INTO catalog2 (pid, sid, price) VALUES(107, 207, 3400)
select * from dual;

-- 
-- 3. Verify the data

SELECT * FROM product2;
SELECT * FROM suppliers;
SELECT * FROM catalog2;
 


-- 2 pname and color 
 select pname,color from product2;

-- 3 
 select pname from product2 where color='black';

-- 4
 select * from suppliers where address='Delhi';

-- 5
 select sname from suppliers;

-- two relation using join 

-- 1 
 select pname , price from product2 natural join catalog2 ;

 select pname , price from product2 inner join  catalog2 on 
        product2.pid=catalog2.pid ;

-- 2 
 select sname,price from  suppliers natural join catalog2;

-- 3
 select pname from product2 natural join catalog2 where catalog2.sid=201;

-- 4
 select sname from suppliers natural join catalog2 where pid=101;

-- 5
 select pname from product2 natural join catalog2 where catalog2.price > 5000;

-- 6 
 select sid, price from suppliers natural join catalog2 where catalog2.price > 20000;




-- three relation

-- 1
 select sname,pname,price from suppliers natural join(catalog2 natural join product2);

-- 2
 select sname,pname,address from suppliers natural join(catalog2 natural join product2);

-- 3
 select sname,pname,price from suppliers natural join(catalog2 natural join product2) 
   where product2.color='black';
-- 4
 select pname from suppliers natural join(catalog2 natural join product2) where suppliers.address='Delhi';

-- cross product2 quaries
 
 select * from suppliers cross join product2 ;

-- 2
 select * from product2 cross join catalog2 ;

-- 3
 select * from product2 cross join catalog2  where product2.pid=catalog2.pid;