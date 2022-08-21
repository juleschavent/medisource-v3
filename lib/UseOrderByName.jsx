export const useOrderByName = (arr, value) => {
  return arr?.sort((a, b) => {
    const titleA = a[value].toLowerCase();
    const titleB = b[value].toLowerCase();
    if (titleA < titleB) {
      return -1;
    }
    return (titleA > titleB) ? 1 : 0;
  });
};