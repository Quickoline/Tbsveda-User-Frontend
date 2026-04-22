export const toId = (value: any): string => {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'object') {
    if (typeof value.$oid === 'string') return value.$oid;
    if (value._id) return toId(value._id);
    const asString = value.toString?.();
    if (asString && asString !== '[object Object]') return asString;
  }
  return '';
};

export const toDate = (value: any): Date | null => {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  if (typeof value === 'object' && value.$date) {
    return toDate(value.$date);
  }
  return null;
};

export const extractOrders = (payload: any): any[] => {
  const candidates = [
    payload?.data?.data,
    payload?.data?.orders,
    payload?.data,
    payload?.orders,
    payload,
  ];
  const match = candidates.find((entry) => Array.isArray(entry));
  return Array.isArray(match) ? match : [];
};

export const formatDateSafe = (
  value: any,
  options?: Intl.DateTimeFormatOptions,
  locale = 'en-US',
  fallback = 'N/A'
): string => {
  const parsed = toDate(value);
  if (!parsed) return fallback;
  try {
    return parsed.toLocaleDateString(locale, options);
  } catch {
    return fallback;
  }
};
