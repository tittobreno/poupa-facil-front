export const convertToCurrency = (cents: number | string) => {
  const value = Number(cents) / 100;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
