var txt;
var previous;
var already=false;
var addressP;
var p=0;
var indexVal = 10;
var dothings;

/*To do : if user clicks outside of calendar it exits outside
use the e
*/


var Calendar = function(model, options, date){

  // Default Values
  this.Options = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],
    ModelChange: model
  };
  /*
  (function() {

  var titles = document.querySelectorAll(".cld-day");
  var i = titles.length;
  while (i--) {
      titles[i].onclick = mysFunction
  }

  })();
*/
  // Overwriting default values
  for(var key in options){
    this.Options[key] = typeof options[key]=='string'?options[key].toLowerCase():options[key];
  }

  model?this.Model=model:this.Model={};
  this.Today = new Date();

  this.Selected = this.Today
  this.Today.Month = this.Today.getMonth();
  this.Today.Year = this.Today.getFullYear();
  if(date){this.Selected = date}
  this.Selected.Month = this.Selected.getMonth();
  this.Selected.Year = this.Selected.getFullYear();

  this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
  this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
  this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

  this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
  if(this.Selected.Month==0){this.Prev = new Date(this.Selected.Year-1, 11, 1);}
  this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
};

function createCalendar(calendar, element, adjuster){

  if(typeof adjuster !== 'undefined'){
    var newDate = new Date(calendar.Selected.Year, calendar.Selected.Month + adjuster, 1);
    calendar = new Calendar(calendar.Model, calendar.Options, newDate);
    element.innerHTML = '';
  }else{
    for(var key in calendar.Options){
      typeof calendar.Options[key] != 'function' && typeof calendar.Options[key] != 'object' && calendar.Options[key]?element.className += " " + key + "-" + calendar.Options[key]:0;
    }
  }
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  function AddSidebar(){
    var sidebar = document.createElement('div');
    sidebar.className += 'cld-sidebar';

    var monthList = document.createElement('ul');
    monthList.className += 'cld-monthList';

    for(var i = 0; i < months.length - 3; i++){
      var x = document.createElement('li');
      x.className += 'cld-month';
      var n = i - (4 - calendar.Selected.Month);
      // Account for overflowing month values
      if(n<0){n+=12;}
      else if(n>11){n-=12;}
      // Add Appropriate Class
      if(i==0){
        x.className += ' cld-rwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, -1);});
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,75 100,75 50,0"></polyline></svg>';
      }
      else if(i==months.length - 4){
        x.className += ' cld-fwd cld-nav';
        x.addEventListener('click', function(){
          typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
          createCalendar(calendar, element, 1);} );
        x.innerHTML += '<svg height="15" width="15" viewBox="0 0 100 75" fill="rgba(255,255,255,0.5)"><polyline points="0,0 100,0 50,75"></polyline></svg>';
      }
      else{
        if(i < 4){x.className += ' cld-pre';}
        else if(i > 4){x.className += ' cld-post';}
        else{x.className += ' cld-curr';}

        //prevent losing var adj value (for whatever reason that is happening)
        (function () {
          var adj = (i-4);
          //x.addEventListener('click', function(){createCalendar(calendar, element, adj);console.log('kk', adj);} );
          x.addEventListener('click', function(){
            typeof calendar.Options.ModelChange == 'function'?calendar.Model = calendar.Options.ModelChange():calendar.Model = calendar.Options.ModelChange;
            createCalendar(calendar, element, adj);} );
          x.setAttribute('style', 'opacity:' + (1 - Math.abs(adj)/4));
          x.innerHTML += months[n].substr(0,3);
        }()); // immediate invocation

        if(n==0){
          var y = document.createElement('li');
          y.className += 'cld-year';
          if(i<5){
            y.innerHTML += calendar.Selected.Year;
          }else{
            y.innerHTML += calendar.Selected.Year + 1;
          }
          monthList.appendChild(y);
        }
      }
      monthList.appendChild(x);
    }
    sidebar.appendChild(monthList);
    if(calendar.Options.NavLocation){
      document.getElementById(calendar.Options.NavLocation).innerHTML = "";
      document.getElementById(calendar.Options.NavLocation).appendChild(sidebar);
    }
    else{element.appendChild(sidebar);}
  }

  var mainSection = document.createElement('div');
  mainSection.className += "cld-main";

  function AddDateTime(){
      var datetime = document.createElement('div');
      datetime.className += "cld-datetime";
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var rwd = document.createElement('div');
        rwd.className += " cld-rwd cld-nav";
        rwd.addEventListener('click', function(){createCalendar(calendar, element, -1);} );

        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>';
        datetime.appendChild(rwd);
      }
      var today = document.createElement('div');
      today.className += ' today';
      today.innerHTML = months[calendar.Selected.Month] + ", " + calendar.Selected.Year;
      datetime.appendChild(today);
      if(calendar.Options.NavShow && !calendar.Options.NavVertical){
        var fwd = document.createElement('div');
        fwd.className += " cld-fwd cld-nav";
        fwd.addEventListener('click', function(){createCalendar(calendar, element, 1);} );
        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        datetime.appendChild(fwd);
      }
      if(calendar.Options.DatetimeLocation){
        document.getElementById(calendar.Options.DatetimeLocation).innerHTML = "";
        document.getElementById(calendar.Options.DatetimeLocation).appendChild(datetime);
      }
      else{mainSection.appendChild(datetime);}
  }

  function AddLabels(){

    var labels = document.createElement('ul');
    labels.className = 'cld-labels';
    var labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for(var i = 0; i < labelsList.length; i++){
      var label = document.createElement('li');
      label.className += "cld-label";
      label.innerHTML = labelsList[i];
      labels.appendChild(label);
    }
    mainSection.appendChild(labels);
  }
  function mysFunction(indexVal) {
    //console.log(document.querySelector(".cld-number").innerHTML)


      var person = prompt("Please enter event:", "User Id");
      if (person == null || person == "") {

      }
      else if(already==true){
        txt = " ";
        addressP = document.querySelectorAll(".cld-number")[indexVal].innerHTML
        addressP = addressP.replace(/\D/g,'') + "  ";
      txt = person
      console.log(addressP)
              addressP += txt;
              document.querySelectorAll("li p")[indexVal].innerHTML =addressP;
      }
      else {
          txt = "  " + person ;
          p++;
        document.querySelectorAll("li p")[indexVal].innerHTML += txt;
        already = true;
      }
            previous = txt;

  }

  function AddDays(){

    // Create Number Element
    function DayNumber(n){
      var number = document.createElement('p');
      number.className += "cld-number";
      number.innerHTML += n;
      return number;
    }
    var days = document.createElement('ul');
    days.className += "cld-days";

    // Previous Month's Days
    for(var i = 0; i < (calendar.Selected.FirstDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day prevMonth";
      //Disabled Days
      var d = i%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }

      var number = DayNumber((calendar.Prev.Days - calendar.Selected.FirstDay) + (i+1));
      day.appendChild(number);

      days.appendChild(day);
    }
    // Current Month's Days
    for(var i = 0; i < calendar.Selected.Days; i++){
      var day = document.createElement('li');
      day.className += "cld-day currMonth";
      day.setAttribute("onclick","pop()")
            //Disabled Days
      var d = (i + calendar.Selected.FirstDay)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }
      }




      var number = DayNumber(i+1);
      // Check Date against Event Dates
      for(var n = 0; n < calendar.Model.length; n++){

        var evDate = calendar.Model[n].Date;
        var toDate = new Date(calendar.Selected.Year, calendar.Selected.Month, (i+1));
        if(evDate.getTime() == toDate.getTime()){
          number.className += " eventday";
          var title = document.createElement('span');
          title.className += "cld-title";
          if(typeof calendar.Model[n].Link == 'function' || calendar.Options.EventClick){
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.innerHTML += calendar.Model[n].Title;
            if(calendar.Options.EventClick){
              var z = calendar.Model[n].Link;
              if(typeof calendar.Model[n].Link != 'string'){
                  a.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  if(calendar.Options.EventTargetWholeDay){
                    day.className += " clickable";
                    day.addEventListener('click', calendar.Options.EventClick.bind.apply(calendar.Options.EventClick, [null].concat(z)) );
                  }
              }else{
                a.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                if(calendar.Options.EventTargetWholeDay){
                  day.className += " clickable";
                  day.addEventListener('click', calendar.Options.EventClick.bind(null, z) );
                }
              }
            }else{

              a.addEventListener('click', calendar.Model[n].Link);
              if(calendar.Options.EventTargetWholeDay){
                day.className += " clickable";
                day.addEventListener('click', calendar.Model[n].Link);
              }
            }
            title.appendChild(a);
          }else{
            title.innerHTML += '<a href="' + calendar.Model[n].Link + '">' + calendar.Model[n].Title + '</a>';
          }
          number.appendChild(title);
        }
      }
      day.appendChild(number);
      // If Today..
      if((i+1) == calendar.Today.getDate() && calendar.Selected.Month == calendar.Today.Month && calendar.Selected.Year == calendar.Today.Year){
        day.className += " today";
      }
      days.appendChild(day);
    }
    // Next Month's Days
    // Always same amount of days in calander
    var extraDays = 13;
    if(days.children.length>35){extraDays = 6;}
    else if(days.children.length<29){extraDays = 20;}

    for(var i = 0; i < (extraDays - calendar.Selected.LastDay); i++){
      var day = document.createElement('li');
      day.className += "cld-day nextMonth";
      //Disabled Days
      var d = (i + calendar.Selected.LastDay + 1)%7;
      for(var q = 0; q < calendar.Options.DisabledDays.length; q++){
        if(d==calendar.Options.DisabledDays[q]){
          day.className += " disableDay";
        }

      }

      var number = DayNumber(i+1);
      day.appendChild(number);

      days.appendChild(day);
    }
    mainSection.appendChild(days);
  }
  if(calendar.Options.Color){
    mainSection.innerHTML += '<style>.cld-main{color:' + calendar.Options.Color + ';}</style>';
  }
  if(calendar.Options.LinkColor){
    mainSection.innerHTML += '<style>.cld-title a{color:' + calendar.Options.LinkColor + ';}</style>';
  }
  element.appendChild(mainSection);

  if(calendar.Options.NavShow && calendar.Options.NavVertical){
    AddSidebar();
  }
  if(calendar.Options.DateTimeShow){
    AddDateTime();
  }
  AddLabels();
  AddDays();

  var pop = (function(index){
     indexWhereClicked = document.querySelector('.cld-days');
  for (var i = 0, len = indexWhereClicked.children.length; i < len; i++)
  {

      (function(index){
          indexWhereClicked.children[i].onclick = function(){
              //  alert(index)  ;
                indexVal = index;
                console.log("from pop index wow!!!" + indexVal);// checking to see if it is in fact returning index and it does !!!
                    mysFunction(indexVal);
                return index;

          }
  })(i);
  }
  })(i);
}

