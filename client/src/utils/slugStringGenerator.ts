const slugStringGenarator = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[$&+,:;=?@#|'<>.^*()%!\]\\]/g, '')
    .replace('-', '')
    .replace('/', '')
    .replace(/ +/g, '')
    .split(' ')
    .join('-');
};

export default slugStringGenarator;
