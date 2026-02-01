export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase?: number;
  expiresAt?: Date;
  maxDiscount?: number;
}

// Mock promo codes database
export const promoCodes: Record<string, PromoCode> = {
  'WELCOME10': {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minPurchase: 50,
  },
  'SAVE15': {
    code: 'SAVE15',
    type: 'percentage',
    value: 15,
    minPurchase: 100,
  },
  'FLAT20': {
    code: 'FLAT20',
    type: 'fixed',
    value: 20,
    minPurchase: 150,
  },
  'BUNDLE15': {
    code: 'BUNDLE15',
    type: 'percentage',
    value: 15,
    minPurchase: 0,
  },
};

export const validatePromoCode = (
  code: string,
  subtotal: number
): { valid: boolean; discount: number; message: string; promoCode?: PromoCode } => {
  const promo = promoCodes[code.toUpperCase()];

  if (!promo) {
    return { valid: false, discount: 0, message: 'Invalid promo code' };
  }

  if (promo.expiresAt && new Date() > promo.expiresAt) {
    return { valid: false, discount: 0, message: 'Promo code has expired' };
  }

  if (promo.minPurchase && subtotal < promo.minPurchase) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum purchase of $${promo.minPurchase} required`,
    };
  }

  let discount = 0;
  if (promo.type === 'percentage') {
    discount = (subtotal * promo.value) / 100;
    if (promo.maxDiscount && discount > promo.maxDiscount) {
      discount = promo.maxDiscount;
    }
  } else {
    discount = promo.value;
  }

  return {
    valid: true,
    discount,
    message: `${promo.type === 'percentage' ? promo.value + '%' : '$' + promo.value} discount applied!`,
    promoCode: promo,
  };
};

// Bundle discount detection
export const detectBundleDiscount = (itemCount: number): number => {
  if (itemCount >= 5) return 20; // 20% off for 5+ items
  if (itemCount >= 3) return 15; // 15% off for 3+ items
  return 0;
};

// Tax calculation (example: 8% tax rate)
export const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08;
};

// Shipping calculation
export const calculateShipping = (subtotal: number, itemCount: number): number => {
  if (subtotal >= 50) return 0; // Free shipping over $50
  if (itemCount === 0) return 0;
  return 5.99;
};
