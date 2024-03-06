
const sqlite = require('./../../database/model.js');

class edit_task_model 
{

    verify_task_existence(task_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.get('select code, category_code, task from tasks where code = ?', [task_code], (error, row) => 
            {

                if (error) 
                {

                    callback(false, `Task Existence Verification Failure - Error Message => ${error}`, null);

                    return;

                }

                if (!row) 
                {

                    callback(false, 'Non-existent Task', null); return;

                }

                callback(true, null, row); 

            });

        }).catch( (error) => 
        {

            callback(false, error, null);

        });

    }

    update(task_code, task_i, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update tasks set task = ?, category_code = ? where code = ?', [task_i.task, task_i.category_code, task_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Task Update Failure - Error Message => ${error}`);

                    return;

                }

                callback(true, null);

            });

        }).catch( (error) => 
        {

            callback(false, error);

        });

    }

    update_new_category_tasks_quantity(new_task_category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update categories set tasks_quantity = tasks_quantity + 1 where code = ?', [new_task_category_code], (error) => 
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

    update_old_category_tasks_quantity(old_task_category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update categories set tasks_quantity = tasks_quantity - 1 where code = ?', [old_task_category_code], (error) => 
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

module.exports = edit_task_model;