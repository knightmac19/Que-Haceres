$(document).ready(() => {
    var pageDate = $('#page-date');
    var pageTime = $('#page-time');
    var saveModal = $('.save-modal');
    var listHeader =$('.list-header');

    var todoArr = JSON.parse(localStorage.getItem('todoArr')) || [];
    console.log(todoArr)
    console.log(todoArr.length)
    
    const setAndUpdate = async (str) => {
        todoArr.push(str)
        localStorage.setItem('todoArr', JSON.stringify(todoArr));
        todoArr = JSON.parse(localStorage.getItem('todoArr'));
    }

    // const updateTodoArr = () => {
    //     todoArr = JSON.parse(localStorage.getItem('todoArr'));
    // }

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
        console.log(arr);
        // listHeader.children().remove();
        for (var i = 0; i < arr.length; i++) {
            let newEl = $(`<li class="list-group-item"><input type="checkbox" > ${arr[i]}</li>`);
            // console.log(newEl)
            listHeader.append(newEl)
        }
        console.log(arr)
        // console.log(todoArr)
        // console.log(JSON.parse(localStorage.getItem('todoArr')))
        return;
        
    }

    saveModal.on('click', async function() {
        listHeader.children().remove();
        let input = $(this).parent().prev().children('#new-item').val();
        await setAndUpdate(input);
        
        await createItems(todoArr);

    });

    

    $('.clear-btn').on('click', function() {

    });

    setDateTime();
    setInterval(setDateTime, 1000);
    createItems(todoArr);
    
});