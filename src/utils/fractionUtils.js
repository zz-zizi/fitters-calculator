export function decimalToFraction(decimal) {
  if (decimal === 0) return { whole: 0, numerator: 0, denominator: 1 };
  
  const tolerance = 1.0E-6; // Tolerance for floating point comparison
  const h = [0, 1, 0], k = [1, 0, 0];
  let a = Math.floor(decimal);
  let x = decimal - a;
  let n = 0;
  
  while (x > tolerance) {
    n++;
    if (n > 30) break; // Limit iterations to prevent infinite loops
    
    x = 1 / x;
    a = Math.floor(x);
    h[2] = a * h[1] + h[0];
    k[2] = a * k[1] + k[0];
    h[0] = h[1]; h[1] = h[2];
    k[0] = k[1]; k[1] = k[2];
    x -= a;
  }
  
  const whole = Math.floor(decimal);
  const numerator = h[1] - (whole * k[1]);
  const denominator = k[1];
  
  return { whole, numerator, denominator };
}

export function simplifyFraction(numerator, denominator) {
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const divisor = gcd(numerator, denominator);
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
}
