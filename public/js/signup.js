//Fetch dom elements and set variables
const emailField = document.getElementById("mail");
const passWordField = document.getElementById("password");
const signUp = document.getElementById("signUp");
const signInWithMail = document.getElementById("signIn");
const resetPassword = document.getElementById("resetPassword");

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

//Sign in function

const signInWithEmailFunction = () => {
  const email = emailField.value;
  const password = passWordField.value;

  //Built in firebase fn for authentication
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signed in successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
};

signInWithMail.addEventListener("click", signInWithEmailFunction);

//Password reset fn

const resetPasswordFunction = () => {
  const email = emailField.value;

  //Built in firebase function that sends password reset emails

  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
};

resetPassword.addEventListener("click", resetPasswordFunction);
