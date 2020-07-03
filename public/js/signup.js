//Fetch dom elements and set variables
const emailField = document.getElementById("mail");
const passWordField = document.getElementById("password");
const signUp = document.getElementById("signUp");

const auth = firebase.auth();

//Send verification in user's device language

auth.useDeviceLanguage();

//Signup logic and verification

const signUpFunction = () => {
  const email = emailField.value;
  const password = passWordField.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signed Up Successfully");
      sendVerificationEmail();
    })
    .catch((error) => {
      console.log(error);
    });
};

//User email verification

const sendVerificationEmail = () => {
  //Use firebase built in fn
  auth.currentUser
    .sendEmailVerification()
    .then(() => {
      alert("Check your email to verify!");
    })
    .catch((error) => {
      console.log(error);
    });
};

signUp.addEventListener("click", signUpFunction);
