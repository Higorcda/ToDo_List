
const dcm = require('../../../models/tasks/categories/delete_category_model.js');

const delete_category_model = new dcm();

global.router.get('/tasks/categories/delete/:category_code', (request, response) => 
{

    const category_code = request.params.category_code;

    delete_category_model.verify_category_existence(category_code, (status, error) => 
    {

        if ((status == false) && (error != null)) 
        {

            response.json({ status: false, error: error }); return;

        }

        _delete_();

    });

    function _delete_() 
    {

        delete_category_model.delete(category_code, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                response.json({ status: false, error: error }); return;

            }

            delete_tasks();

        });

    } 

    function delete_tasks() 
    {

        delete_category_model.delete_tasks(category_code, (status, error) => 
        {

            if ((status == false) && (error != null)) 
            {

                request.flash('failure', error); response.redirect('/'); return;

            }

            success();

        });

    }

    function success() { response.json({ status: true, error: null }); }

});