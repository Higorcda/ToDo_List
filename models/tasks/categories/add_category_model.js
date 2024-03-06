
const sqlite = require('./../../../database/model.js');

class add_category_model 
{

    verify_category_availability(category_name, callback) 
    {

        sqlite.then( (database) => 
        {
            
            database.get('select * from categories where LOWER(name) = ?', [category_name.toLowerCase()], (error, row) => 
            {

                if (error) 
                {

                    callback(false, 'system', `Category Availability Verification Failure - Error Message => ${error}`);

                    return;

                }

                if (row) 
                {

                    callback(false, 'form', `Existing Category`); return;

                }

                callback(true, null, null);

            });

        }).catch( (error) => 
        {

            callback(false, 'system', error);

        });

    }

    add(category_i, callback) 
    {

        sqlite.then( (database) => 
        {

            database.run('insert into categories (code, name, tasks_quantity) values (?, ?, ?)', [category_i.code, category_i.name, category_i.tasks_quantity], (error) => 
            {

                if (error) 
                {

                    callback(false, `Category Creation Failure - Error Message => ${error}`);

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

module.exports = add_category_model;