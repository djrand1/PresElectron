function checkInfoLogin(form) {
  var errors1=[];
  var email1=form.loginEmail.value;
  var password1=form.loginPass.value;

  if(email1==""){
    errors1.push('email1 field is empty.');

   }

   if(password1==""){
      errors1.push('password1 field is empty.');

   }

   if(errors1.length > 0){
     var message1 = "errors1:\n\n"
     for(var i = 0;i< errors1.length;i++){
       message1+=errors1[i] + "\n";
     }
     alert(message1);
     return false;
   }

}
