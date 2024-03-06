
const sqlite = require('./../../../database/model.js');

class edit_category_model 
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

    update(category_code, category_name, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('update categories set name = ? where code = ?', [category_name, category_code], (error) => 
            {

                if (error) 
                {

                    callback(false, `Category Update Failure - Error Message => ${error}`);

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

module.exports = edit_category_model;