
const sqlite = require('./../../database/model.js');

class update_task_status 
{

    verify_task_existence(task_code, callback) 
    {

        sqlite.then( (database) =>
        {

            database.get('select status from tasks where code = ?', [task_code], (error, row) => 
            {

                if (error) 
                {

                    callback(false `Task Existence Verification Failure - Error Message => ${error}`, null);

                    return;

                }

                if (!row) 
                {

                    callback(false, `Non-existent Task`, null); return;

                }

                callback(true, null, row.status);

            });

        }).catch( (error) => 
        {

            callback(false, error, null);

        });

    }

    update_task_status(task_code, new_task_status, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update tasks set status = ? where code = ?', [new_task_status, task_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Task Status Update Failure - Error Message => ${error}`);

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

module.exports = update_task_status;