function date(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    dateStyle: "long",
  });
}

function year(date: string) {
  return new Date(date).getFullYear();
}
export const format = {
  date,
  year,
};
