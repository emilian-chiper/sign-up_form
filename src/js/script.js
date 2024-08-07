window.addEventListener('DOMContentLoaded', function () {
  const main = function () {
    // Access form input elements
    const [firstName, lastName, email, phone, password, confirmPassword] =
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

    // Show validation feedback
    const showFeedback = function (
      input,
      handler,
      isValid,
      validMessage,
      invalidMessage
    ) {
      if (input.value.length === 0) {
        handler.style.opacity = '0';
        handler.innerText = '_';
        handler.className = '';
      } else {
        handler.style.opacity = '1';
        handler.innerText = isValid ? validMessage : invalidMessage;
        handler.classList.toggle('valid', isValid);
        handler.classList.toggle('invalid', !isValid);
      }
    };

    // Check max length of first and last name
    const checkMaxLength = function (input, handler) {
      showFeedback(
        input,
        handler,
        input.value.length <= 35,
        'Valid name',
        'Maximum number of characters: 35'
      );
    };

    // Email validation
    const validateEmail = function (input, handler) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      showFeedback(
        input,
        handler,
        emailRegex.test(input.value),
        'Valid email address',
        'Invalid email address'
      );
    };

    // Check password strength
    const checkPasswordStrength = function () {
      const strengthTiers = {
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
        Object.values(strengthTiers).find(tier =>
          tier.gauge.test(password.value)
        ) || strengthTiers.weak;

      console.log(`Password strength feedback: ${feedback.text}`);
      console.log(`Classes before: ${errorPassword.className}`);

      // Display the feedback
      errorPassword.style.opacity = '1';
      errorPassword.innerText = feedback.text;

      // Reset all classes and apply the new one
      errorPassword.className = '';
      errorPassword.classList.add(feedback.className);

      console.log(`Classes after: ${errorPassword.className}`);
    };

    // Check if password and confirm password match
    const checkPasswordMatch = function () {
      const isValid = password.value === confirmPassword.value;
      showFeedback(
        confirmPassword,
        errorConfirmPassword,
        isValid,
        'Passwords match',
        'Passwords do not match'
      );
    };

    // Invoke functions
    state();

    // Assign callbacks to event listeners
    const validationMap = [
      { input: firstName, handler: errorFirstName, validation: checkMaxLength },
      { input: lastName, handler: errorLastName, validation: checkMaxLength },
      { input: email, handler: email, validation: validateEmail },
      {
        input: password,
        handler: errorPassword,
        validation: checkPasswordStrength,
      },
      {
        input: confirmPassword,
        handler: errorConfirmPassword,
        validation: checkPasswordMatch,
      },
    ];

    validationMap.forEach(({ input, validation }) => {
      input.addEventListener('input', validation);
    });
  };

  main();
});
