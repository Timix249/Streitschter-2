let calendar;

// 🔐 ПРИ ЗАВАНТАЖЕННІ
window.onload = function(){

  let pin = localStorage.getItem("pin");

  if(pin){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("pinBox").classList.remove("hidden");
  }
};

// 🔐 LOGIN
function login(){
  auth.signInWithEmailAndPassword(email.value, password.value)
  .then(()=>{
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("setPinBox").classList.remove("hidden");
  })
  .catch(()=>alert("Login Fehler"));
}

// 🔐 SAVE PIN
function savePin(){
  localStorage.setItem("pin", newPin.value);
  document.getElementById("setPinBox").classList.add("hidden");
  openPanel();
}

// 🔐 CHECK PIN
function checkPin(){
  let pin = localStorage.getItem("pin");

  if(pinInput.value === pin){
    openPanel();
  } else {
    alert("Falscher PIN");
  }
}

// 🚀 OPEN PANEL
function openPanel(){
  document.getElementById("pinBox").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
  load();
}

// 📆 LOAD DATA
function load(){

  db.collection("termine").onSnapshot(snapshot=>{

    let events = [];
    list.innerHTML = "";

    snapshot.forEach(doc=>{
      let t = doc.data();

      let div = document.createElement("div");
      div.innerHTML = `
        <b>${t.name}</b> (${t.klasse})<br>
        ${t.date} - ${t.pause}<br>
        Raum 008
      `;
      list.appendChild(div);

      events.push({
        title: t.name,
        start: t.date
      });
    });

    renderCalendar(events);
  });
}

// 📆 CALENDAR
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
