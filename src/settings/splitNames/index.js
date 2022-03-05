/**
 * Splits the user's full name into first and last name
 *
 * @param {Object} account - the users account
 * @returns {Object} users first and last name as object properties
 */
 const splitNames = (account) => {
  let firstName = "";
  let lastName = "";
  const { first_name, last_name } = account;
  const nameParts = first_name && last_name.split(" ");
  if (Array.isArray(nameParts)) {
    [firstName, lastName] = nameParts;
  }

  return {
    firstName,
    lastName
  };
}

export default splitNames;