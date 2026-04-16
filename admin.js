llet calendar;

function login(){
  alert("Login (Firebase kommt hier)");
}

function checkPin(){
  alert("PIN geprüft");
}

function savePin(){
  alert("PIN gespeichert");
}

document.addEventListener("DOMContentLoaded", function(){

  calendar = new FullCalendar.Calendar(
    document.getElementById("calendar"),
    {
      initialView: 'dayGridMonth'
    }
  );

  calendar.render();

});
