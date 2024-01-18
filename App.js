import {initializeApp} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://notes-50046-default-rtdb.europe-west1.firebasedatabase.app/"
}

let app = initializeApp(appSettings)
let database = getDatabase(app)
let noteInsert=  ref(database, "notes")

let input =document.getElementById("input")
let button = document.getElementById("btn")
let list = document.getElementById("list")
let error = document.getElementById("error")






button.addEventListener("click" , function(){
  let inputValue = input.value
  input.value= ""
  if (inputValue !== "") {
     push(noteInsert,inputValue)
  }

})


onValue(noteInsert, function(snapshot) {
  if (snapshot.exists()) {
  
    let things = Object.values(snapshot.val())
  
    list.innerHTML =""
  
      for (let i = 0; i < things.length; i++) {
  
        list.innerHTML += 
        `<li>${things[i]}</li>`
  
      }
  
  } else {
  
    list.innerHTML = "No things yet"
  
  }
})


input.addEventListener("input",function(){
  error.style.display = "none"
})




