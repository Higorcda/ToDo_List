
const ecm = require('../../../models/tasks/categories/edit_category_model.js');

const edit_category_model = new ecm();

global.router.get('/tasks/categories/edit/:category_code', (request, response) => 
{

    const category_code = request.params.category_code;

    edit_category_model.verify_category_existence(category_code, (status, error, category) => 
    {

        if ((status == false) && (error != null) && (category == null)) 
        {

            request.flash('failure', error); response.redirect('/'); return;

        }

        success(category);

    });

    function success(category) 
    {

        response.render('index', { edit_category: true, category_code: category.code, category_name: category.name });

    }

});

global.router.post('/tasks/categories/edit/:category_code/action', (request, response) => 
{

    const category_code = request.params.category_code;

    edit_category_model.verify_category_existence(category_code, (status, error, category) => 
    {

        if ((status == false) && (error != null) && (category == null)) 
        {

            request.flash('failure', error); response.redirect('/'); return;

        }

        validate_form(category);

    });

    function validate_form(category) 
    {

        const category_name = request.body.category;

        if (!category_name) 
        {

            response.render
            (
                'index', { edit_category: true, category_code: category.code, category_name: category.name, edit_category_form_error: 'Empty Category Field' }
            );

            return;

        }

        if (category_name.toLowerCase() == category.name.toLowerCase()) 
        {

            response.render
            (
                'index', { edit_category: true, category_code: category.code, category_name: category.name, edit_category_form_error: 'Category Name must be different' }
            );

            return;

        }

        update(category.code, category_name);

    }

    function update(category_code, category_name)
    {

        edit_category_model.update(category_code, category_name, (status, error) => 
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

        request.flash('success', 'Successufully updated Category'); response.redirect('/');

    }

});