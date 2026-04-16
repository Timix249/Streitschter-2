function show(id){

  document.querySelectorAll(".card").forEach(el=>{
    el.classList.add("hidden");
  });

  const el = document.getElementById(id);
  el.classList.remove("hidden");

  el.style.animation = "none";
  el.offsetHeight;
  el.style.animation = "fadeUp 0.4s ease";
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
