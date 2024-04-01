export const convertToCurrency = (cents: number | string) => {
  const value = Number(cents) / 100;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const convertToCents = (value: string | number): number => {
  const stringValue = typeof value === "number" ? value.toString() : value;

  const numericValue = stringValue.replace(/[R$\.,]/g, "");
  const formattedValue = numericValue.replace(/(\d+)\.(\d{2})/, "$1.$2");

  return parseInt(formattedValue, 10);
};

export const convertToBrl = (value: string | number): string => {
  const numericValue =
    typeof value === "number"
      ? value.toFixed(2)
      : parseFloat(value.replace(",", ".")).toFixed(2);
  const stringValue = numericValue.replace(".", ",");
  return `R$ ${stringValue}`;
};
