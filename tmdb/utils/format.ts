function date(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    dateStyle: "long",
  });
}

function year(date: string) {
  return new Date(date).getFullYear();
}

function runtime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours ? hours + "h" : ""} ${mins}min`;
}
export const format = {
  date,
  year,
  runtime,
};
