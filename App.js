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
let error = document.getElementById("error")

let usernameInput = document.getElementById("username");





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
    usernameInput.value = "";
  }
});
onValue(noteInsert, function(snapshot) {
  if (snapshot.exists()) {
    let notes = Object.values(snapshot.val());
    list.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {
      const { note, date, username } = notes[i];
        list.innerHTML += `<div class="note"><b>${username}</b><li>${note}</li><p>${date}</p></div>`;
    } 

  } else {
    list.innerHTML = "No notes yet";
  }
});

