/**
 * Created by sajankumar on 9/16/14.
 */

$(document).ready(function(){

   $('.signup').hide();

   $('#signup_btn').on('click', function(){
        $('.signup').show();
        $('.login').hide();
   });


    $('#login_btn').on('click', function(){
        $('.signup').hide();
        $('.login').show();
    });


editFun();

});

function editFun(){
   $('a').each(function(i){
       if($(this).attr('id'))
       {
           var val = $(this).attr('id');
           $('.'+val.substr(10)).hide();

           $(this).on('click',function(e){

               var st = $(this).attr('id');
                var classname = st.substr(10);
               $('.'+classname).toggle();

           });
       }
   })
}