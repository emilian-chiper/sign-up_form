window.addEventListener('DOMContentLoaded', function () {
  const main = function () {
    // Access form input elements
    const [firstName, lastName, email, phoneNumber, password, confirmPassword] =
      document.getElementsByTagName('input');
    const [
      errorFirstName,
      errorLastName,
      errorEmail,
      errorPassword,
      errrorConfirmPassword,
    ] = document.getElementsByTagName('small');

    console.log(
      errorFirstName,
      errorLastName,
      errorEmail,
      errorPassword,
      errrorConfirmPassword
    );

    // Check max length of first and last name
  };

  main();
});
