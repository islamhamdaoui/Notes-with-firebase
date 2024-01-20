import {initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://notes-50046-default-rtdb.europe-west1.firebasedatabase.app/"
}

let app = initializeApp(appSettings);
let database = getDatabase(app);
let noteInsert=  ref(database, "notes");

let input =document.getElementById("input")
let button = document.getElementById("btn")
let list = document.getElementById("list")

let usernameInput = document.getElementById("username");
let verified = document.getElementById("verified");





button.addEventListener("click", function() {
 
  let inputValue = input.value.trim();
  let usernameValue = usernameInput.value.trim();
  if (inputValue !== "" && usernameValue !== "") {
    const currentDate = new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
    push(noteInsert, { note: inputValue, date: currentDate, username: usernameValue });
    input.value = "";
    
    localStorage.setItem('savedUsername', usernameValue);
  }
   
});
onValue(noteInsert, function(snapshot) {
  if (snapshot.exists()) {
    let notes = Object.values(snapshot.val());
    list.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
      const { note, date, username} = notes[i];
        list.innerHTML += `<div class="note"><div class="user"><b Id="user">${username}</b><img Id="verified" class="verified" src="verified.png"></div><li>${note}</li><p>${date}</p></div>`;
        
        
        
    } 

  } else {
    list.innerHTML = "No notes yet";
  }
});


window.onload = function() {
  var savedUsername = localStorage.getItem('savedUsername');
  if (savedUsername !== null) {
      usernameInput.value = savedUsername;
  }
};