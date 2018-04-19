// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//Variable for the modal by Id
let attemp=3;


var modal = document.getElementById('loginPage');
//Variable for the button to open modal
var modalBut = document.getElementById('loginOpen');
//Variable for the exit buttton
var exit = document.getElementsByClassName('exitBtn')[0];
//Listner for click to open login
modalBut.addEventListener('click',openModal);
//Listner to close the Login
exit.addEventListener('click',closeModal);
//Listner for clicking outside of modal
window.addEventListener('click', clickOutside);
//Function for inserting username and password into the database
function insertUser(username,password,permissions) {
  debugger;
  var PouchDB = require('pouchdb-node');

   db = new PouchDB('POD_db_test');

   var currentUserCount = 0;

   db.get('db_doccounts').then(function (doc) {

       currentUserCount = doc.users_count + 1;
       doc.users_count = currentUserCount;

       return db.put(doc);
   }).catch(function (err) {
       console.log(err);
   })

   var newUserDoc = {
       '_id': 'users_' + currentUserCount,
       'user_name': username,
       'password': password,
       'permissions': permissions
       //TODO: add, name, address, etc.
   };

   db.put(newUserDoc).then(function (response) {
       console.log(response);
   }).catch(function (err) {
       console.log(err);
   });

   return 0;

}

function searchEmail(email,form1) {
  var PouchDB = require('pouchdb-node');

   db = new PouchDB('POD_db_test');
   
   debugger;
   return db.allDocs({
       include_docs: true,
       startkey: 'users_',
       endkey: 'users_\ufff0'
   }).then(function (result) {
       //console.log(result);
       var i;
       for(i = 0; i < result.rows.length; i++) {
           console.log(result.rows[i].doc.user_name);
           if(result.rows[i].doc.user_name == email) {
               console.log('found');
               return 1;
           }
           //return 0;
       }
   }).catch(function (err) {
       console.log(err);
   });
   //console.log(foundEmail);
}

//function to open modal
function openModal(){
  modal.style.display= 'block';
}

//function to close modal
function closeModal(){
  modal.style.display= 'none';

}

//function to close modal if user clicks outside modal
function clickOutside(e){
  if(e.target == modal){
      modal.style.display="none";
    }
}

//Function for checking information from the Login form.
function checkInfoLogin(formLog,Validator,c2) {
  var count=c2;
  var errors1=[];
  var email1=formLog.loginEmail.value;
  var password1=formLog.loginPass.value;

  /*if(attemp==0){

    alert("Too many failed attempts. Please contact administrator.");
    exit();
  }*/

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

   if(Validator==false){
     attemp--;
     loginEmailFind(email1,password1,loginFin,formLog,Validator);
  }
  if(Validator==true){
    debugger;
    alert("Login Sucess");
    return true;
 }
   return false;

}



//function for checking information from the Register form.
function checkinfo(form,test1,c1){

var count = c1;
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

    if(test1==false){
      if(count==0){
        var test0 = searchEmail(email,form);
        if(test0!=null){

        }
     }
   }
   if(test1==true){
    //calling the function to insert data into the databse.
	   insertUser(email,password,1);
    //valid registration
    return true;
  }
    debugger;
    return false;
 }
//Function that swaps the login and Register tab.
 function swap(referTo){
  if(referTo.getAttribute("data-tab") == "login") {
    document.getElementById("form-body").classList.remove('active');
    referTo.parentNode.classList.remove('signup');
  }
  else{
    document.getElementById("form-body").classList.add('active');
    referTo.parentNode.classList.add('signup');
  }
 }
