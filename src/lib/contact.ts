export const PHONE = "966721057";
export const PHONE_DISPLAY = "+51 966 721 057";

const REFERRAL = "Hola, les contacto desde su sitio web.\n";

export function waUrl(message: string): string {
  return `https://wa.me/51${PHONE}?text=${encodeURIComponent(REFERRAL + message)}`;
}
