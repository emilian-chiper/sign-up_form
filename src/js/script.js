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

    // Email validation
    const validateEmail = function (input, handler) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (input.value.length === 0) {
        // Clear the error message if the input is empty
        handler.style.opacity = '0';
        handler.innerText = '_';
        handler.classList.remove('valid', 'invalid');
      } else if (emailRegex.test(input.value)) {
        // Valid email
        handler.style.opacity = '1';
        handler.innerText = 'Valid email address';
        handler.classList.add('valid');
        handler.classList.remove('invalid');
      } else {
        // Invalid email
        handler.style.opacity = '1';
        handler.innerText = 'Invalid email address';
        handler.classList.add('invalid');
        handler.classList.remove('valid');
      }
    };

    // Check password strength
    const checkPasswordStrength = function () {
      const regExTiers = {
        veryStrong: {
          gauge: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/, // At least 10 characters, including uppercase and lowercase letters, numbers, and special characters
          text: 'Very strong password',
          className: 'very-strong',
        },
        strong: {
          gauge: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, // At least 8 characters, including letters, numbers, and special characters
          text: 'Strong password',
          className: 'strong',
        },
        medium: {
          gauge: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/, // At least 6 characters, including letters and numbers
          text: 'Medium password',
          className: 'medium',
        },
        weak: {
          gauge: /^.{6,}$/, // Minimum 6 characters (any)
          text: 'Weak password',
          className: 'weak',
        },
      };

      // Find the first matching regex tier
      const feedback =
        Object.values(regExTiers).find(tier =>
          tier.gauge.test(password.value)
        ) || regExTiers.weak;

      // Display the feedback
      errorPassword.style.opacity = '1';
      errorPassword.innerText = feedback.text;

      // Reset all classes and apply the new one
      errorPassword.className = '';
      errorPassword.classList.add(feedback.className);
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
    email.addEventListener('input', () => validateEmail(email, errorEmail));
    password.addEventListener('input', () => checkPasswordStrength());
  };

  main();
});
