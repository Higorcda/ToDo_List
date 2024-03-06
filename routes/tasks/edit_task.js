
const etm = require('./../../models/tasks/edit_task_model.js');

const edit_task_model = new etm();

global.router.get('/tasks/edit/:task_code', (request, response) => 
{

    const task_code = request.params.task_code;

    edit_task_model.verify_task_existence(task_code, (status, error, task) => 
    {

        if ((status == false) && (error != null) && (task == null)) 
        {

            request.flash('failure', error); response.redirect('/'); return;

        }

        success(task);

    });

    function success(task) 
    {

        response.render('index', { edit_task: true, task_code: task.code, task: task.task });

    }

});

global.router.post('/tasks/edit/:task_code/action', (request, response) => 
{

    const task_code = request.params.task_code;

    edit_task_model.verify_task_existence(task_code, (status, error, task) => 
    {

        if ((status == false) && (error != null) && (task == null)) 
        {

            request.flash('failure', error); response.redirect('/'); return;

        }

        validate_form(task);

    });

    function validate_form(task) 
    {

        const task_content  =          request.body.task;
        const task_category = request.body.task_category;

        let errors = [];

        if (!task_content)                    {     errors.push('Empty Task Field'); }

        if (task_category == 'task_category') { errors.push('Select Task Category'); }

        if ((task_content) && (task_content == task.task)) { errors.push('Task Content must be different'); }

        if (errors.length > 0) 
        {

            response.render
            (
                'index', { edit_task: true, task_code: task.code, task: task.task, edit_task_form_errors: errors }
            );

            return;

        }

        update(task.code, task_content, task_category, task.category_code);

    }

    function update(task_code, task_content, task_category, old_task_category) 
    {

        const task_i = { task: task_content, category_code: task_category };

        edit_task_model.update(task_code, task_i, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            update_new_category_tasks_quantity(task_i.category_code, old_task_category);

        });

    }

    function update_new_category_tasks_quantity(new_task_category_code, old_task_category_code) 
    {

        edit_task_model.update_new_category_tasks_quantity(new_task_category_code, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            update_old_category_tasks_quantity(old_task_category_code);

        });

    }

    function update_old_category_tasks_quantity(old_task_category_code) 
    {

        edit_task_model.update_old_category_tasks_quantity(old_task_category_code, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            success();

        });

    }

    function success() 
    {

        request.flash('success', 'Successfully updated Task'); response.redirect('/');

    }

});