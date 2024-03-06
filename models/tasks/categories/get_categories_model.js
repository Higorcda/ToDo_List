
const sqlite = require('./../../../database/model.js');

function get_categories(callback) 
{

    sqlite.then( (database) => 
    {

        database.all('select code, name, tasks_quantity from categories', (error, rows) => 
        {

            if (error) 
            {

                callback(false, `Categories Reading Failure - Error Message => ${error}`, null);

                return;

            }

            callback(true, null, rows);

        });

    }).catch( (error) => 
    {

        callback(false, error, null);

    });

}

module.exports = get_categories;