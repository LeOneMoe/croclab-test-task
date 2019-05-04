DROP TABLE users, pict;

CREATE TABLE users (
nickname text NOT NULL,
p_id integer PRIMARY KEY,
up_date date NOT NULL
);

CREATE TABLE pict(
p_id integer REFERENCES users(p_id) ON DELETE CASCADE,
p_name text,
pick oid,
CONSTRAINT un PRIMARY KEY (p_id)
);



INSERT INTO users (nickname, p_id, up_date) VALUES
('ы', (SELECT (count(pict.p_id)+1) FROM pict),  now());
					 
INSERT INTO pict (p_id, p_name, pick) VALUES
((SELECT count(users.p_id) FROM users), 'ы.jpg', lo_import('C:\Users\Nps\Desktop\Meme\vj8mU4Zb4NM.jpg'));


 SELECT lo_export(pict.pick, 'C:\Users\Nps\Downloads\test\testers.jpg') FROM pict WHERE pict.p_name = 'ы.jpg';									  