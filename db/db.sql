CREATE DATABASE IF NOT EXISTS Check_List;

USE Check_List;

-- 1. Reset tables cleanly
-- DROP TABLE IF EXISTS cleaning_submissions;

-- DROP TABLE IF EXISTS matchpenim;

-- DROP TABLE IF EXISTS tasks;

-- DROP TABLE IF EXISTS teams;

-- 2. Teams
CREATE TABLE teams (
    team_number INT PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(50) NOT NULL
);

-- 3. Master Tasks (The global checklist everyone must complete)
CREATE TABLE tasks (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(100) NOT NULL
);

-- 4. Members
CREATE TABLE matchpenim (
    matchpenist_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    team_number INT,
    FOREIGN KEY (team_number) REFERENCES teams (team_number) ON DELETE SET NULL
);

-- 5. Full Checklist Submissions (Records when a team completes ALL tasks)
CREATE TABLE cleaning_submissions (
    submission_id INT PRIMARY KEY AUTO_INCREMENT,
    team_number INT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_number) REFERENCES teams (team_number) ON DELETE CASCADE
);

-- Create teams
INSERT INTO teams (team_name) VALUES ('Team Alpha'), ('Team Beta');

-- Create global task checklist
INSERT INTO
    tasks (task_name)
VALUES ('שטיפת רצפה'),
    ('שטיפת כלים'),
    ('ניקוי חלונות'),
    ('הוצאת פח אשפה');

INSERT INTO
    matchpenim (
        first_name,
        last_name,
        team_number
    )
VALUES ('יוסי', 'כהן', 1),
    ('דני', 'לוי', 1),
    ('נועה', 'ישראלי', 1),
    ('עומר', 'פרץ', 2),
    ('מאיה', 'אברהם', 2),
    ('אלון', 'מזרחי', 2);