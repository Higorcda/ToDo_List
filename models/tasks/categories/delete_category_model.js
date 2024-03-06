
const sqlite = require('./../../../database/model.js');

class delete_category_model 
{

    verify_category_existence(category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.get('select * from categories where code = ?', [category_code], (error, row) => 
            {

                if (error) 
                {

                    callback(false, `Category Existence Verification Failure - Error Message => ${error}`); 

                    return;

                }

                if (!row) 
                {

                    callback(false, `Non-existent Category`); return;

                }
 
                callback(true, null); 
                
            });

        }).catch( (error) => 
        {

            callback(false, error);

        });

    }

    delete(category_code, callback) 
    {
    
        sqlite.then( (database) => 
        {

            database.run('delete from categories where code = ?', [category_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Category Deletion Failure - Error Message => ${error}`);

                    return;

                }

                callback(true, null);

            });

        }).catch( (error) => 
        {

            callback(false, error);

        });

    }

    delete_tasks(category_code, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('delete from tasks where category_code = ?', [category_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Tasks Deletion Failure - Error Message => ${error}`);

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

module.exports = delete_category_model;