// app/(tabs)/home.tsx
import { ScrollView, View } from 'react-native'
import HeroBanner from '@/features/home/HeroBanner'
import FeaturedProducts from '@/features/home/FeaturedProducts'
import AboutBlock from '@/features/home/AboutBlock'

export default function HomeScreen() {
  return (
    <ScrollView>
      <HeroBanner />
      <FeaturedProducts />
      <AboutBlock />
    </ScrollView>
  )
}
