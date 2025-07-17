// app/(tabs)/home.tsx
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeroBanner from '@/features/home/HeroBanner'
import FeaturedProducts from '@/features/home/FeaturedProducts'
import AboutBlock from '@/features/home/AboutBlock'

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView>
        <HeroBanner />
        <FeaturedProducts />
        <AboutBlock />
      </ScrollView>
    </SafeAreaView>
  )
}
