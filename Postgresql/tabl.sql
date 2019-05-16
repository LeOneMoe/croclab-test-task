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



INSERT INTO users (nickname, picture_id, upload_date) VALUES
('LeOneMoe', (SELECT (count(pictures.picture_id)+1) FROM pictures),  now());

INSERT INTO pictures (picture_id, picture_name, picture_path) VALUES
((SELECT count(users.picture_id) FROM users), 'comfy_pisi', 'xzR8clG541U.jpg');


DELETE FROM pictures;
DELETE FROM users;


SELECT lo_export(pict.pick, 'C:\Users\Nps\Downloads\test\testers.jpg') FROM pict WHERE pict.p_name = 'ы.jpg';
