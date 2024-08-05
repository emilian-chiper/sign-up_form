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
      errorConfirmPassword,
    ] = document.getElementsByTagName('small');

    // Set initial state of the error elements
    const state = function () {
      [...document.getElementsByTagName('small')].forEach(small => {
        small.style.opacity = '0';
        small.innerText = '_';
        small.classList.remove('valid', 'invalid');
      });
    };

    // Check max length of first and last name
    const checkMaxLength = function (input, handler) {
      if (input.value.length === 0) {
        // Clear the error message if the input is empty
        handler.style.opacity = '0';
        handler.innerText = '-';
        handler.classList.remove('valid', 'invalid');
      } else if (input.value.length <= 35) {
        // Valid input
        handler.style.opacity = '1';
        handler.innerText = 'Valid name';
        handler.classList.add('valid');
        handler.classList.remove('invalid');
      } else {
        // Invalid input
        handler.style.opacity = '1';
        handler.innerText = 'Maximum number of characters: 35';
        handler.classList.add('invalid');
        handler.classList.remove('valid');
      }
    };

    // Invoke functions
    state();

    // Assign callbacks to event listeners
    firstName.addEventListener('input', () =>
      checkMaxLength(firstName, errorFirstName)
    );
    lastName.addEventListener('input', () =>
      checkMaxLength(lastName, errorLastName)
    );
  };

  main();
});
