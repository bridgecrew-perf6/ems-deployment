#Development Instruction
#####Update system settings

path: constants/SystemDetails-sample.js

```bash
cd constants
cp SystemDetails-sample.js SystemDetails.js
```

####Prepare Dev tools
1. Node JS
2. DBeaber (Database IDE)
3. Yarn installed

#####Prepare Database
1. Install PostgreSQL
2. Configure connection
3. Create database

#####Update environment
path: root project directory
```bash
cp .env-sample .env
```

edit database URL

DATABASE_URL="postgresql://[user]:[user password]@[host]:[port]/[database]?schema=public"

#####Install node dependencies

```bash
yarn
```

#####Migrate Models for the first time
```bash
prisma migrate dev --name init
```
#####Generate Prisma (Everytime models are changed)
```bash
npx prisma generate
```

#####Run development
```bash
yarn dev
```
##Regular Commands
#####Migrate Models anytime
```bash
npx prisma migrate dev
```

#####Open Prisma studio
```bash
 npx prisma studio
 ```
#####Open graphql playground

http://localhost:3000/api/graphql


 
