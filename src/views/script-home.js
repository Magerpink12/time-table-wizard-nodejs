
// Faculty and department selection

$('[name=faculty]').on('change',()=>{
    if ( $('[name=faculty]').val() == ''){
        $('[name=department]').empty().append(new Option('Please select Faculty first',''))
    }else if( $('[name=faculty]').val() == 'Science'){
        $('[name=department]').empty().append(new Option('Select Department',''),
                                            new Option('Computer Science','Computer Science'),
                                            new Option('Mathematics and Statistics','Mathematics and Statistics'),
                                            new Option('Chemistry','Chemistry'),
                                            new Option('Physics','Physics'),
                                            new Option('Biology','Biology'))
    }else if( $('[name=faculty]').val() == 'Art and Education'){
        $('[name=department]').empty().append(new Option('Select Department',''),
                                            new Option('English','English'),
                                            new Option('History','History'),
                                            new Option('Arabic','Arabic'),
                                            new Option('Islamic Studies','Islamic Studies'),
                                            new Option('Education Mathematics','Education Mathematics'),
                                            new Option('Education physics','Education Physics'))
    }else if( $('[name=faculty]').val() == 'Law'){
        $('[name=department]').empty().append(new Option('Select Department',''),
                                            new Option('Civil Law','Civil Law'),
                                            new Option("Sheri'a Law","Sheri'a Law"))
    }else if( $('[name=faculty]').val() == 'Medical'){
        $('[name=department]').empty().append(new Option('Select Department',''),
                                            new Option('MBBS','MBBS'),
                                            new Option('Dentistry','Dentistry'),
                                            new Option('Micro Biology','Micro Biology'),
                                            new Option('Human Anatomy','Human Anatomy'),
                                            new Option('Physiotheraphy','Physiotheraphy'))
    }else if( $('[name=faculty]').val() == 'Social Management Science'){
        $('[name=department]').empty().append(new Option('Select Department',''),
                                            new Option('Geography','Geography'),
                                            new Option('Political Science','Political Science'),
                                            new Option('Sociology','Sociology'),
                                            new Option('Business Administration','Business Administration'))
    }
})