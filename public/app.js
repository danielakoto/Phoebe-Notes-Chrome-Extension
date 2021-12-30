//START
const createThing = document.getElementById('createThing');
const notesList = document.getElementById('notesList');
const clear = document.getElementById('clear');
const thetitle = document.getElementById('thetitle');
const thenote = document.getElementById('thenote');
const section = document.getElementById('section');
const cbtn = document.getElementById('cbtn');
let circle = document.getElementById("circle");

let t = document.getElementById('thetitle').value;
let n = document.getElementById('thenote').value;

let loadCounter = 0;
let notes = [];
let ind = 0;
//set colors
let bgcolor = "#ffbb8a";
let btncolor = "#ff8f40";

//hide or show clear btn
checkbtn();

//Background Color on Local Storage
if(localStorage.getItem("bgcolor") == null)
    localStorage.setItem("bgcolor", bgcolor);
if(localStorage.getItem("btncolor") == null)
    localStorage.setItem("btncolor", btncolor);

circle.style.backgroundColor = localStorage.getItem("bgcolor");
createThing.style.backgroundColor = localStorage.getItem("btncolor");

//check local storage for recent title and note
if(localStorage.getItem("title") == "") {
    localStorage.setItem("title", null);
}
if(localStorage.getItem("note") == "") {
    localStorage.setItem("note", null);
}


//clear notes array, local storage, list on page, and remove clear button temporarily
clear.onclick = () => {
    if(confirm("Clear all notes?") == false)
        return;
    else {
        notes = []; 
        localStorage.removeItem("NotesList");
        notesList.innerHTML = "";
        clear.style.display = 'none';
    }
}

//input clear button
cbtn.onclick = () => {
    if(confirm("Clear notepad?") == false)
        return;
    else {
        thetitle.value = "";
        thenote.value = "";
        localStorage.setItem("title", null);
        localStorage.setItem("note", null);
        cbtn.style.display = 'none';
    }
}

//When create button is clicked
createThing.onclick = () => {
    let thetitle = document.getElementById('thetitle');
    let thenote = document.getElementById('thenote');

    if(thetitle.value.length == 0 && thenote.value.length == 0) {
        alert("Empty note!");
        return;
    }
    if(parseInt(createThing.innerHTML.length) == 4)
        createThing.innerHTML = "+";
    let note = { //initialize new note
        time: Date.now(),
        title: document.getElementById('thetitle').value,
        note: document.getElementById('thenote').value
    }
    notes = JSON.parse(localStorage.getItem("NotesList")); // recover original list
    if(notes == null) // check if the list is null
        notes = [];

    notes.push(note); //Add note to array
    localStorage.setItem("NotesList", JSON.stringify(notes)); // Save notes back to local storage
    
    // Clear title, note, and notes list
    thetitle.value = "";
    thenote.value = "";
    notesList.innerHTML = "";
    // Then bring new version of notes
    allStorage();
    clear.style.display = 'inline-block'; // bring clear button back
}

section.addEventListener("mousemove", async function() {
    // keeps track of title and note for extension exit
    for(let i = notes.length - 1; i >= 0; i--) {
        let e = [];
        let d = [];
        e[i] = (document.getElementById(i));
            e[i].onclick = () => {
                let thetitle = document.getElementById('thetitle');
                let thenote = document.getElementById('thenote');
                if(thetitle.value.length > 0 || thenote.value.length > 0) {
                    createThing.click();
                    thetitle.value = JSON.parse(localStorage.getItem('NotesList'))[i].title;
                    thenote.value = JSON.parse(localStorage.getItem('NotesList'))[i].note;
                    window.scrollTo(0, 0);
                    del(i);
                    return;
                } else {
                    thetitle.value = JSON.parse(localStorage.getItem('NotesList'))[i].title;
                    thenote.value = JSON.parse(localStorage.getItem('NotesList'))[i].note;
                    window.scrollTo(0, 0);
                    del(i);
                    return;
                }
            }
        d[i] = (document.getElementById(i+100));
            d[i].onclick = () => {
                rem(i);
                return;
            }
    }
})

addEventListener("keydown", function() {
    checkLS();
    checkbtn();
})
addEventListener("keyup", function() {
    checkLS();
    checkbtn();
})

function rem(e){
    if(confirm("Note will be permanently deleted!") == false)
        return;
    else {
        notes = JSON.parse(localStorage.getItem("NotesList"));
        notes.splice(e, 1);
        localStorage.setItem("NotesList", JSON.stringify(notes));
        notesList.innerHTML = "";
        allStorageNoClear();
        checkLS();
    }
}
function del(e){
    notes = JSON.parse(localStorage.getItem("NotesList"));
    notes.splice(e, 1);
    localStorage.setItem("NotesList", JSON.stringify(notes));
    notesList.innerHTML = "";
    allStorageNoClear();
    checkLS();
}

