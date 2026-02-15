Database & Prisma

1. MySQL (WSL) — install and start:

sudo apt updatesudo apt install mysql-serversudo service mysql start 2. Create DB and user (in MySQL as root: sudo mysql):
CREATE DATABASE IF NOT EXISTS `nest-nuxt-auth`;
CREATE USER IF NOT EXISTS 'nest-nuxt-auth'@'localhost' IDENTIFIED BY 'randompassword';GRANT ALL PRIVILEGES ON _._ TO 'nest-nuxt-auth'@'localhost';
FLUSH PRIVILEGES;EXIT;

3. .env — set:
   DATABASE_URL=mysql://nest-nuxt-auth:randompassword@localhost:3306/nest-nuxt-auth

4. Prisma — run migrations (CLI is local, use npx):
   npx prisma migrate dev --name user-init

Useful checks:

# Is MySQL reachable?

nc -zv localhost 3306

-- In MySQL (sudo mysql): does user exist?
SELECT User, Host FROM mysql.user WHERE User = 'nest-nuxt-auth';
