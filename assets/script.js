$(document).ready(() => {
    var pageDate = $('#page-date');
    var pageTime = $('#page-time');
    var saveModal = $('.save-modal');
    var listHeader =$('.list-header');
    var newBtn = $('.new-btn');

    var todoArr = JSON.parse(localStorage.getItem('todoArr')) || [];
    
    const setAndUpdate = async (str) => {
        todoArr.push(str)
        localStorage.setItem('todoArr', JSON.stringify(todoArr));
        todoArr = JSON.parse(localStorage.getItem('todoArr'));
    }

    const setDateTime = () => {
        let rightNow = new Date();
        let date = rightNow.toString().substring(0, 15);
        let time = rightNow.toLocaleString(
            'en-US', 
            { 
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            }
        );

        pageDate.text(date);
        pageTime.text(time);
        
    }

    const createItems = (arr) => {
        
        for (var i = 0; i < arr.length; i++) {
            let newEl = $(`<li class="list-group-item pb-4"><input class="my-checkbox" type="checkbox" > ${arr[i]} <button type="button" class="btn btn-danger clear-this-btn invisible float-right"><i class="fa clear-this-icon fa-trash" aria-hidden="true"></i></button></li>`);
        
            listHeader.append(newEl)
        }
        
        return;
        
    }

    newBtn.on('click', function() {
        $('#new-item').val('');
    });

    $('#exampleModal').on('shown.bs.modal', function() {
        $('#new-item').focus();
    });

    $('#new-item').on('keyup', function(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            saveModal.click();
        }
    });


    saveModal.on('click', async function() {
        listHeader.children().remove();
        let input = $(this).parent().prev().children('#new-item').val();
        await setAndUpdate(input);
        
        await createItems(todoArr);

    });

    

    $('.clear-btn').on('click', function() {
        todoArr = [];
        localStorage.removeItem('todoArr');
        listHeader.children().remove();
    });

    const removeItem = (str, arr) => {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === str.trim()) {
                
                arr.splice(i, 1);
                
            }
        }
        return arr;
    };

    $(document).on('click', async function(e) {
        if ($(e.target).hasClass('my-checkbox')) {

            if ($(e.target).is(':checked')) {

                $(e.target).parent().css('text-decoration', 'line-through');
                $(e.target).siblings('.clear-this-btn').removeClass('invisible');
            } else {
                
                $(e.target).parent().css('text-decoration', '');
                $(e.target).siblings('.clear-this-btn').addClass('invisible');
            }
            
        }

        if ($(e.target).hasClass('clear-this-btn')) {
            
            let text = $(e.target).parent().text();
            var updatedArr = await removeItem(text, todoArr);

            // remove index text from todoArr in local storage
            localStorage.setItem('todoArr', JSON.stringify(updatedArr));

            // remove element
            $(e.target).parent().remove();

        }
        if ($(e.target).hasClass('clear-this-icon')) {
            
            let text = $(e.target).parent().parent().text();
            var updatedArr = await removeItem(text, todoArr);

            // remove index text from todoArr in local storage
            localStorage.setItem('todoArr', JSON.stringify(updatedArr));
            
            // remove element
            $(e.target).parent().parent().remove();
        }
        return;
        
    })

    setDateTime();
    setInterval(setDateTime, 1000);
    createItems(todoArr);
    
});