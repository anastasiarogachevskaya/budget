export const convertDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}