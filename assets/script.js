$(document).ready(() => {
    var pageDate = $('#page-date');
    var pageTime = $('#page-time');
    var saveModal = $('.save-modal');
    var listHeader =$('.list-header');
    var newBtn = $('.new-btn');
    var chkBx = $('.my-checkbox')

    var todoArr = JSON.parse(localStorage.getItem('todoArr')) || [];
    // console.log(localStorage.getItem('todoArr'))
    
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
            let newEl = $(`<li class="list-group-item pb-4"><input class="my-checkbox" type="checkbox" > ${arr[i]} <button type="button" class="btn btn-danger clear-this-btn invisible float-right"><i class="fa fa-trash" aria-hidden="true"></i></button></li>`);
        
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

    $(document).on('click', function(e) {
        if ($(e.target).hasClass('my-checkbox')) {

            $(e.target).parent().css('text-decoration', 'line-through');
            $(e.target).siblings('.clear-this-btn').removeClass('invisible');
        }
        return;
        
    })

    setDateTime();
    setInterval(setDateTime, 1000);
    createItems(todoArr);
    
});