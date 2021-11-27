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
                document.getElementById("command").innerText = `${commands.length} Commands Loaded`
                console.log(commands)
            })
        })
    })
})


