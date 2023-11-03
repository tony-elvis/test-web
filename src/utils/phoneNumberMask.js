export const phoneNumberMask = (phoneNumber) => {
  //format phone number to +x-xxx-xxx-xxxx
  if (!phoneNumber) return '';
  const phoneNumberFormatted = phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  if (phoneNumberFormatted) {
    const [, p1, p2, p3] = phoneNumberFormatted;
    return `(${p1}) ${p2}-${p3}`;
  }
  return phoneNumber;
};

export const phoneNumberOnChange = (phoneNumber) => {
  const phoneNumberFormatted = phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  if (phoneNumberFormatted) {
    const [, p1, p2, p3] = phoneNumberFormatted;
    if (!p1) {
      return '';
    } else if (p1 && !p2 && !p3) {
      return `${p1}`;
    } else if (p1 && p2 && !p3) {
      return `(${p1}) ${p2}`;
    } else {
      return `(${p1}) ${p2}-${p3}`;
    }
  }

  return phoneNumber;
};

export const clearPhoneNumber = (phoneNumber) => {
  const phoneNumberFormatted = phoneNumber.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  if (phoneNumberFormatted) {
    const [, p1, p2, p3] = phoneNumberFormatted;
    return `${p1}${p2}${p3}`;
  }

  return phoneNumber;
};

export default phoneNumberMask;
