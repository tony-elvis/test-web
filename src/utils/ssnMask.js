export const ssnOnChange = (ssn) => {
  const ssnFormatted = ssn.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
  if (ssnFormatted) {
    const [, p1, p2, p3] = ssnFormatted;
    if (!p1) {
      return '';
    } else if (p1 && !p2 && !p3) {
      return `${p1}`;
    } else if (p1 && p2 && !p3) {
      return `${p1}-${p2}`;
    } else {
      return `${p1}-${p2}-${p3}`;
    }
  }

  return ssn;
};

export const clearSsn = (ssn) => {
  const ssnFormatted = ssn.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,4})/);
  if (ssnFormatted) {
    const [, p1, p2, p3] = ssnFormatted;
    return `${p1}${p2}${p3}`;
  }

  return ssn;
};
