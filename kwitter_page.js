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

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
document.getElementById("room_name").innerHTML="Room Name: " + room_name;

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
username=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4> " + username + "<img class='user_tick' src='tick.png'> </h4>";
message_with_tag="<h4 class='message_h4'> " + message + "</h4>";
button_with_tag1="<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='update_like(this.id)'>";
button_with_tag2="<span class='glyphicon glyphicon-thumbs-up'>like: " + like + "</span></button><hr>";
row=name_with_tag + message_with_tag + button_with_tag1 + button_with_tag2;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function update_like(message_id){
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      updated_likes=Number(likes)+1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}

function send() {
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      })
      document.getElementById("msg").value="";
}

function logout() { 
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
          window.location = "index.html";
}