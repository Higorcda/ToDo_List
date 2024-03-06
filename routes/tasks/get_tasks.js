
const gtm = require('./../../models/tasks/get_tasks_model.js');

const get_tasks_model = new gtm();

global.router.get('/tasks/category/:category_code', (request, response) => 
{

    const category_code = request.params.category_code;

    get_tasks_model.verify_category_existence(category_code, (status, error, category) => 
    {

        if ((status == false) && (error != null) && (category == null)) 
        {

            request.flash('failure', error); response.redirect('/'); return;

        }

        get_tasks(category.code, category.name);

    });

    function get_tasks(category_code, category_name) 
    {

        get_tasks_model.get_tasks(category_code, (status, error, tasks) => 
        {

            if ((status == false) && (error != null) && (tasks == null)) 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            success(tasks, category_name);

        });

    }

    function success(tasks, category_name) 
    {

        response.render('index', { tasks_list: true, tasks: tasks, category_name: category_name });

    }

});