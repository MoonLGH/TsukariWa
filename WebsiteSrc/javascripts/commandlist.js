/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
const table = document.getElementById("tablePlaceHolder");
const query = document.querySelector("#search-input > input");
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let search = params.search || ""

function setCMD(cmd){
  // <th>Usage</th>
  // <th>Permission needed</th>
  table.innerHTML = `<thead><tr>
    <th>Name</th>
    <th>Description</th>
    <th>Alias</th>
    <th>Category</th>
    <th>Code</th>
    </tr></thead>`;
  for (let i = 0; i < cmd.length; i++) {
    if (cmd[i].name.toLowerCase().includes(search.toLowerCase()) || cmd[i].alias.includes(search.toLowerCase())) {
      // <td data-label="Usage">${(cmd[i].usage.replace(cmd[i].name, capitalizeFirstLetter(cmd[i].name))).replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</td>
      // <td data-label="Permission Needed">${cmd[i].other.permission.length !== 0 ? cmd[i].other.permission.join(" & ") : "-"}</td>
      table.innerHTML += `<tbody><tr>
          <td data-label="Name">${capitalizeFirstLetter(cmd[i].name)}</td>
          <td data-label="Description">${cmd[i].description}</td>
          <td data-label="Alias">${cmd[i].alias.length !== 0 ? capitalizeFirstLetterArray(cmd[i].alias).join("/") : "-"}</td>
          <td data-label="Category">${cmd[i].category}</td>
          <td data-label="Code"><a class="link" href="${generateCodeLink(cmd[i])}">Code</a></td>
          </tr></tbody>`;
    }
  }
}

function generateCodeLink(code) {
  return `https://github.com/MoonLGH/TsukariWa/blob/main${code.path}`;
}

// make when enter pressed on query do inputchange()
query.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    inputchange();
  }
});


function inputchange() {
  window.location.href = `?search=${query.value}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function capitalizeFirstLetterArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = capitalizeFirstLetter(arr[i]);
  }
  return arr;
}

let url = "https://api.github.com/repos/MoonLGH/TsukariWa/git/trees/main"

async function dofetch(url){
    let fetching = await fetch(url)
    let data = await fetching.json()
    return data
}
function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}


dofetch(url).then(tree =>{
  dofetch(tree.tree.find(item => item.path === "src").url).then(tree =>{
      dofetch(tree.tree.find(item => item.path === "commands").url).then(tree =>{
          dofetch(tree.tree.find(item => item.path === "commandsList.json").url).then(list =>{
              let commands = JSON.parse(b64DecodeUnicode(list.content))
              setCMD(commands)
          })
      })
  })
})