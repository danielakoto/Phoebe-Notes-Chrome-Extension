const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');
const clear = document.getElementById('clear');
const thenote = document.getElementById('thenote');
let notes = [];
        
clear.onclick = () => {
    notes = [];
    console.log('clicked clear');
    localStorage.clear("NotesList");
    thingsList.innerHTML = "";
    console.log(thingsList.innerHTML.length);
    if(thingsList.innerHTML.length > 0) {
        clear.style.display = 'inline-block';
    } else {
        clear.style.display = 'none';
    }
}

createThing.onclick = () => {
    let thetitle = document.getElementById('thetitle');
    let thenote = document.getElementById('thenote');
    if(thetitle.value.length == 0 && thenote.value.length == 0) {
        alert("Empty note.");
        return;
    }
    let tm = Date.now();
    let note = {
        time: tm,
        title: document.getElementById('thetitle').value,
        note: document.getElementById('thenote').value
    }
            
    notes.push(note);
    let t = document.getElementById('thetitle').value;
    let n = document.getElementById('thenote').value;
    thingsList.innerHTML += `<li style="padding:10px; border-radius:5px;">
                                <p id="vtitle">${t}</p>
                                <p id="vvalue" style="text-align:left; resize:none;">${n}</p>
                            </li>`
            
    localStorage.setItem('NotesList', JSON.stringify(notes));
    thetitle.value = "";
    thenote.value = "";
    if(thingsList.innerHTML.length > 0) {
        clear.style.display = 'inline-block';
    } else {
        clear.style.display = 'none';
    }
}

function allStorage() {
    let length = JSON.parse(localStorage.getItem('NotesList'));
    console.log(length.length);
    if(length.length != 0){
        for(let i = 0; i < length.length; i++) {
            let t = JSON.parse(localStorage.getItem('NotesList'))[i].title;
            let n = JSON.parse(localStorage.getItem('NotesList'))[i].note;
            let tm = JSON.parse(localStorage.getItem('NotesList'))[i].time;
            let note = {
                time: tm,
                title: t,
                note: n
            }
            notes.push(note);
            thingsList.innerHTML += `<li style="padding:10px; border-radius:5px; align-text:left;">
                                        <p id="vtitle">${t}</p>
                                        <p id="vvalue" style="text-align:left; resize:none;">${n}</p>
                                    </li>`
        }
    }
    if(thingsList.innerHTML.length > 0) {
        clear.style.display = 'inline-block';
    } else {
        clear.style.display = 'none';
    }
}

allStorage()
