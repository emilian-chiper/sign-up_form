import { fetchCountryData } from './phoneData.js';

window.addEventListener('DOMContentLoaded', function () {
  const main = async function () {
    // Access DOM elements
    const [firstName, lastName, email, phone, password, confirmPassword] =
      document.getElementsByTagName('input');
    const [
      errorFirstName,
      errorLastName,
      errorEmail,
      errorPhone,
      errorPassword,
      errorConfirmPassword,
    ] = document.getElementsByTagName('small');
    const countrySelectElement = document.querySelector('#country-code');

    ///////////////////////////
    // DISPLAY MANIPULATION
    ///////////////////////////
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

    //////////////////////////////////////////////////
    // NAME VALIDATION
    //////////////////////////////////////////////////
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

    /////////////////////////////////////////////////
    // EMAIL VALIDATION
    /////////////////////////////////////////////////
    const validateEmail = function (input, handler) {
      const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/;
      showFeedback(
        input,
        handler,
        emailRegex.test(input.value),
        'Valid email address',
        'Invalid email address'
      );
    };

    ////////////////////////////////////////////
    // PHONE NUMBER VALIDATION
    ////////////////////////////////////////////

    // Fetch country data
    const countryData = await fetchCountryData();

    // Populate dropdown
    const populateCountryOptions = function (countries) {
      countrySelectElement.innerHTML = '';
      countries.forEach(({ name, code, flag }) => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${flag} ${name} (${code})`;
        countrySelectElement.appendChild(option);
      });
    };

    populateCountryOptions(countryData);

    // Validate phone number
    const validatePhoneNumber = function () {
      const selectedCountryCode = countrySelectElement.value;
      const country = countryData.find(
        country => country.code === selectedCountryCode
      );
      const isValid =
        phone.value.length <= (country ? country.maxLength : Infinity);
      showFeedback(
        phone,
        errorPhone,
        isValid,
        'Valid phone number',
        `Phone number must be up to ${
          country ? country.maxLength : 'N/A'
        } digits`
      );
    };

    ///////////////////////////////////////////
    // PASSWORD VALIDATION
    ///////////////////////////////////////////
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

      // Display the feedback
      errorPassword.style.opacity = '1';
      errorPassword.innerText = feedback.text;

      // Reset all classes and apply the new one
      errorPassword.className = '';
      errorPassword.classList.add(feedback.className);
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

    ///////////////////////
    // FUNCTION CALLS
    ///////////////////////
    // Invoke functions
    state();

    // Assign callbacks to event listeners
    const validationMap = [
      {
        input: firstName,
        handler: errorFirstName,
        validation: e => checkMaxLength(e.target, errorFirstName),
      },
      {
        input: lastName,
        handler: errorLastName,
        validation: e => checkMaxLength(e.target, errorLastName),
      },
      {
        input: email,
        handler: errorEmail,
        validation: e => validateEmail(e.target, errorEmail),
      },
      {
        input: phone,
        handler: errorPhone,
        validation: e => validatePhoneNumber(),
      },
      {
        input: password,
        handler: errorPassword,
        validation: e => checkPasswordStrength(),
      },
      {
        input: confirmPassword,
        handler: errorConfirmPassword,
        validation: e => checkPasswordMatch(),
      },
    ];

    validationMap.forEach(({ input, validation }) => {
      input.addEventListener('input', validation);
    });
  };

  main();
});
