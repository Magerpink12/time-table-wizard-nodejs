function err_status(color,message) {
    $('.warn-message').text(message)
    $('.warn-pop-up').css('border-left',`4px solid ${color}`).removeClass('hide').addClass('show').addClass('display-warn')
    setTimeout(()=>{
        $('.warn-pop-up').removeClass('show').addClass('hide')
        },5000)
}

$(document).ready(function(){

    $(document).bind("ajaxSend",()=>{
        $(".load").css("display","flex")
    }).bind("ajaxComplete",()=>{
        $(".load").css("display","none")
    })
   
    $('#add-btn').click(()=>{
        var lecTime = $('#time').val()
        var lecDay = $('#day').val()
        var instructor = $('#instructor').val()
        var venue = $('#venue').val()
        var title = $('#title').val()
        var course = $('#course').val()
        if (!course) {
            
        }
        var task ={
            lecTime,
            lecDay,
            instructor,
            venue,
            title,
            course
        }

        


        $.ajax({
            url: `/tasks/add`,
            method:'POST',
            data: task,
            success:function(task){
                // $("#table").load(window.location.href +" #table")
                taskTableRefresh()
                $('.warn-message').text('Task Added')
                $('.warn-pop-up').css('border-left','4px solid green').removeClass('hide').addClass('show').addClass('display-warn')
                        setTimeout(()=>{
                        $('.warn-pop-up').removeClass('show').addClass('hide')
                },5000)
                $('#time').val('')
                $('#day').val('')
                $('#instructor').val('')
                $('#venue').val('')
                $('#title').val('')
                $('#course').val('')
            },
            error:function(error){
                if(error.responseJSON.error == undefined){
                    $('.warn-message').text('! Invalid Entries...')
                    $('.warn-pop-up').css('border-left','4px solid red')
                }else{
                    $('.warn-message').text('! '+error.responseJSON.error +'\n recheck and try again..')
                    $('.warn-pop-up').css('border-left','4px solid orange')
                }
                $('.warn-pop-up').removeClass('hide').addClass('show').addClass('display-warn')
                setTimeout(()=>{
                $('.warn-pop-up').removeClass('show').addClass('hide')
                },5000)
            }
        })
    })

    $(document).on('click','.ck',(event)=>{
        // {{!-- alert(event.target.id) --}}
        $.ajax({
            url:`/task/${event.target.id}`,
            method:'GET',
            error:function (error) {
                $(".load").css("display","none")
            },
            success: function(task){
                $('#c').text(task.course)
                $('#ti').text(task.title)
                $('#i').text(task.instructor)
                $('#d').text(task.lecDay)
                $('#v').text(task.venue)
                $('#t').text(task.lecTime)
                $('#u').text(new Date(parseInt(task.createdAt.substr(6))))
                $('.data-model').css('display','flex')
                $('.update').attr('id',task._id)
                $('.remove').attr('id',task._id)


                $('.remove').click((event)=>{
                    $.ajax({
                        url:`/tasks/${event.target.id}`,
                        type:'DELETE',
                        success:function(data){
                            taskTableRefresh()
                        },
                        error:function(error){
                        },
                    })
                })
            }
        })
    })

    $('#cancel').click(()=>{
        taskTableRefresh()
        $('.data-model').slideUp()
    })
    
    $.ajax({
        url:`/reps`,
        method:'GET',
        success:function(data){
            $('#name').text(data.name)
            $('#faculty').text(data.faculty)
            $('#department').text(data.department)
            $('#level').text(data.level)
            $('#phone').text(data.phone)
        },
        error:function(error){
            window.location.href='/login'
        }
    })

   
    taskTableRefresh()


    $('.cancel-warn').click(()=>{
        $('.warn-pop-up').removeClass('show').addClass('hide')
    })

    $('#update').click(()=>{
        $('.user-update').css('display','flex')
    })

    $('#submit-up').click(()=>{
        var update ={}
        var name = $('[name=name]').val(),
            phone = $('[name=phone]').val(),
            nick = $('[name=nick]').val(),
            password = $('[name=password]').val(),
            level = $('[name=level]').val();

        if(name != ''){
            update.name = name
        }if(phone != ''){
            if( isNaN(phone) ){
                err_status('red','Phone No. Must be a Number')
                return false
            }else if(phone.length < 11){
                err_status('red','Invalid Phone Number.')
                return false
            }
            update.phone = phone
        }if(nick != ''){
            update.nick = nick
        }if(level != ''){
            update.level = level
        }if(password != ''){
            if(password == '' || password == ' '){
                err_status('red','password Cannot be Empty.')
                return false
            }else if(password.length < 6){
                err_status('red','Password must be at least 6 digit.')
                return false
            }
            update.password = password
        }
        $.ajax({
            method: 'PATCH',
            url:'/reps/me',
            data: update,
            success:function(data){
                // console.log(data)
                err_status('green','Update Successfully')
            },
            error:function(error){
                err_status('red',error.responseJSON.error)
                // console.log(error)
            }
        })
    })

})

function taskTableRefresh(){
    $.ajax({
        url:`/tasks`,
    method:'GET',
    success:function(tasks){
        tasks.forEach((task,i)=>{
            var time = task.lecTime.split(':')[0]
            var day = task.lecDay
            var timeT
            var dayT
            if(time == '08'){
                timeT = 1
            }else if(time == '09'){
                timeT = 2
            }else if(time == '10'){
                timeT = 3
            }else if(time == '11'){
                timeT = 4
            }else if(time == '12'){
                timeT = 5
            }else if(time == '13'){
                timeT = 6
            }else if(time == '14'){
                timeT = 7
            }else if(time == '15'){
                timeT = 8
            }

            if(day == 'Monday'){
                dayT = 1
            }else if(day == 'Tuesday'){
                dayT = 2
            }else if(day == 'Wednesday'){
                dayT = 3
            }else if(day == 'Thursday'){
                dayT = 4
            }else if(day == 'Friday'){
                dayT = 5
            }else if(day == 'Saturday'){
                dayT = 6
            }else if(day == 'Sunday'){
                dayT = 7
            }

            document.getElementById('table').rows[timeT].cells[dayT].innerHTML = `<div class="data ck" id='${task._id}'>${task.course}</div>`
        })
        
    }
})
}

function logout(){
$.get(
    `/reps/logout`,
    function(data,status){
        window.location.href='/'
    })
}
function home(){
    window.location.href='/'
}
