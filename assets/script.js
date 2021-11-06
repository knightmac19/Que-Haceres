$(document).ready(() => {
    var pageDate = $('#page-date');
    var pageTime = $('#page-time');
    var saveModal = $('.save-modal');
    var listHeader =$('.list-header');
    
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

    saveModal.on('click', function() {
        let input = $(this).parent().prev().children('#new-item').val();
        // console.log(input)



    });

    

    $('.clear-btn').on('click', function() {

    });

    setDateTime();
    setInterval(setDateTime, 1000);
});

