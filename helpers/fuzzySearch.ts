function fuzzyMatch(companyCode: string, searchInput: string) {
  const search = searchInput.replace(/ /g, '').toLowerCase();
  const tokens: any[] = companyCode.split('');

  let searchPosition = 0;

  // Comparing values character by character
  tokens.forEach((textChar, index) => {
    if (textChar.toLowerCase() === search[searchPosition]) {
      if (searchPosition >= search.length) {
        return;
      }
      tokens[index] = `<strong>${textChar}</strong>`;
      // eslint-disable-next-line no-plusplus
      searchPosition++;
    }
  });
  if (searchPosition !== search.length) {
    return '';
  }
  return tokens.join('');
}

export default fuzzyMatch;
