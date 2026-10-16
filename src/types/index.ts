export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'ta';

export interface ColorOption {
  name: string;
  nameTa?: string;
  hex: string;
  imageUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionTa?: string;
  craftsmanship: string;
  craftsmanshipTa?: string;
  materials: string[];
  materialsTa?: string[];
  colors: ColorOption[];
  sizes: number[];
  images: string[];
  featured?: boolean;
  isNewArrival?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export interface Brand {
  id: string;
  name: string;
  tagline: string;
  taglineTa: string;
  description: string;
  descriptionTa: string;
  origin: string;
  productCount: number;
  heroImage: string;
}

export interface CartItem {
  id: string; // unique item key: productId-color-size
  product: Product;
  selectedColor: ColorOption;
  selectedSize: number;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}

export interface BusinessConfig {
  name: string;
  tagline: string;
  taglineTa: string;
  phone: string;
  whatsapp: string; // digits only for wa.me e.g. 919443266892
  displayWhatsapp: string;
  instagram: string;
  instagramHandle: string;
  address: string;
  addressTa: string;
  city: string;
  openingHours: {
    weekdays: string;
    weekdaysTa: string;
    weekends: string;
    weekendsTa: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  directionsUrl: string;
  currency: string;
  currencyCode: string;
}

export interface OrderCustomerInfo {
  name: string;
  phoneOrWhatsapp: string;
  city: string;
  address: string;
  notes?: string;
}
