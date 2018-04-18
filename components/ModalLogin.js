//Variable for the modal by Id
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
window.addEventListener('click', clickOutside)

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
