
const sqlite = require('./../../database/model.js');

class add_task_model 
{

    add(task_i, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('insert into tasks (code, category_code, task, status, created_at) values (?, ?, ?, ?, ?)', [task_i.code, task_i.category_code, task_i.task, task_i.status, task_i.created_at], (error) => 
            {

                if (error) 
                {

                    callback(false, `Task Creation Failure - Error Message => ${error}`);

                    return;

                }

                callback(true, null);

            })

        }).catch( (error) => 
        {

            callback(false, error);

        });

    }

    update_category_tasks_quantity(category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update categories set tasks_quantity = tasks_quantity + 1 where code = ?', [category_code], (error) => 
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

module.exports = add_task_model;