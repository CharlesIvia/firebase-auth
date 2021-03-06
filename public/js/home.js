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
const getCodeButton = document.getElementById("getCode");
const signInWithPhoneButton = document.getElementById("signInWithPhone");
const labels = document.getElementsByTagName("label");
const signInWithMail = document.getElementById("signInWithMail");
const signInWithPhone = document.getElementById("signInWithPhone");
const signUp = document.getElementById("signUp");
const failureModal = document.querySelector(".failure");
const signInWithGoogleBtn = document.getElementById("signInWithGoogle");
const signInWithFacebookBtn = document.getElementById("signInWithFacebook");
const signInWithTwitterBtn = document.getElementById("signInWithTwitter");

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

//SIGN IN WITH GOOGLE

const signInWithGoogleFn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth
    .signInWithPopup(googleProvider)
    .then(() => {
      alert("You are signed in with Google.");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error(error);
    });
};

signInWithGoogleBtn.addEventListener("click", signInWithGoogleFn);

//auth.signInWithRedirect(googleProvider) - redirects to initial page after confirmation

//FACEBOOK SIGNIN- create facebook app first

const signInWithFacebookFn = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  //or auth.signInWithRedirect(facebookProvider)
  auth
    .signInWithPopup(facebookProvider)
    .then(() => {
      alert("Facebook sign in successfull");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error(error);
    });
};

signInWithFacebookBtn.addEventListener("click", signInWithFacebookFn);

//FIREBASE AUTHENTICATION WITH TWITTER

const signInWithTwitterFn = () => {
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  //auth.signInWithRedirect(twitterProvider)

  auth
    .signInWithPopup(twitterProvider)
    .then(() => {
      alert("Twitter sign in successfull.");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error(error);
    });
};

signInWithTwitterBtn.addEventListener("click", signInWithTwitterFn);

//Firebase Authentication with phone provider

//Create and render the captcha
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  "recaptcha-container"
);

recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

//verification code

const sendVerificationCode = () => {
  const phoneNumber = phoneNumberField.value;
  const appVerifier = window.recaptchaVerifier;

  //Send 6 digit code to user's phone

  auth
    .signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      const sentCodeId = confirmationResult.verificationId;

      //Sign in if verification code is set correctly

      signInWithPhoneButton.addEventListener("click", () => {
        signInWithPhoneFn(sentCodeId);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const signInWithPhoneFn = (sentCodeId) => {
  const code = codeField.value;
  // A credential object (contains user's data) is created after a
  //comparison between the 6 digit code sent to the user's phone
  // and the code typed by the user in the code field on the html form.

  const credential = firebase.auth.PhoneAuthProvider.credential(
    sentCodeId,
    code
  );

  auth
    .signInWithCredential(credential)
    .then(() => {
      alert("Signed in successfully");
      window.location.href = "profile.html";
    })
    .catch((error) => {
      console.error(error);
    });
};

getCodeButton.addEventListener("click", sendVerificationCode);

//Preserving User's data

auth.onAuthStateChanged((user) => {
  console.log(user);

  if (user.displayName) {
    console.log(user.displayName);
  }
});
//Animations
const initializeInputAnimationState = (fieldName, labelNumber) => {
  if (fieldName.value)
    labels.item(labelNumber).className = "initial-focused-field";
  else labels.item(labelNumber).className = "initial-unfocused-field";
};

authenticationMethod1.addEventListener("change", () => {
  mailContainer.className = shownMailContainer;
  socialMediaContainer.className = hiddenPhoneContainer;
  phoneContainer.className = hiddenSocialMediaContainer;
  initializeInputAnimationState(mailField, 0);
  initializeInputAnimationState(passwordField, 1);
});

authenticationMethod2.addEventListener("change", () => {
  mailContainer.className = hiddenMailContainer;
  socialMediaContainer.className = shownSocialMediaContainer;
  phoneContainer.className = hiddenSocialMediaContainer;
});

authenticationMethod3.addEventListener("change", () => {
  mailContainer.className = hiddenMailContainer;
  socialMediaContainer.className = hiddenPhoneContainer;
  phoneContainer.className = shownPhoneContainer;
  initializeInputAnimationState(phoneNumberField, 2);
  initializeInputAnimationState(codeField, 3);
});

mailField.addEventListener("focus", () => {
  if (!mailField.value) labels.item(0).className = "focused-field";
});

passwordField.addEventListener("focus", () => {
  if (!passwordField.value) labels.item(1).className = "focused-field";
});

mailField.addEventListener("blur", () => {
  if (!mailField.value) labels.item(0).className = "unfocused-field";
});

passwordField.addEventListener("blur", () => {
  if (!passwordField.value) labels.item(1).className = "unfocused-field";
});

phoneNumberField.addEventListener("focus", () => {
  if (!phoneNumberField.value) labels.item(2).className = "focused-field";
});

codeField.addEventListener("focus", () => {
  if (!codeField.value) labels.item(3).className = "focused-field";
});

phoneNumberField.addEventListener("blur", () => {
  if (!phoneNumberField.value) labels.item(2).className = "unfocused-field";
});

codeField.addEventListener("blur", () => {
  if (!codeField.value) labels.item(3).className = "unfocused-field";
});
