
const t = document.getElementById("title");

setInterval(()=>{
  animate(t);
  if (t.innerText === "TsukariWA") {
    t.innerText = "つかりWA";
  } else {
    t.innerText = "TsukariWA";
  }
}, 5000);

function animate(t) {
setTimeout(()=>{
  t.classList.remove("animate");
}, 1000);
t.classList.add("animate");
}
