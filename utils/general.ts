export function getUniqueItems(list: any[]) {
  const unique = new Map(list.map((item) => [item.id, item]));
  return Array.from(unique.values());
}
