export const minPasswordLength = 8;

export const validatePassword = (password) => {
  const hasLowerCase = /[a-z]/;
  const hasUpperCase = /[A-Z]/;
  const hasDigit = /\d/;
  const hasSpecial = /(_|[^\w\d ])/;

  const validations = [
    { message: "Password must be at least 8 characters long.", isValid: password.length >= minPasswordLength },
    { message: "Password must contain at least one lowercase letter.", isValid: hasLowerCase.test(password) },
    { message: "Password must contain at least one uppercase letter.", isValid: hasUpperCase.test(password) },
    { message: "Password must contain at least one digit.", isValid: hasDigit.test(password) },
    { message: "Password must contain at least one special character.", isValid: hasSpecial.test(password) }
  ];

  return validations;
};