export function email_test(value) {
  return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}/g.test(value);
}

export function password_test(value) {
  return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/g.test(
    value
  );
}
