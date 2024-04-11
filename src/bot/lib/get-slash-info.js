/**
 * @param {string} message
 */
export const getSlashInfo = (message) => {
  const splitted = message.split(' ');
  const slash = splitted[0];
  const tail = splitted.slice(1).join(' ');

  return {
    slash,
    tail
  }
};