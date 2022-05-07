export const generateCibil = async () => {
  return 800;
};

export const isValidAmount = async (amount) => {
  let maxAmount;
  const cibil = await generateCibil();
  if (cibil >= 300 && cibil <= 450) {
    maxAmount = 50000;
  } else if (cibil >= 451 && cibil <= 650) {
    maxAmount = 100000;
  } else {
    maxAmount = 200000;
  }
  if (amount <= maxAmount) {
    return true;
  } else {
    return false;
  }
};
