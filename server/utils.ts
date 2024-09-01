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

export const getLowestPrice = (priceHistory: Array<{ price: number }>) => {
  return priceHistory.reduce((acc, curr) => {
    return acc.price < curr.price ? acc : curr;
  });
};

export const getAveragePrice = (priceHistory: Array<{ price: number }>) => {
  return (
    priceHistory.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0) / priceHistory.length
  );
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

export const getHighestPrice = (priceHistory: Array<{ price: number }>) => {
  return priceHistory.reduce((acc, curr) => {
    return acc.price > curr.price ? acc : curr;
  });
};
