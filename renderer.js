// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//Variable for the modal by Id

let attemp=3;

let test4=false;

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
    let userInsertSql = 'INSERT INTO user_info (username,password,permissions)\n'+
                        ' VALUES\n'+
                        '('+ '"'+username+'"' +','+ '"'+password+'"' +','+ permissions +');'
	exectueSQLstmt(userInsertSql);
}
//Execute the Sqlites statements
function exectueSQLstmt(stmt) {
  const sqlite3 = require('sqlite3').verbose();

  const path = require('path');

  let db_path = '%CD%';


  let db = new sqlite3.Database(db_path+'POD_dbfile.db', (err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('SQLiteTestDB Connected');
  });
    db.run(stmt);
    db.close();

}

function searchEmail(email2, callback,form1,test) {
  const sqlite3 = require('sqlite3').verbose();

  const path = require('path');

  let db_path = '%CD%';

  let db = new sqlite3.Database(db_path+'POD_dbfile.db', (err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('SQLiteTestDB Connected');
  });

  db.get("SELECT * FROM user_info WHERE username = ?",[email2],function (err, rows) {
            if (err || rows == undefined ){
                callback("",form1,true);
            } else {
                callback("Username Taken",form1,false);
            }
         });

  db.close();

}

function finEmail(str,form2,test2){
  debugger;
  if(str!=""){
    alert(str);
    //checkinfo(form2,false,1);
  }else {
    checkinfo(form2,true,1);
  }
}

function loginEmailFind(email3,pass,callback,form3,test8){
  const sqlite3 = require('sqlite3').verbose();

  const path = require('path');

  let db_path = '%CD%';

  let db = new sqlite3.Database(db_path+'POD_dbfile.db', (err) => {
      if (err) {
          console.error(err.message);
      }
      console.log('SQLiteTestDB Connected');
  });

  db.get("SELECT * FROM user_info WHERE username = ? AND password = ? ",[email3,pass],function (err, rows) {
            if (err || rows == undefined ){
                callback("Wrong Username or password",form3,false);
            } else {
                callback("",form3,true);
            }
         });

  db.close();

}

function loginFin(str,form6,test2){
 debugger;
  if(str!=""){
    alert(str);
    //checkInfoLogin(form6,false,1);
  }else {
    checkInfoLogin(form6,true,1);
  }
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
     searchEmail(email,finEmail,form,test1);
     }
   }
   if(test1==true){
     debugger;
    //calling the function to insert data into the databse.
	   insertUser(email,password,1);
    //valid registration
    return true;
  }

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
