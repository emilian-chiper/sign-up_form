import { fetchCountryData } from './phoneData.js';

window.addEventListener('DOMContentLoaded', function () {
  /**
   * Main function to handle form validation and data population.
   * @async
   * @function main
   */
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

    /**
     * Sets the initial state of error elements in the form.
     * @function state
     */
    const state = function () {
      [...document.getElementsByTagName('small')].forEach(small => {
        small.style.opacity = '0';
        small.innerText = '_';
        small.classList.remove('valid', 'invalid');
      });
    };

    /**
     * Displays validation feedback based on the input value and validation result.
     * @function showFeedback
     * @param {HTMLElement} input - The input element being validated.
     * @param {HTMLElement} handler - The corresponding small element for displaying feedback.
     * @param {boolean} isValid - The result of the validation (true if valid, false otherwise).
     * @param {string} validMessage - The message to display if the input is valid.
     * @param {string} invalidMessage - The message to display if the input is invalid.
     */
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

    //////////////////////
    // NAME VALIDATION
    //////////////////////

    /**
     * Validates the maximum length of a name input (first or last name).
     * @function checkMaxLength
     * @param {HTMLElement} input - The input element being validated.
     * @param {HTMLElement} handler - The corresponding small element for displaying feedback.
     */
    const checkMaxLength = function (input, handler) {
      showFeedback(
        input,
        handler,
        input.value.length <= 35,
        'Valid name',
        'Maximum number of characters: 35'
      );
    };

    ///////////////////////
    // EMAIL VALIDATION
    ///////////////////////

    /**
     * Validates an email address using a regular expression.
     * @function validateEmail
     * @param {HTMLElement} input - The email input element.
     * @param {HTMLElement} handler - The corresponding small element for displaying feedback.
     */
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

    //////////////////////////////
    // PHONE NUMBER VALIDATION
    //////////////////////////////

    // Fetch country data
    const countryData = await fetchCountryData();

    /**
     * Populates the country dropdown with options from fetched country data.
     * @function populateCountryOptions
     * @param {Array<Object>} countries - The array of country objects containing name, code, and flag.
     */
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

    /**
     * Validates the phone number based on the selected country and its max length.
     * @function validatePhoneNumber
     */
    const validatePhoneNumber = function () {
      const selectedCountryCode = countrySelectElement.value;
      const country = countryData.find(
        country => country.code === selectedCountryCode
      );
      phone.value = phone.value.replace(/\D/g, '');
      const isValid =
        phone.value.length === (country ? country.maxLength : Infinity);
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

    //////////////////////////
    // PASSWORD VALIDATION
    //////////////////////////

    /**
     * Checks the strength of the password based on predefined strength tiers.
     * @function checkPasswordStrength
     */
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

    /**
     * Checks if the password and confirm password inputs match.
     * @function checkPasswordMatch
     */
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

    ///////////////////////////////////////
    // EVENT LISTENERS & FUNCTION CALLS
    ///////////////////////////////////////

    /**
     * Maps inputs to their validation functions and assigns event listeners.
     * @type {Array<Object>}
     */
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

    /**
     * Attaches event listeners to input elements for validation.
     *
     * Iterates over the `validationMap` array and adds an `input` event listener
     * to each input element. The event listener triggers the corresponding validation function.
     *
     * @function attachEventListeners
     */
    const attachEventListeners = function () {
      validationMap.forEach(({ input, validation }) => {
        input.addEventListener('input', validation);
      });
    };

    // Invoke functions
    state();
    attachEventListeners();
  };

  main();
});
