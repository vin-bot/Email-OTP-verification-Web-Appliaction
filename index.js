(function() {
  emailjs.init("h4wXAc9gWRfMAqZrr"); // Replace with your user ID
})();
const firebaseConfig = {
  apiKey: "AIzaSyDOs3Bo5KiBbx4lKaKWPcfhzJ7zju3bj6Y",
  authDomain: "done-fbbab.firebaseapp.com",
  databaseURL: "https://done-fbbab-default-rtdb.firebaseio.com",
  projectId: "done-fbbab",
  storageBucket: "done-fbbab.appspot.com",
  messagingSenderId: "35488698339",
  appId: "1:35488698339:web:d9b7b05dfed52c2cf19ad6",
  measurementId: "G-M8Q9CH451K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var data = firebase.database();
// Generate the OTP
const otp = Math.floor(Math.random()*10000);
function sendotp(){
  document.getElementById("already").style.display="none";
// Prepare the email parameters
var templateParams = {
  to_name: document.getElementById("email").value,
  from_name: 'Ramireddy Manikantareddy',
  message: `Your OTP is: ${otp}`
};
var eID = "service_cnbymrb";
var tID = "template_da5n8oq";
// Send the email
emailjs.send(eID,tID , templateParams)
  .then( res => {
    Swal.fire({
      title: "OTP Sent to "+document.getElementById("email").value,
      text: "............",
      icon: "success"
    });
    document.getElementById("verify").style.display = "block";
  })
  .catch();
}
function otp_verification(){
    const input_otp = document.getElementById("otp").value;
    if(otp==input_otp){
      Swal.fire({
        title: "OTP verified Successfully",
        text: "............",
        icon: "success"
      });
        document.getElementById("pass").style.display="block";
        document.getElementById("name_email").style.display="none";
        document.getElementById("verify").style.display="none";
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "OTP isn't matched....",
      });
    }
}
function password_confirmation(){
    const password = document.getElementById("pwd").value;
    const cpassword = document.getElementById("cpwd").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    let match_pass = password===cpassword;
    let pass_length = password.length>=8;
    let valid_pass = match_pass && pass_length;
    if(valid_pass){
      data.ref("Login_Details"+"/"+name).set({
        Name : name,
        Email : email,
        Password : password,
        OTP : otp
      })
      Swal.fire({
        title: "Submitted Successfully....",
        text: "Move to Log in page",
        icon: "success"
      }).then(function(){
        window.location.href="login.html";
      });
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password isn't matched",
      });
    }
}
function already_account(){
  window.location.href="login.html";
}
