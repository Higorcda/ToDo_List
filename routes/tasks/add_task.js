
const atm = require('./../../models/tasks/add_task_model.js');

const add_task_model = new atm();

global.router.post('/tasks/add', (request, response) => 
{

    const { task, task_category } = request.body;

    let errors = [];

    if (!task)                            {     errors.push('Empty Task Field'); }

    if (task_category == 'task_category') { errors.push('Select Task Category'); }

    if (errors.length > 0) 
    {

        response.render('index', { add_task_form_errors: errors }); return;

    }

    const current_date = new Date();

    const day   =                    (current_date.getDate() < 10) ? `0${current_date.getDate()}` : current_date.getDate();
    const month = ((current_date.getMonth + 1) < 10) ? `0${(current_date.getMonth() + 1)}` : (current_date.getMonth() + 1);

    const task_i = 
    {
        code: Math.floor((Math.random() * (Math.floor(999999999) - Math.ceil(100000000))) + Math.ceil(100000000)),

        category_code : task_category,
        task          :          task,
        status        :     'Pending',

        created_at: `${(month)}-${day}-${current_date.getFullYear()} | ${current_date.getHours()}:${current_date.getMinutes()}`
    };

    add_task_model.add(task_i, (status, error) => 
    {

        if ((status == false) && (error != null)) 
        {

            request.flash('failure', error); response.redirect('/'); return;

        }

        update_category_tasks_quantity(task_i.category_code);

    });

    function update_category_tasks_quantity(category_code) 
    {

        add_task_model.update_category_tasks_quantity(category_code, (status, error) => 
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

        request.flash('success', 'Successufully created Task'); response.redirect('/');

    }

});