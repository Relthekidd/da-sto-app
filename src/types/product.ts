// src/types/product.ts

export type WeightOption = {
  weight: '3.5g' | '7g' | '14g' | '28g';
  price: number;
};

export interface Product {
  id: string;
  name: string;
  type: string;
  weightOptions: WeightOption[];
  thc: string;
  cbd?: string;
  image: string;
  description: string;
  effects?: string[];
  flavors?: string[];
  category: 'flower' | 'carts' | 'edibles' | 'pre-rolls' | 'concentrates' | 'accessories';
}

export interface CartProduct extends Product {
  selectedWeight: WeightOption;
}
