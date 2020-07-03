//Fetch dom elements and set variables
const emailField = document.getElementById("mail");
const passWordField = document.getElementById("password");
const signUp = document.getElementById("signUp");

const auth = firebase.auth();

//Signup logic

const signUpFunction = () => {
  const email = emailField.value;
  const password = passWordField.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("Signed Up Successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

signUp.addEventListener("click", signUpFunction);
