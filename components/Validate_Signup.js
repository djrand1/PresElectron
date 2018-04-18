function checkinfo(form){
var errors=[];
var email = form.signupEmail.value;
var password = form.signupPass.value;
var check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//At least one Number, one uppercase and one lowercase letter
//At minimum six characters
  var passValid = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  //Checks if email field is not left blank.
  if(email==""){
    errors.push('Email field is empty.');
   }

//Double Checks that a valid email was entered.
    else if(!check.test(form.signupEmail.value)){
      errors.push("Please enter a valid email:");
    }
//Checks if password field is not left blank.
    if(password==""){
       errors.push('Password field is empty.');
    }
//Check that the password contain one number, one uppercase and lowercas letter.
//Also checks that the password is 6 characters long.
    else if(!passValid.test(password)){
      errors.push('Invalid Password');
    }
//Checks that the rentered password is the same as the orignal password.
    if(form.signupPass.value != form.signupPass1.value){
      errors.push("Passwords do not Match");
    }

    if(errors.length > 0){
      var message = "Errors:\n\n"
      for(var i = 0; i < errors.length; i++){
        message += errors[i] + "\n";
      }
      alert(message);
      return false;
    }

    //valid registration
    return true;
 }
