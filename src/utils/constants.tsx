export const isValidName = (name: string) => {
  if (name.length < 2 || name.length > 1000) {
    return false;
  }
  return true;
};

export const isValidPassword = (password: string) => {
  if (password.length < 8) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return false;
  }
  return true;
};


export const isValidPhone = (phone: string) => {
    var phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return phone.match(phoneRegex) ? true : false
   
}

