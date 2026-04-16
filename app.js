function show(id){
  document.querySelectorAll(".screen").forEach(s=>{
    s.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

function save(){

  const name = document.getElementById("name").value;
  const klasse = document.getElementById("klasse").value;
  const date = document.getElementById("date").value;
  const pause = document.getElementById("pause").value;

  if(!name || !klasse || !date){
    alert("Bitte alles ausfüllen");
    return;
  }

  db.collection("termine").add({
    name,
    klasse,
    date,
    pause
  });

  alert("Gespeichert ✅");
}
