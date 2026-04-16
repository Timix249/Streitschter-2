function show(id){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

function save(){

  db.collection("termine").add({
    name: document.getElementById("name").value,
    klasse: document.getElementById("klasse").value,
    date: document.getElementById("date").value,
    pause: document.getElementById("pause").value,
    room: "Raum 008"
  });

  alert("Termin gespeichert!");
}

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
