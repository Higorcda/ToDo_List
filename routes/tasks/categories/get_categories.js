
const get_categories = require('../../../models/tasks/categories/get_categories_model.js');

global.router.get('/tasks/categories/get', (request, response) => 
{

    get_categories( (status, error, categories) => 
    {

        if ((status == false) && (error != null) && (categories == null)) 
        {

            response.json({ status: false, error: error, categories: null }); return;

        }

        success(categories);

    });

    function success(categories) 
    {

        response.json({ status: true, error: null, categories: categories });

    }

});