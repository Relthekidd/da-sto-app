import type { Product, WeightOption } from '@/types'

export const products: Product[] = [
  {
    id: '1',
    name: 'Zoap',
    type: 'Indica',
    category: 'flower',
    thc: '25%',
    description: 'Popular indica strain',
    image: 'https://via.placeholder.com/300',
    weightOptions: [
      { weight: '3.5g', price: 30 },
      { weight: '7g', price: 55 },
      { weight: '14g', price: 100 },
      { weight: '28g', price: 180 },
    ],
    effects: ['Relaxed', 'Happy'],
  },
  {
    id: '2',
    name: 'Dosi Dos',
    type: 'Hybrid',
    category: 'flower',
    thc: '27%',
    description: 'Potent hybrid strain',
    image: 'https://via.placeholder.com/300',
    weightOptions: [
      { weight: '3.5g', price: 32 },
      { weight: '7g', price: 60 },
      { weight: '14g', price: 110 },
      { weight: '28g', price: 200 },
    ],
    effects: ['Euphoric', 'Relaxed'],
  },
  {
    id: '3',
    name: 'Double Queen',
    type: 'Sativa',
    category: 'flower',
    thc: '24%',
    description: 'Uplifting sativa strain',
    image: 'https://via.placeholder.com/300',
    weightOptions: [
      { weight: '3.5g', price: 28 },
      { weight: '7g', price: 50 },
      { weight: '14g', price: 95 },
      { weight: '28g', price: 170 },
    ],
    effects: ['Energetic', 'Focused'],
  },
]

export async function fetchProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id)
}
