
const sqlite = require('./../../database/model.js');

class get_tasks_model 
{

    verify_category_existence(category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.get('select code, name from categories where code = ?', [category_code], (error, row) => 
            {

                if (error) 
                {

                    callback(false, `Category Existence Verification Failure - Error Message => ${error}`, null);

                    return;

                }

                if (!row) 
                {

                    callback(false, 'Non-existent Category', null); return;

                }

                callback(true, null, row);

            });

        }).catch( (error) => 
        {

            callback(false, error, null);

        });

    }

    get_tasks(category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.all('select code, task, status, created_at from tasks where category_code = ?', [category_code], (error, rows) => 
            {

                if (error) 
                {

                    callback(false, `Tasks Reading Failure - Error Message => ${error}`, null);

                    return;

                }

                callback(true, null, rows);

            });

        }).catch( (error) => 
        {

            callback(false, error, null);

        });

    }

}

module.exports = get_tasks_model;