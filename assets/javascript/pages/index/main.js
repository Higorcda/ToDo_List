
function show_system_message(message_type, message) 
{

    const system_messages_element = document.getElementById('system_messages');

    const message_element     = document.createElement('div');
    message_element.className =    'system_messages__message';

    if (message_type == 'success') 
    {

        message_element.classList.add('system_messages__message-success');

    } else 
    {

        message_element.classList.add('system_messages__message-failure');

    }

    const message_p_element       = document.createElement('p');
    message_p_element.textContent =                     message;

    message_element.appendChild(message_p_element);

    system_messages_element.appendChild(message_element);

}

fetch
(
    '/tasks/categories/get', { method: 'get', headers: { 'Content-Type': 'application/json' } }

).then( (response) => 
{

    if (!response.ok) 
    {

        show_system_message('failure', `Categories Reading GET Request Failure`);

        return;

    }

    return response.json();

}).then( (data) => 
{

    if ((data.status == false) && (data.error != null) && (data.categories == null)) 
    {

        show_system_message('failure', data.error); return;

    }

    const categories = data.categories;

    const category_select_element =      document.getElementById('task_category_id');
    const categories_list_element = document.getElementById('categories__main-list');

    categories.forEach( (category) => 
    {

        category_select_element.options.add(new Option(category.name, category.code));

        const category_element     =     document.createElement('div');
        category_element.className = 'categories__main-list__category';

        const category_a_element       =        document.createElement('a');
        category_a_element.href        = `/tasks/category/${category.code}`;
        category_a_element.textContent =                      category.name;

        const category_right_element     =           document.createElement('div');
        category_right_element.className = 'categories__main-list__category-right';

        const category_right_span_element       = document.createElement('span');
        category_right_span_element.textContent =        category.tasks_quantity;

        const category_right_actions_element     =                    document.createElement('div');
        category_right_actions_element.className = 'categories__main-list__category-right__actions';

        const category_right_actions_a_element     =                     document.createElement('a');
        category_right_actions_a_element.href      =       `/tasks/categories/edit/${category.code}`;
        category_right_actions_a_element.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Edit';

        const category_right_actions_button_element     =          document.createElement('button');
        category_right_actions_button_element.type      =                                  'button';
        category_right_actions_button_element.innerHTML = '<i class="fa-solid fa-trash"></i>Delete';

        category_right_actions_element.appendChild(     category_right_actions_a_element);
        category_right_actions_element.appendChild(category_right_actions_button_element);

        category_right_element.appendChild(   category_right_span_element);
        category_right_element.appendChild(category_right_actions_element);

        category_element.appendChild(    category_a_element);
        category_element.appendChild(category_right_element);

        categories_list_element.appendChild(category_element);

        category_right_actions_button_element.addEventListener('click', (event) => { delete_category(category.code); });

    });

}).catch( (error) => 
{

    show_system_message('failure', error);

}); 

function delete_category(category_code) 
{

    fetch
    (
        `/tasks/categories/delete/${category_code}`, { method: 'get', headers: { 'Content-Type': 'application/json' } }

    ).then( (response) => 
    {

        if (!response.ok) 
        {

            show_system_message('failure', 'Category Deletion GET Request Failure');

            return;

        }

        return response.json();

    }).then( (data) => 
    {

        if ((data.status == false) && (data.error != null)) 
        {

            show_system_message('failure', data.error); return;

        }

        show_system_message('success', 'Successfully deleted Category');

    }).catch( (error) => 
    {

        show_system_message('failure', error);

    });

}

function delete_task(task_code) 
{

    fetch
    (
        `/tasks/delete/${task_code}`, { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then( (response) => 
    {

        if (!response.ok) 
        {

            show_system_message('failure', 'Task Deletion GET Request Failure');

            return;

        }

        return response.json();

    }).then( (data) => 
    {

        if ((data.status == false) && (data.error != null)) 
        {

            show_system_message('failure', data.error); return;

        }

        show_system_message('success', 'Successfully deleted Task');

    }).catch( (error) => 
    {

        show_system_message('failure', error);

    });

}

function update_task_status(task_code) 
{

    fetch
    (
        `/tasks/update_status/${task_code}`, { method: 'get', headers: { 'Content-Type': 'application/json' } }
    ).then( (response) => 
    {

        if (!response.ok) 
        {

            show_system_message('failure', 'Task Status Update GET Request Failure');

            return;

        }

        return response.json();

    }).then( (data) => 
    {

        if ((data.status == false) && (data.error != null)) 
        {

            show_system_message('failure', data.error); return;

        }

        show_system_message('success', 'Successfully updated Task Status');

    }).catch( (error) => 
    {

        show_system_message('failure', error);

    });

}