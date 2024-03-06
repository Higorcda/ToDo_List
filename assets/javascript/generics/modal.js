
const modals = document.querySelectorAll('.modal');

modals.forEach( (modal) => 
{

    modal.addEventListener('click', (event) => 
    {

        if ((event.target.className.includes('modal_main_class') == true) || (event.target.className.includes('modal__main-top__close') == true)) 
        {

            modal.style.display = 'none';

        }

    });

});

function open_modal(identifier_type, identifier) 
{

    const modal = (identifier_type == 'id') ? document.getElementById(identifier) : document.querySelector(`.${identifier}`);

    modal.style.display = 'flex';

}