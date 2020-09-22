function display_err(err_text, text_color){
    $('.warn-message').text(`${err_text}`)
    $('.warn-pop-up').css('border-left',`10px solid ${text_color}`).removeClass('hide').addClass('show').addClass('display-warn')
        setTimeout(()=>{
        $('.warn-pop-up').removeClass('show').addClass('hide')
},5000)
}

$(document).ready(()=>{
    $('#sign-up').click(()=>{
        $('.pass-rec').addClass('slide-out')
        $('.content').addClass('slide-out')
        $('.sign-up').addClass('display').removeClass('slide-out').addClass('show')
    })

    $('#pass-rec').click(()=>{
            $('.sign-up').addClass('slide-out')
            $('.content').addClass('slide-out')
            $('.pass-rec').addClass('display').removeClass('slide-out').addClass('show')
    })
    // $('#fetch-tt').click(()=>{
    //         $('.sign-up').addClass('slide-out')
    //         $('.pass-rec').addClass('slide-out')
    //         $('.features').addClass('slide-out')
    //         $('.content').addClass('display').removeClass('slide-out').addClass('show')
    //         $('.demo').addClass('display').removeClass('slide-out').addClass('show')
    // })

    // $('.data').click(()=>{
    //     $('.data-pop-up').removeClass('hide-data').addClass('show-data').addClass('display-data')
    //     setTimeout(()=>{
    //     $('.data-pop-up').removeClass('show-data').addClass('hide-data')
    //     },7000)
    // })

    $('.cancel-data').click(()=>{
        $('.data-pop-up').removeClass('show-data').addClass('hide-data')
    })

    $('#kawai').click(()=>{
        $('.warn-pop-up').css('border-left','10px solid green').removeClass('hide').addClass('show').addClass('display-warn')
                setTimeout(()=>{
                $('.warn-pop-up').removeClass('show').addClass('hide')
        },5000)
    })
    $('.cancel-warn').click(()=>{
        $('.warn-pop-up').removeClass('show').addClass('hide')
    })
    
//     $('[name=sid]').keydown((e)=>{
//         // console.log(e.keyCode)
//         setTimeout(()=>{
//             if( $('[name=sid]').val() == '') {
//                 $('.guess').hide()
//                 $('[name=sid]').css('border','none')
//             }else if( $('[name=sid]').val().length >= 9) {
//                 var sid = $('[name=sid]').val()
//                 var sidArray = sid.split('/')
//                 var current = new Date().getFullYear()

//                 if(sidArray.length < 4){
//                     $('[name=sid]').css('border','1px solid red')
//                     return false
//                 }
//                 if($('[name=sid]').val().length == 9){
//                 // department Setup
//                 var dept = sidArray[1].toLowerCase()
//                 if (dept == 'cs') {
//                     dept = 'Computer Science'
//                 } else if(dept =='mth'){
//                     dept = 'Mathematics'
//                 }else if(dept =='chm'){
//                     dept = 'Chemistry'
//                 }else if(dept =='phy'){
//                     dept = 'Physics'
//                 }else{
//                     return false
//                 }
//                 console.log(dept)





//                 // Level SetUp
//                 var level = parseInt(sidArray[2])
//                 if (isNaN(level)){
//                     $('[name=sid]').css('border','1px solid red')
//                     return false
//                 }
//                 level = parseInt("" + 20+level)
//                 var l = (current - level)+"00"
//                 if (!(l == '100' || l == '200' || l == '300' || l == '400' || l == '500')) {
//                  $('#l').text('Invalid Level')
//                 //  ayar tambaya
//                 }else{
//                     $('[name=sid]').css('border','1px solid lime')
//                     console.log(sidArray)
//                     $('#l').text(l +' '+ dept + 'Department ')
//                     $('.guess').show()
//                     // var student = {
//                     //     department: dept,
//                     //     level:l
//                     // }
//                 //     $('#fetch-tt').click(()=>{
//                 //         console.log(student)
//                 //         $('.sign-up').addClass('slide-out')
//                 //         $('.pass-rec').addClass('slide-out')
//                 //         $('.features').addClass('slide-out')
//                 //         $('.content').addClass('display').removeClass('slide-out').addClass('show')
//                 //         $('.demo').addClass('display').removeClass('slide-out').addClass('show')
//                 // })
//                 }
//             }
//         }
//         },100)
        
//     //     $('[name=password]').keydown(()=>{
//     //         setTimeout(()=>{
//     //             if( $('[name=confirm]').val() == '' && $('[name=password]').val()=='') {
//     //                 $('#match').css('color','red').empty()
//     //             }else if( $('[name=confirm]').val() !== $('[name=password]').val()) {
//     //                 $('#match').css('color','red').text('does not matches')
//     //             }else{
//     //                 $('#match').css('color','lime').text('matches')
//     //             }
//     //         },100)
//     //     })
//     var student = {
//         department: dept,
//         level:l
//     }
//     $('#fetch-tt').click(()=>{
//         console.log(student)
//         $('.sign-up').addClass('slide-out')
//         $('.pass-rec').addClass('slide-out')
//         $('.features').addClass('slide-out')
//         $('.content').addClass('display').removeClass('slide-out').addClass('show')
//         $('.demo').addClass('display').removeClass('slide-out').addClass('show')
// })
//     })
    // $('[name=password]').keydown(()=>{
    //     setTimeout(()=>{
    //         if($('[name=password]').val().length < 6) {
    //             $('[name=password]').css('border','1px solid red')
    //         }else{
    //             $('[name=password]').css('border','1px solid lime')
    //         }if($('[name=password]').val()=='') {
    //             $('[name=password]').css('border','none')
    //         }
    //     },100)
    // })


    // Sign up functions

    $('[name=confirm]').keydown(()=>{
        setTimeout(()=>{
            if( $('[name=confirm]').val() == '' && $('[name=password]').val()=='') {
                $('[name=password]').css('border','none')
                $('[name=confirm]').css('border','none')
            }else if( $('[name=confirm]').val() !== $('[name=password]').val()) {
                $('[name=confirm]').css('border','1px solid red')
            }else{
                $('[name=confirm]').css('border','1px solid lime')
            }
        },100)
        
        $('[name=password]').keydown(()=>{
            setTimeout(()=>{
                if( $('[name=confirm]').val() == '' && $('[name=password]').val()=='') {
                    $('[name=password]').css('border','none')
                }else if( $('[name=confirm]').val() !== $('[name=password]').val()) {
                    $('[name=confirm]').css('border','1px solid red')
                }else{
                    $('[name=password]').css('border','1px solid lime')
                }
            },100)
        })
    })
    $('[name=password]').keydown(()=>{
        setTimeout(()=>{
            if($('[name=password]').val().length < 6) {
                $('[name=password]').css('border','1px solid red')
            }else{
                $('[name=password]').css('border','1px solid lime')
            }if($('[name=password]').val()=='') {
                $('[name=password]').css('border','none')
            }
        },100)
    })

    $('#signup-btn').click(()=>{
        var name = $('[name=names]').val()
        var phone = $('[name=phone]').val()
        var password = $('[name=password]').val()
        var department = $('[name=department]').val()
        var faculty = $('[name=faculty]').val()
        var level = $('[name=level]').val()
        var confirm = $('[name=confirm]').val()
        var nick = $('[name=nick]').val()

        if (name == '' || name == ' ') {
            display_err('Name Field Cannot be Empty','red')
            return false
        } else if(phone == '' || phone == ' '){
            display_err('Phone No. Field Cannot be Empty','red')
            return false
        }else if( isNaN(phone) ){
            display_err('Phone No. Must be a Number','red')
            return false
        }else if(phone.length < 11){
            display_err('Invalid Phone Number.','red')
            return false
        }else if(password == '' || password == ' '){
            display_err('password Cannot be Empty.','red')
            return false
        }else if(password.length < 6){
            display_err('Password must be at least 6 digit.','red')
            return false
        }else if(confirm != password){
            display_err("Passwor Doesn't Match.","red")
            return false
        }else if(nick == '' || nick == ' '){
            display_err('Nick Name field cannot be Empty','red')
            return false
        }else if(faculty == ''){
            display_err('Faculty field cannot be Empty','red')
            return false
        }else if(department == ''){
            display_err('Department field cannot be Empty','red')
            return false
        }else if(level == ''){
            display_err('Level field cannot be Empty','red')
            return false
        }
        var sign={
            name,
            phone,
            password,
            department,
            faculty,
            level,
            confirm,
            nick
        }
        // console.log(sign)
        // Signup requestss
        $.ajax({
            method:'POST',
            url: '/reps/reg',
            data:sign,
            success:function (data) {
              console.log(data)
              window.location.href = '/dashboard'
              $('.coo').css('display','none')
            },
            beforeSend: function(){
                $('.coo').css('display','flex')
            },
            error: function(error){
                $('.coo').css('display','none')
                display_err(`${error.responseJSON.error}`,'orange')
                
                // console.log(error)
            }
        })
    })

     // Password Reset
     $('[name=rec-confirm]').keydown(()=>{
        setTimeout(()=>{
            if( $('[name=rec-confirm]').val() == '' && $('[name=rec-password]').val()=='') {
                $('[name=rec-password]').css('border','none')
                $('[name=rec-confirm]').css('border','none')
            }else if( $('[name=rec-confirm]').val() !== $('[name=rec-password]').val()) {
                $('[name=rec-confirm]').css('border','1px solid red')
            }else{
                $('[name=rec-confirm]').css('border','1px solid lime')
            }
        },100)
        
        $('[name=rec-password]').keydown(()=>{
            setTimeout(()=>{
                if( $('[name=rec-confirm]').val() == '' && $('[name=rec-password]').val()=='') {
                    $('[name=rec-password]').css('border','none')
                }else if( $('[name=rec-confirm]').val() !== $('[name=rec-password]').val()) {
                    $('[name=rec-confirm]').css('border','1px solid red')
                }else{
                    $('[name=rec-password]').css('border','1px solid lime')
                }
            },100)
        })
    })
    $('[name=rec-password]').keydown(()=>{
        setTimeout(()=>{
            if($('[name=rec-password]').val().length < 6) {
                $('[name=rec-password]').css('border','1px solid red')
            }else{
                $('[name=rec-password]').css('border','1px solid lime')
            }if($('[name=rec-password]').val()=='') {
                $('[name=rec-password]').css('border','none')
            }
        },100)
    })
     $('#rec-btn').click(()=>{
        var phone = $('[name=phone1]').val()
        var password = $('[name=rec-password]').val()
        var confirm = $('[name=rec-confirm]').val()
        var nick = $('[name=nickname]').val()

        if(phone == '' || phone == ' '){
            display_err('Phone No. Field Cannot be Empty','red')
            return false
        }else if( isNaN(phone) ){
            display_err('Phone No. Must be a Number','red')
            return false
        }else if(phone.length < 11){
            display_err('Invalid Phone Number.','red')
            return false
        }else if(nick == '' || nick == ' '){
            display_err('Nick Name field cannot be Empty','red')
            return false
        }else if(password == '' || password == ' '){
            display_err('password Cannot be Empty.','red')
            return false
        }else if(password.length < 6){
            display_err('Password must be at least 6 digit.','red')
            return false
        }else if(confirm == ''){
            display_err("Confirm field cannot be Empty.","red")
            return false
        }else if(confirm != password){
            display_err("Passwor Doesn't Match.","red")
            return false
        }
        var rec={
            phone,
            password,
            nick
        }
        // console.log(rec)
        $.ajax({
            method:'PATCH',
            url: '/reps/pass_rec',
            data:rec,
            success: function(data){
                // console.log(data)
            display_err(data.success,"lime")
                $('.coo').css('display','none')
                $('[name=phone1]').val('')
                $('[name=rec-password]').val('')
                $('[name=rec-confirm]').val('')
                $('[name=nickname]').val('')
            },
            error:function(error){
                // console.log(error.responseJSON.error)
            display_err(error.responseJSON.error,"orange")

              $('.coo').css('display','none')
            },
            beforeSend:function(){
                $('.coo').css('display','flex')
            }
        })
    })
    

// requestss

   


})