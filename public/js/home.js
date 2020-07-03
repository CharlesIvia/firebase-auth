//Fetch dom elements and set variables

const mailContainer = document.querySelector(".mail-container");
const shownMailContainer = "container mail-container shown-container";
const hiddenMailContainer = "container mail-container hidden-container";
const socialMediaContainer = document.querySelector(".socialMedia-container");
const shownSocialMediaContainer =
  "container socialMedia-container shown-container";
const hiddenSocialMediaContainer =
  "container socialMedia-container hidden-container";
const phoneContainer = document.querySelector(".phone-container");
const shownPhoneContainer = "container phone-container shown-container";
const hiddenPhoneContainer = "container phone-container hidden-container";
const authenticationMethod1 = document.getElementById("method1");
const authenticationMethod2 = document.getElementById("method2");
const authenticationMethod3 = document.getElementById("method3");
const mailField = document.getElementById("mail");
const passwordField = document.getElementById("password");
const phoneNumberField = document.getElementById("phoneNumber");
const codeField = document.getElementById("code");
const labels = document.getElementsByTagName("label");
const signInWithMail = document.getElementById("signInWithMail");
const signInWithPhone = document.getElementById("signInWithPhone");
const signUp = document.getElementById("signUp");
const failureModal = document.querySelector(".failure");

const auth = firebase.auth();

//Sign in function - similar to the one on signup.js

const signInWithEmailFunction = () => {
  const email = mailField.value;
  const password = passwordField.value;

  //Built in firebase function responsible for authentication
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      //Signed in successfully
      alert("Signed in");
      location.href = "profile.html";
    })
    .catch((error) => {
      //Something went wrong
      console.error(error);
    });
};

//Adds the click event to the signInWithMail button

signInWithMail.addEventListener("click", signInWithEmailFunction);

//Go to signup page

signUp.addEventListener("click", () => {
  location.href = "signup.html";
});
