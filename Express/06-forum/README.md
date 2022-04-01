# Demo d'un Forum avec Express JS

## Liste des dépendences
Web API
*******
- express
- cors
- yup
- express-async-errors
- bcrypt
- jsonwebtoken

## Pour générer le jwt
```
node
require('crypto').randomBytes(64).toString('hex')
```

Database
*******
- sequelize (sert à gérer les relations dans la DB)
- tedious (driver)

Utils
*******
- morgan (debug)
- cross-env
- dotenv-flow

Dev Tools
*******
- nodemon
- swagger-ui-express
- swagger-jsdoc