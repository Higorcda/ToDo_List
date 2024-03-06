
const dtm = require('./../../models/tasks/delete_task_model.js');

const delete_task_model = new dtm();

global.router.get('/tasks/delete/:task_code', (request, response) => 
{

    const task_code = request.params.task_code;

    delete_task_model.verify_task_existence(task_code, (status, error, category_code) => 
    {

        if ((status == false) && (error != null) && (category_code == null)) 
        {

            response.json({ status: false, error: error }); return;

        }

        _delete_(category_code);

    });

    function _delete_(category_code) 
    {

        delete_task_model.delete(task_code, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                response.json({ status: false, error: error }); return;

            }

            update_category_tasks_quantity(category_code);

        });

    }

    function update_category_tasks_quantity(category_code) 
    {

        delete_task_model.update_category_tasks_quantity(category_code, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                response.json({ status: false, error: error }); return;

            }

            success();

        });

    }

    function success() { response.json({ status: true, error: null }); }

});