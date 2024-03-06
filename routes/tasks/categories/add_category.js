
const acm = require('../../../models/tasks/categories/add_category_model.js');

const add_category_model = new acm();

global.router.post('/tasks/categories/add', (request, response) => 
{

    const category_name = request.body.category;

    if (!category_name) 
    {

        response.render('index', { add_category_form_failure: true, add_category_form_error: 'Empty Category Field' });

        return;

    }

    add_category_model.verify_category_availability(category_name, (status, error_type, error) => 
    {

        if ((status == false) && (error_type != null) && (error != null)) 
        {

            if (error_type == 'system') 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            response.render('index', { add_category_form_failure: true, add_category_form_error: error });

            return;

        }

        add();

    });

    function add() 
    {

        const category_i = 
        {
            code: Math.floor((Math.random() * (Math.floor(999999999) - Math.ceil(100000000))) + Math.ceil(100000000)),

            name           : category_name,
            tasks_quantity :              0
        };

        add_category_model.add(category_i, (status, error) => 
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

        request.flash('success', 'Successfully created Category'); response.redirect('/');

    }

});