function caleandar(el, data, settings){
  var obj = new Calendar(data, settings);
  createCalendar(obj, el);

}





var events = [
  {'Date': new Date(2016, 6, 7), 'Title': 'Doctor appointment at 3:25pm.'},
  {'Date': new Date(2016, 6, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
  {'Date': new Date(2016, 6, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
];
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);


//document.querySelector(".cld-day").setAttribute("onclick","mysFunction()")
/*
(function() {

var titles = document.querySelectorAll(".cld-day");
var i = titles.length;
while (i--) {
    titles[i].setAttribute("onclick", "mysFunction()");
}

})();
*/


 //indexVal = 0;
 indexWhereClicked = document.querySelector('.cld-days');

/*
The purpose of this immediately invoked function is to return the index of the spot on the calendar was indexWhereClicked
each day is an index in the dom
*/
/*
for (var i = 0, len = indexWhereClicked.children.length; i < len; i++)
{

    (function(index){
        indexWhereClicked.children[i].onclick = function(){
            //  alert(index)  ;
              indexVal = index;
              console.log(indexVal);// checking to see if it is in fact returning index and it does !!!

              mysFunction(indexVal);
        }
    })(i);
}
*/
/*
var pop = (function(index){
for (var i = 0, len = indexWhereClicked.children.length; i < len; i++)
{

    (function(index){
        indexWhereClicked.children[i].onclick = function(){
            //  alert(index)  ;
              indexVal = index;
              console.log("from pop index wow!!!" + indexVal);// checking to see if it is in fact returning index and it does !!!
                  mysFunction(indexVal);
              return index;

        }
})(i);
}
})(i);
*/



function mysFunction() {
  //console.log(document.querySelector(".cld-number").innerHTML)
pop(addressP);

    var person = prompt("Please enter event:", "User Id");
    if (person == null || person == "") {

    }
    else if(already==true){
      pop;
      txt = " ";
      addressP = document.querySelectorAll(".cld-number")[indexVal].innerHTML
      addressP = addressP.replace(/\D/g,'') + "  ";
    txt = person
    console.log("from variable addressp in side mysfunction " + addressP)
            addressP += txt;
            document.querySelectorAll("li p")[indexVal].innerHTML =addressP;
    }
    else {
        txt = "  " + person ;
        p++;
    addressP=  document.querySelectorAll("li p")[indexVal].innerHTML += txt;
    document.querySelectorAll("li p")[indexVal].innerHTML += txt;

      already = true;
    }
          previous = txt;

          //sessionStorage.setItem('autosave', addressP);
          /*
          for (var i = 0, len = indexWhereClicked.children.length; i < len; i++)
          {

              (function(index){
                  indexWhereClicked.children[i].onclick = function(){
                      //  alert(index)  ;
                        indexVal = index;
                        console.log(indexVal);// checking to see if it is in fact returning index and it does !!!

                        mysFunction(indexVal);
                  }
              })(i);
          }
*/

}

/*

var txt;
var previous;
var already=false;
var addressP;
var p=0;
/*

/mysFunction handles putting events into the Calendar
person holds the string that the user puts in
after the prompt the if that cell hasn't been set it
will do thee last statement if it has
it will do already == true statement where it will take that Element
remove all of the characters that arent integers and append the new text

slight bug if you change months and click a cell it doesnt work :/
*/
/*
function mysFunction(indexVal) {
  //console.log(document.querySelector(".cld-number").innerHTML)


    var person = prompt("Please enter event:", "User Id");
    if (person == null || person == "") {

    }
    else if(already==true){
      txt = " ";
      addressP = document.querySelectorAll(".cld-number")[indexVal].innerHTML
      addressP = addressP.replace(/\D/g,'') + "  ";
    txt = person
    console.log(addressP)
            addressP += txt;
            document.querySelectorAll("li p")[indexVal].innerHTML =addressP;
    }
    else {
        txt = "  " + person ;
        p++;
      document.querySelectorAll("li p")[indexVal].innerHTML += txt;
      already = true;
    }
          previous = txt;

}
*/
var bad = true;
  var good = false;
    const CTA = document.querySelector("#caleandar").classList;
    var i = 0;

    document.getElementById("ui").addEventListener('click',function ()
    {
      var current = " ";
        //document.getElementById('caleandar').classList.remove('hide');
        const IO = document.querySelector('#caleandar').classList;
var i =0;

if (document.querySelector("#caleandar").classList.contains('hide')) {
  document.getElementById('caleandar').classList.remove('hide');
// do some stuff
}
else{
  document.getElementById('caleandar').classList.add('hide');
}






     //validation code to see State field is mandatory.

    }  );
