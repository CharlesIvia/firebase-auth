const mailField = document.getElementById("mail");
const passwordField = document.getElementById("password");
const displayNameField = document.getElementById("displayName");
const photoField = document.getElementById("photo");
const labels = document.getElementsByTagName("label");
const editButton = document.getElementById("edit");
const deleteButton = document.getElementById("delete");

const auth = firebase.auth();

// To print your current user information so you can the changes once done

auth.onAuthStateChanged((user) => {
  console.log(user);
});

//Edit function

const editInformation = () => {
  const newNameAndPhoto = {
    newDisplayName: displayNameField.value,
    newPhotoURL: photoField.value,
  };

  const newEmail = mailField.value;
  const newPassword = passwordField.value;

  //Holds all information abt ccurrent signed in user

  const user = auth.currentUser;
  changeNameAndPhoto(user, newNameAndPhoto);

  //Change email and password

  if (newPassword && newEmail) {
    const credential = createCredential(user);
    changePassowrd(user, credential, newPassword);
    changeEmail(user, credential, newEmail);
  }

  //Change only the email
  else if (newPassword) {
    const credential = createCredential(user);
    changePassowrd(user, credential, newPassword);
  }

  //change email only
  else if (newEmail) {
    const credential = createCredential(user);
    changeEmail(user, credential, newEmail);
  }
};

//Change name and photo fn

const changeNameAndPhoto = (user, newNameAndPhoto) => {
  const { newDisplayName, newPhotoURL } = newNameAndPhoto;
  //Changes displayName and photoUrl properties

  if (newDisplayName && newPhotoURL) {
    user
      .updateProfile({
        displayName: newDisplayName,
        photoUrl: newPhotoURL,
      })
      .then(() => {
        alert("Profile updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Cnages the displayName only
  else if (newDisplayName) {
    user
      .updateProfile({
        displayName: newDisplayName,
      })
      .then(() => {
        alert("Display name changed successfully.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //Changes photoUrl only
  else if (newPhotoURL) {
    user
      .updateProfile({
        photoUrl: newPhotoURL,
      })
      .then(() => {
        alert("Photo changed successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

//Event listener

editButton.addEventListener("click", editInformation);
//Animations

mailField.addEventListener("focus", () => {
  labels.item(0).className = "focused-field";
});

passwordField.addEventListener("focus", () => {
  labels.item(1).className = "focused-field";
});

mailField.addEventListener("blur", () => {
  if (!mailField.value) labels.item(0).className = "unfocused-field";
});

passwordField.addEventListener("blur", () => {
  if (!passwordField.value) labels.item(1).className = "unfocused-field";
});

displayNameField.addEventListener("focus", () => {
  labels.item(2).className = "focused-field";
});

photoField.addEventListener("focus", () => {
  labels.item(3).className = "focused-field";
});

displayNameField.addEventListener("blur", () => {
  if (!displayNameField.value) labels.item(2).className = "unfocused-field";
});

photoField.addEventListener("blur", () => {
  if (!photoField.value) labels.item(3).className = "unfocused-field";
});
