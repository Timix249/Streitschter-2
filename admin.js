let calendar;

function login(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(()=> loadData())
    .catch(err=> alert(err.message));
}

function googleLogin(){

  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(()=> loadData())
    .catch(err=> alert(err.message));
}

function loadData(){

  db.collection("termine").onSnapshot(snapshot=>{

    const events = [];

    snapshot.forEach(doc=>{
      const d = doc.data();

      events.push({
        title: d.name + " (" + d.pause + ")",
        start: d.date
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
      events: events,

      dateClick: function(info) {
        openDay(info.dateStr);
      }
    }
  );

  calendar.render();
}
function openDay(date){

  document.getElementById("modalDate").innerText = date;
  const list = document.getElementById("modalList");
  list.innerHTML = "";

  db.collection("termine")
    .where("date", "==", date)
    .get()
    .then(snapshot=>{

      if(snapshot.empty){
        list.innerHTML = "<p>Keine Termine</p>";
        return;
      }

      snapshot.forEach(doc=>{
        const d = doc.data();

        const div = document.createElement("div");
        div.innerHTML = `
          <b>${d.name}</b><br>
          Klasse: ${d.klasse}<br>
          ${d.pause}
          <hr>
        `;

        list.appendChild(div);
      });

    });

  document.getElementById("dayModal").classList.remove("hidden");
}

function closeModal(){
  document.getElementById("dayModal").classList.add("hidden");
}
