const type = {
  WELCOME: "WELCOME",
  STOCK: "STOCK_UPDATE",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD: "THRESHOLD",
};

const THRESHOLD = 30;

export function getPrice(...elements: any) {
  for (const element of elements) {
    const price = element.text().trim();
    if (price) return price.replace(/\D/g, "");
  }
  return "";
}

export function getCurrency(element: any) {
  const currency = element.text().trim().slice(0, 1);
  return currency ? currency : "₹";
}

export function getDescription(...elements: any) {
  for (const element of elements) {
    const description = element.text().trim();
    if (description) return description;
  }
  return "";
}

export function getRating(...elements: any) {
  for (const element of elements) {
    const rating = element.text().trim();
    if (rating) return rating;
  }
  return "";
}

export function getCategory(...elements: any) {
  for (const element of elements) {
    const category = element.text().trim();
    if (category) return category;
  }
  return "";
}

export const getLowestPrice = (
  priceHistory: Array<{ price: number }>
): number => {
  if (priceHistory.length === 0) return 0;
  return Math.min(...priceHistory.map((item) => item.price));
};

export const getHighestPrice = (
  priceHistory: Array<{ price: number }>
): number => {
  if (priceHistory.length === 0) return 0;
  return Math.max(...priceHistory.map((item) => item.price));
};

export const getAveragePrice = (
  priceHistory: Array<{ price: number }>
): number => {
  if (priceHistory.length === 0) return 0;
  const sum = priceHistory.reduce((acc, curr) => acc + curr.price, 0);
  return Math.round(sum / priceHistory.length);
};

export const emailRemindType = (scrappedProduct: any, currentProduct: any) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrappedProduct.current_price < lowestPrice) {
    return type.LOWEST_PRICE;
  }

  if (!scrappedProduct.outOfStock && currentProduct.outOfStock) {
    return type.STOCK;
  }

  if (scrappedProduct.discountRate >= THRESHOLD) {
    return type.THRESHOLD;
  }
};
