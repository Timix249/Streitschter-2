let calendar;

function login(){

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      loadData();
    })
    .catch(err=>{
      alert(err.message);
    });
}

function googleLogin(){

  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then(()=>{
      loadData();
    })
    .catch(err=>{
      alert(err.message);
    });
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
      events: events
    }
  );

  calendar.render();
}

document.addEventListener("DOMContentLoaded", ()=>{

  calendar = new FullCalendar.Calendar(
    document.getElementById("calendar"),
    {
      initialView: 'dayGridMonth'
    }
  );

  calendar.render();

});