function allStorage() {
    if(localStorage.getItem('NotesList') == null)
        return;
    let length = JSON.parse(localStorage.getItem('NotesList'));
    if(length.length != 0){
        for(let i = length.length-1; i >= 0; i--) {
            let t = JSON.parse(localStorage.getItem('NotesList'))[i].title;
            let n = JSON.parse(localStorage.getItem('NotesList'))[i].note;
            notesList.innerHTML = notesList.innerHTML + `
                                    <li class="card" style="padding:10px; border-radius:5px; align-text:left;">
                                    <a id="${i}">    
                                        <p id="vtitle">${t}</p>
                                        <p id="vvalue" style="text-align:left; resize:none;">${n}</p>
                                        <img src="img/icons8-edit-48.png" id="${i}" class="ebtn">
                                    </a>
                                    <img src="img/icons8-close-50.png" id="${i+100}" class="xbtn">
                                    </li>
                                `
        }
        
    }

    if(localStorage.getItem('title') != null && loadCounter < 1) {
        const thetitle = document.getElementById('thetitle');
        thetitle.value = JSON.parse(localStorage.getItem('title'));
    } else {
        const thetitle = document.getElementById('thetitle');
        localStorage.removeItem("title");
        thetitle.value = "";
    }
    if(localStorage.getItem('note') != null && loadCounter < 1) {
        const thenote = document.getElementById('thenote');
        thenote.value = JSON.parse(localStorage.getItem('note'));
    } else {
        const thenote = document.getElementById('thenote');
        localStorage.removeItem("note");
        thenote.value = "";
    }

    checkbtn();
    loadCounter++;
    notes = JSON.parse(localStorage.getItem("NotesList"));
}
function allStorageNoClear() {
    let length = JSON.parse(localStorage.getItem('NotesList'));
    if(length.length != 0){
        for(let i = length.length-1; i >= 0; i--) {
            let t = JSON.parse(localStorage.getItem('NotesList'))[i].title;
            let n = JSON.parse(localStorage.getItem('NotesList'))[i].note;
            let tm = JSON.parse(localStorage.getItem('NotesList'))[i].time;
            notesList.innerHTML = notesList.innerHTML + `          
                                    <li class="card" style="padding:10px; border-radius:5px; align-text:left;">
                                    <a id="${i}">    
                                        <p id="vtitle">${t}</p>
                                        <p id="vvalue" style="text-align:left; resize:none;">${n}</p>
                                        <img src="img/icons8-edit-48.png" id="${i}" class="ebtn">
                                    </a>
                                    <img src="img/icons8-close-50.png" id="${i+100}" class="xbtn">
                                    </li>
                                `
        }
    }
    checkbtn();
    notes = JSON.parse(localStorage.getItem("NotesList"));
}
allStorage();

//----------------------------------------------------------------------------
//Start of settings.html variables
//RED
const red = document.getElementById("red");
red.onclick = () => {
    bgcolor = "#ffe8e8";
    btncolor = "#ff4747";
    changeColor();
}
//BLUE
const blue = document.getElementById("blue");
blue.onclick = () => {
    bgcolor = "#d4f3ff";
    btncolor = "#5ed4ff";
    changeColor();
}

//YELLOW
const yellow = document.getElementById("yellow");
yellow.onclick = () => {
    bgcolor = "#fffaee";
    btncolor = "#ffcc53";
    changeColor();
}

//GREEN
const green = document.getElementById("green");
green.onclick = () => {
    bgcolor = "#d4ffda";
    btncolor = "#54ff6e";
    changeColor();
}

//ORANGE
const orange = document.getElementById("orange");
orange.onclick = () => {
    bgcolor = "#ffbb8a";
    btncolor = "#ff8f40";
    changeColor();
}

//PURPLE
const purple = document.getElementById("purple");
purple.onclick = () => {
    bgcolor = "#ead4ff";
    btncolor = "#af59ff";
    changeColor();
}

//DARK
const dark = document.getElementById("dark");
dark.onclick = () => {
    bgcolor = "#404040";
    btncolor = "#000000";
    changeColor();
}

//LIGHT
const light = document.getElementById("light");
light.onclick = () => {
    bgcolor = "#f2f2f2";
    btncolor = "#454545";
    changeColor();
}

//ADVANCED COLOR
const coloraddbtn = document.getElementById("coloraddbtn");
coloraddbtn.onclick = () => {
    const thebgcolor = document.getElementById("thebgcolor");
    const thebtncolor = document.getElementById("thebtncolor");
    bgcolor = thebgcolor.value;
    btncolor = thebtncolor.value;
    changeColor();
}

function checkbtn() {
    if(thetitle.value.length != 0 || thenote.value.length != 0)
        cbtn.style.display = "inline-block";
    else
        cbtn.style.display = "none";
    if(notesList.innerHTML.length != 0)
        clear.style.display = 'inline-block';
    else
        clear.style.display = 'none';
}

function checkFields() {
    if(JSON.parse(localStorage.getItem('title')).length != null && loadCounter < 1) {
        const thetitle = document.getElementById('thetitle');
        thetitle.value = JSON.parse(localStorage.getItem('title'));
    }
    if(JSON.parse(localStorage.getItem('note')).length != null && loadCounter < 1) {
        const thenote = document.getElementById('thenote');
        thenote.value = JSON.parse(localStorage.getItem('note'));
    }
}

function checkLS() {
    let t = document.getElementById('thetitle').value;
    localStorage.setItem("title", JSON.stringify(t));
    let n = document.getElementById('thenote').value;
    localStorage.setItem("note", JSON.stringify(n));
}

function changeColor() {
    circle.style.backgroundColor = bgcolor;
    createThing.style.backgroundColor = btncolor;
    localStorage.setItem("bgcolor", bgcolor)
    localStorage.setItem("btncolor", btncolor);
}

const closeExt = document.getElementById("closeExt");

closeExt.onclick = () => {
    window.close();
}