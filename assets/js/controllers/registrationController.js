registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const {
    email: { value: email },
    username: { value: username },
    password: { value: password },
  } = this.elements;

  if (userManager.checkUsername(username)) {
    usernameError.style.display = "block";
  }

  if (userManager.checkEmail(email)) {
    emailError.style.display = "block";
  }

  if (!userManager.checkUsername(username) && !userManager.checkEmail(email)) {
    userManager.createUser(email, username, password);
    let regSuccess = document.getElementById("regSuccess");
    regSuccess.style.display = "block";
    regSuccess.innerHTML =
      "РЕГИСТРАЦИЯТА Е УСПЕШНА! ЩЕ БЪДЕТЕ ПРЕХВЪРЛЕНИ КЪМ ЛОГИН СТРАНИЦАТА!";
    setTimeout(() => {
      regSuccess.style.display = "none";
      regSuccess.innerHTML = "";
      location.hash = "loginPage";
    }, 2000);
  }

  registrationForm.reset();
});

registrationForm.addEventListener("input", function () {
  const registerUserEmailValue = registerUserEmail.value.trim();
  const registerUserNameValue = registerUserName.value.trim();
  const registerUserPassValue = registerUserPass.value.trim();
  const registerUserPassConfirmValue = registerUserPassConfirm.value.trim();
  const userNameRequiredLength = 6;
  const passwordReqLength = 6;
  let emailFlag;
  let userNameFlag;
  let passwordFlag;
  emailError.style.display = "none";
  usernameError.style.display = "none";

  let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (registerUserEmailValue.match(emailFormat)) {
    invalidMail.style.display = "none";
    emailFlag = true;
  } else if (registerUserEmailValue.length > 0) {
    invalidMail.style.display = "block";
    invalidMail.innerHTML = "Невалиден формат за email!";
    emailFlag = false;
  } else {
    invalidMail.style.display = "none";
  }

  let symbols = "~`!@#$%^&*()_+{}|:';/.>?<,1234567890№€§ ";
  let forbiddenSym = symbols.split("");

  let typeErrFlag = forbiddenSym.some((e) => registerUserNameValue.includes(e));

  if (typeErrFlag) {
    usernameLength.style.display = "block";
    usernameLength.innerHTML =
      "Потребителското име съдържа забранен символ, използвайте само букви!";
    userNameFlag = false;
  } else if (
    registerUserNameValue.length > 0 &&
    registerUserNameValue.length < userNameRequiredLength
  ) {
    usernameLength.style.display = "block";
    usernameLength.innerHTML = `Въведи още поне ${
      userNameRequiredLength - registerUserNameValue.length
    } символа!`;
    userNameFlag = false;
  } else {
    usernameLength.style.display = "none";
    userNameFlag = true;
  }

  let check = registerUserPassValue.split("").reduce((acc, e) => {
    if (e.includes(e.toUpperCase()) && !symbols.includes(e)) {
      acc.toUpper = true;
    }
    if (e.includes(e.toLowerCase()) && !symbols.includes(e)) {
      acc.toLower = true;
    }
    if (symbols.includes(e)) {
      acc.number = true;
    }

    return acc;
  }, (acc = { toUpper: false, toLower: false, number: false }));

  if (
    !(check.toUpper && check.toLower && check.number) &&
    registerUserPassValue.length > 0
  ) {
    passLength.style.display = "block";
    passLength.innerHTML =
      "Паролата трябва да съдържа главна буква, малка буква и символ/цифра!";
    passwordFlag = false;
  } else if (
    registerUserPassValue.length > 0 &&
    registerUserPassValue.length < passwordReqLength
  ) {
    passLength.style.display = "block";
    passLength.innerHTML = `Въведи още поне ${
      passwordReqLength - registerUserPassValue.length
    } символа!`;
    passwordFlag = false;
  } else {
    passLength.style.display = "none";
    passwordFlag = true;
  }

  if (emailFlag && userNameFlag && passwordFlag) {
    if (registerUserPass.value !== registerUserPassConfirm.value) {
      passError.style.display = "block";
      createAccBtn.disabled = true;
    } else {
      passError.style.display = "none";
      createAccBtn.disabled = false;
    }
  } else {
    createAccBtn.disabled = true;
  }
});
