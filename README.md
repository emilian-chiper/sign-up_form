# SIGN-UP FORM

This project, part of the Intermediate HTML and CSS Course of The Odin Project, is a form validation module that dynamically validates user input based on specific criteria. It uses JavaScript to provide real-time feedback to the user on various form fields such as names, email, phone number, and passwords. Additionally, it fetches country data to validate phone numbers according to the selected country.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Validation Logic](#validation-logic)
  - [Name Validation](#name-validation)
  - [Email Validation](#email-validation)
  - [Phone Number Validation](#phone-number-validation)
  - [Password Validation](#password-validation)
- [Event Listeners](#event-listeners)
- [License](#license)

## Features

- **Real-time Validation**: Validates user input in real-time as the user types in the form fields.
- **Country-Based Phone Validation**: Phone number validation that adapts based on the selected country from a dropdown.
- **Feedback Messages**: Displays immediate feedback to the user, indicating whether the input is valid or invalid.
- **Password Strength Checker**: Provides feedback on password strength and checks for matching passwords.

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com:emilian-chiper/sign-up_form.git
   ```

2. Navigate to the project directory:

   ```sh
   cd sign-up_form
   ```

3. Make sure you have the `countries.json` data file in `src/data/`.

4. Serve the project using a local server or open the `index.html` file in your browser.

## Usage

Once the project is set up, the form will validate user inputs as they type. The country dropdown will be populated with data fetched from `countries.json`. Based on the selected country, the phone number will be validated to ensure it matches the required format.

## Code Structure

- `index.html`: The main HTML file containing the form elements.
- `style.css`: The CSS file to style the form and validation messages.
- `main.js`: The JavaScript module that handles display and validation logic.
- `phoneData.js`: The JavaScript module that fetches and exports country data.
- `countries.json`: A JSON file containing country names, codes, flags, and phone number length specifications.

## Validation Logic

### Name Validation

- **Max Length Check**: The first name and last name fields are validated to ensure they do not exceed 35 characters.

```javascript
const checkMaxLength = function (input, handler) {
  showFeedback(
    input,
    handler,
    input.value.length <= 35,
    'Valid name',
    'Maximum number of characters: 35'
  );
};
```

### Email Validation

- **Pattern Matching**: The email field is validated using a regular expression that allows only letters, numbers, dots, and underscores before the `@` symbol, and only letters after the `@` symbol.

```javascript
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
```

### Phone Number Validation

- **Country-Specific Length**: The phone number is validated to ensure it contains only digits and matches the exact length specified for the selected country.
- **Sanitization**: Any non-numeric characters are removed from the phone number input.

```javascript
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
    `Phone number must be up to ${country ? country.maxLength : 'N/A'} digits`
  );
};
```

### Password Validation

- **Strength Tiers**: The password is evaluated against different tiers of strength (Weak, Medium, Strong, Very Strong) based on the presence of uppercase, lowercase, numeric, and special characters.

```javascript
const checkPasswordStrength = function () {
  const strengthTiers = {
    veryStrong: {
      gauge: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/,
      text: 'Very strong password',
      className: 'very-strong',
    },
    strong: {
      gauge: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      text: 'Strong password',
      className: 'strong',
    },
    medium: {
      gauge: /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/,
      text: 'Medium password',
      className: 'medium',
    },
    weak: {
      gauge: /^.{6,}$/,
      text: 'Weak password',
      className: 'weak',
    },
  };

  const feedback =
    Object.values(strengthTiers).find(tier =>
      tier.gauge.test(password.value)
    ) || strengthTiers.weak;

  errorPassword.style.opacity = '1';
  errorPassword.innerText = feedback.text;

  errorPassword.className = '';
  errorPassword.classList.add(feedback.className);
};
```

- **Password Matching**: The confirm password field is checked to ensure it matches the password field.

```javascript
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
```

## Event Listeners

Event listeners are attached to each input field to trigger the appropriate validation function when the user types or modifies their input.

```javascript
const attachEventListeners = function () {
  validationMap.forEach(({ input, validation }) => {
    input.addEventListener('input', validation);
  });
};
```

### LICENSE

This project is licensed under the MIT License. You are free to use, modify, and distribute this code as long as proper attribution is given.
