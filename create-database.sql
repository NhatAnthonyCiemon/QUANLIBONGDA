teamscreate database football_management;
use football_management;


CREATE TABLE teams
(
	id integer primary key auto_increment,
    team_name varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null,
    stadium varchar(100) not null,
    email varchar(100) not null 
);

CREATE TABLE players
(
	id integer primary key auto_increment,
    player_name varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null,
    birth_date date not null,
    player_type varchar(50)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci not null,
    team integer not null,
    note varchar(100)  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    CONSTRAINT fk_teams FOREIGN KEY (team) 
                         REFERENCES teams(id)
);
INSERT INTO teams (team_name,stadium, email)
Values 
(N'Đông Lào','Sân Mĩ Đình' ,'donglao@gmail.com');

INSERT INTO players (player_name, birth_date,player_type,team,note)
Values 
(N'Nguyễn Thành Nhật','2004-12-25',N'Tiền Đạo',1,N'Đá bằng tay');