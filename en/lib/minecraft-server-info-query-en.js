function serverquery(){
    // Define the API URL
    const apiUrl = 'https://api.mcsrvstat.us/3/2b2t.org';
    const outputElementName = document.getElementById('r-name');
    const outputElementPlayer = document.getElementById('r-player');
    const outputElementOnline = document.getElementById('r-online');
    const outputElementVersion = document.getElementById('r-version');
    const outputElementMods = document.getElementById('r-mods');
    const outputElementPlayerList = document.getElementById('r-player-list');
    // Make a GET request
    fetch(apiUrl,{herders:{'Cache-Control':'no-cache'}})
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var motd = JSON.stringify(data.motd.raw, null, 2);
        let player = [];
        motd = motd.substring(1);
        motd = motd.substring(0, motd.length - 1);
        outputElementName.innerHTML= motdtocolor(motd,outputElementName);
        outputElementPlayer.textContent = JSON.stringify(data.players.online, null, 2);
        var online = JSON.stringify(data.online, null, 2);
        if(online == 'true'){outputElementOnline.textContent ='✔Active'}
        else{outputElementOnline.textContent ='✖Inactive'}
        outputElementVersion.textContent = JSON.stringify(data.version, null, 2);
        var mod = JSON.stringify(data.mods, null, 2);
        if(!mod){outputElementMods.textContent='Not found'}
        else{outputElementMods.textContent=JSON.stringify(data.mods, null, 2)}
        if(!!data.players.list){
            for (var i=0;i<data.players.list.length;i++)
            { 
                player[i]=JSON.stringify(data.players.list[i].name, null, 2)
            }
            outputElementPlayerList.textContent = player;
        }
        else{outputElementPlayerList.textContent ='No Player Online'}
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function refresh(){
    $("#button-text").hide().delay(2000).show(0);
    $("#button-icon").show().delay(2000).hide(0);
}