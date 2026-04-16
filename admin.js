let calendar;

window.onload = function(){
  let pin = localStorage.getItem("pin");

  if(pin){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("pinBox").classList.remove("hidden");
  }
};

function login(){
  auth.signInWithEmailAndPassword(email.value, password.value)
  .then(()=>{
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("setPinBox").classList.remove("hidden");
  })
  .catch(()=>alert("Login Fehler"));
}

function savePin(){
  localStorage.setItem("pin", newPin.value);
  openPanel();
}

function checkPin(){
  if(pinInput.value === localStorage.getItem("pin")){
    openPanel();
  } else {
    alert("Falscher PIN");
  }
}

function openPanel(){
  document.getElementById("pinBox").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
  load();
}

function load(){
  db.collection("termine").onSnapshot(snapshot=>{

    let events = [];
    list.innerHTML = "";

    snapshot.forEach(doc=>{
      let t = doc.data();

      let div = document.createElement("div");
      div.innerHTML = `${t.name} (${t.klasse}) - ${t.date}`;
      list.appendChild(div);

      events.push({
        title: t.name,
        start: t.date
      });
    });

    renderCalendar(events);
  });
}

function renderCalendar(events){

  if(calendar) calendar.destroy();

  calendar = new FullCalendar.Calendar(
    document.getElementById("calendar"),
    {
      initialView: 'dayGridMonth',
      locale: 'de',
      events: events
    }
  );

  calendar.render();
}
