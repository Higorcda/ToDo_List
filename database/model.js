
const sqlite = require('sqlite3');

const database_promise = new Promise( (resolve, reject) => 
{

    const database = new sqlite.Database('./database/database.db', (error) => 
    {

        if (error) 
        {

            reject(`Database Opening Failure - Error Message => ${error}`);

        }

        resolve(database);

    });

});

module.exports = database_promise;