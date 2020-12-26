# Groupomania
Projet 7 du parcours Développeur web d'OpenClassrooms

We need to install necessary modules: express, sequelize, mysql2 and body-parser.
Run the command:
npm install express sequelize mysql2 body-parser cors --save

````
Create data base from MySQL Command Line Client "testdb"
In the db.config.js, add the MySQL Server password that is locali installed to replace:  PASSWORD: "123456"
And in the index.js use the 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
this code will create the "testdb" 's tables correctly.
After that, use db.sequelize.sync(); (this will prevent data loss)
