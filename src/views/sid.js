$(document).ready(()=>{

    
    $('[name=sid]').keydown((e)=>{
        $('[name=chl]').val('')
        // console.log(e.keyCode)
        setTimeout(()=>{
            if( $('[name=sid]').val() == '' || $('[name=sid]').val().length <9 ) {
                $('[name=l]').val('')
                $('[name=dept]').val('')
                $('.guess').hide()
                $('[name=sid]').css('border','none')
            }else if( $('[name=sid]').val().length >= 9) {
                var sid = $('[name=sid]').val()
                var sidArray = sid.split('/')
                var current = new Date().getFullYear()

                if(sidArray.length < 4){
                    $('[name=sid]').css('border','1px solid red')
                    $('[name=l]').val('')
                    $('[name=dept]').val('')
                    return false
                }
                if($('[name=sid]').val().length >= 9){
                // department Setup
                var dept = sidArray[1].toLowerCase()
                if (dept == 'cs') {
                    dept = 'Computer Science'
                } else if(dept =='mth'){
                    dept = 'Mathematics'
                }else if(dept =='chm'){
                    dept = 'Chemistry'
                }else if(dept =='phy'){
                    dept = 'Physics'
                }else{
                    $('[name=l]').val('')
                    $('[name=dept]').val('')
                    return false
                }
                // console.log(dept)

                // Level SetUp
                var level = parseInt(sidArray[2])
                if (isNaN(level)){
                    $('[name=l]').val('')
                    $('[name=dept]').val('')
                    $('[name=sid]').css('border','1px solid red')
                    return false
                }
                level = parseInt("" + 20+level)
                level = (current - level)+"00"
                if (!(level == '100' || level == '200' || level == '300' || level == '400' || level == '500')) {
                 $('#l').text('Invalid Level')
                 $('[name=l]').val('')
                 $('[name=dept]').val('')
                //  ayar tambaya
                }else{
                    $('[name=sid]').css('border','1px solid lime')
                    // console.log(sidArray)
                    $('[name=l]').val(level)
                    $('[name=dept]').val(dept)
                    $('#l').text(level +' '+ dept + ' Department ')
                    $('.guess').show()
                    
                }
            }
        }
        },10)

       
    })

    $('#fetch-tt').click(()=>{
        var student ={
            department: $('[name=dept]').val(),
            level: $('[name=l]').val()
        }
        if(student.department =='' || student.level ==''){
            display_err('Invalid ID Number','red')
            return false
        }
        if ($('[name=chl]').val() != '') {
            student.level = $('[name=chl]').val()
        }
        
        $.ajax({
            url: '/reps/student',
            method: 'POST',
            data: student,
            success: function(data){
                
                // taskTableRefresh()
                $.ajax({
                    url:`/tasks/student`,
                    method:'GET',
                    success:function(tasks){
                      var table = document.getElementById('table')
                      for (let i = 1; i < table.rows.length; i++) {
                                for (let j = 1; j < table.rows[0].cells.length; j++) {
                                        table.rows[i].cells[j].innerHTML = `<div class="data"></h4></div>`
                                      }
                      }
                      tasks.forEach(task => {
                          task.createdAt = new Date(task.createdAt)
                      });
                    //   var taskdate =new Date(tasks.createdAt)
                      var latest = tasks.sort((a,b)=> b.createdAt - a.createdAt)
                    $('.updates').empty().append('<h4 style="color: red;">Latest Updates</h4>')
                      for (let index = 0; index < latest.length; index++) {
                        $('.updates').append(`<div id="1" class="update card">
                        <p>Created At: ${latest[index].createdAt}</p>
                        <p>Course: ${latest[index].course}</p>
                        <p>Title: ${latest[index].title}</p>
                        <p>Lecturer: ${latest[index].instructor}</p>
                        <p>Day: ${latest[index].lecDay}</p>
                        <p>Time: ${latest[index].lecTime}</p>
                        <p>Venue: ${latest[index].venue}</p>
                    </div>`)
                    if (index == 2) {
                        break
                    }
                      }

                   
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
                $('#rfaculty').text(data.faculty)
                $('#rdepartment').text(data.department)
                $('#rname').text(data.name)
                $('#rphone').text(data.phone)
                $('#rlevel').text(data.level)
              $('.coo').css('display','none')
              $('.sign-up').addClass('slide-out')
              $('.pass-rec').addClass('slide-out')
              $('.features').addClass('slide-out')
              $('.content').addClass('display').removeClass('slide-out').addClass('show')
              $('.demo').addClass('display').removeClass('slide-out').addClass('show')
            },
            beforeSend:function(){
              $('.coo').css('display','flex')
              
            },
            error: function(error){
              $('.coo').css('display','none')
            display_err(error.responseJSON.error,'orange')

            }
        })
       
    })


    $(document).on('click','.ck',(event)=>{
        // {{!-- alert(event.target.id) --}}
        $.ajax({
            url:`/task/student/${event.target.id}`,
            method:'GET',
            success: function(task){
                $('#c').text(task.course)
                $('#ti').text(task.title)
                $('#i').text(task.instructor)
                $('#d').text(task.lecDay)
                $('#v').text(task.venue)
                $('#t').text(task.lecTime)
                $('#u').text(new Date(parseInt(task.createdAt.substr(6))))
                // var a = new Date(parseInt(b.substr(6)))
                    $('.data-pop-up').removeClass('hide-data').addClass('show-data').addClass('display-data')
                    setTimeout(()=>{
                    $('.data-pop-up').removeClass('show-data').addClass('hide-data')
                    },7000)
            }
        })
    })
})
