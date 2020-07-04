const logOut = document.getElementById("logOut");
const mergeAccounts = document.getElementById("mergeAccounts");
const modifyAccount = document.getElementById("modifyAccount");
const displayNameHolder = document.getElementById("displayNameHolder");
const photoHolder = document.getElementById("photoHolder");

const auth = firebase.auth();

//Preserving User's data

auth.onAuthStateChanged((user) => {
  console.log(user);

  if (user.displayName) {
    console.log(user.displayName);
  }
});

logOut.addEventListener("click", () => {
  //signOut() is a built in firebase function responsible for signing a user out
  auth
    .signOut()
    .then(() => {
      window.location.href = "index.html";
      //   window.location.assign("../");
    })
    .catch((error) => {
      console.error(error);
    });
});

//Go to modification page
modifyAccount.addEventListener("click", () => {
  location.href = "edit.html";
  //   window.location.assign("../edit");
});

//Go to merge accounts page
mergeAccounts.addEventListener("click", () => {
  location.href = "merge.html";
  //   window.location.assign("../merge");
});
