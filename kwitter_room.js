var firebaseConfig = {
      apiKey: "AIzaSyBYwah6ozD-pkTU0nHtSgeV0WU5BxhFk_s",
      authDomain: "kwitter-82019.firebaseapp.com",
      databaseURL: "https://kwitter-82019-default-rtdb.firebaseio.com",
      projectId: "kwitter-82019",
      storageBucket: "kwitter-82019.appspot.com",
      messagingSenderId: "844596089625",
      appId: "1:844596089625:web:f4e825902f3b2447072b88"
    };
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addRoom()
{
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
  });

    localStorage.setItem("room_name", room_name);
    
    window.location = "kwitter_page.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name - " + Room_names);
      row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}

function logout() { 
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
    window.location = "index.html";
}


