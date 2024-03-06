
const sqlite = require('./../../database/model.js');

class delete_task_model 
{

    verify_task_existence(task_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.get('select category_code from tasks where code = ?', [task_code], (error, row) => 
            {

                if (error) 
                {

                    callback(false, `Task Existence Verification Failure - Error Message => ${error}`, null);

                    return;

                }

                if (!row) 
                {

                    callback(false, `Non-existent Task`, null); return;

                }

                callback(true, null, row.category_code);

            });

        }).catch( (error) => 
        {

            callback(false, error, null);

        });

    }

    delete(task_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('delete from tasks where code = ?', [task_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Task Deletion Failure - Error Message => ${error}`);

                    return;

                }

                callback(true, null);

            });

        }).catch( (error) => 
        {

            callback(false, error);

        });

    }

    update_category_tasks_quantity(category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update categories set tasks_quantity = tasks_quantity - 1 where code = ?', [category_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Category Tasks Quantity Update Failure - Error Message => ${error}`);

                    return;

                }

                callback(true, null);

            });

        }).catch( (error) => 
        {

            callback(false, error);

        });

    }

}

module.exports = delete_task_model;