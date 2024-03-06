
const uts = require('./../../models/tasks/update_task_status_model.js');

const update_task_status_model = new uts();

global.router.get('/tasks/update_status/:task_code', (request, response) => 
{

    const task_code = request.params.task_code;

    update_task_status_model.verify_task_existence(task_code, (status, error, task_status) => 
    {

        if ((status == false) && (error != null) && (task_status == null)) 
        {

            response.json({ status: false, error: error }); return;

        }

        update_task_status(task_status);

    });

    function update_task_status(current_task_status) 
    {

        const new_task_status = (current_task_status == 'Pending') ? 'Completed' : 'Pending';

        update_task_status_model.update_task_status(task_code, new_task_status, (status, error) => 
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