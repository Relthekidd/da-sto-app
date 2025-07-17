import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Animated, { FadeIn, ZoomIn, SlideInUp } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native'
import { BG_IMAGE } from '@/constants/images'
import { useRef } from 'react'

export default function Home() {
  const router = useRouter()
  const sparkleRef = useRef(null)

  return (
    <ImageBackground
      source={BG_IMAGE}
      resizeMode="cover"
      style={styles.bg}
      imageStyle={{ opacity: 0.2 }}
    >
      <LinearGradient
        colors={['#0f0f0f', '#000']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Sparkle overlay */}
      <LottieView
        ref={sparkleRef}
        source={require('@/assets/sparkle.json')}
        autoPlay
        loop
        style={styles.sparkles}
      />

      <SafeAreaView style={styles.container}>
        <Animated.View entering={ZoomIn.springify().delay(200)} style={styles.logo}>
          <Text style={styles.emoji}>🛒</Text>
        </Animated.View>

        <Animated.Text
          entering={FadeIn.duration(800).delay(400)}
          style={styles.title}
        >
          Welcome to Da Sto’
        </Animated.Text>

        <Animated.Text
          entering={SlideInUp.delay(600)}
          style={styles.subtitle}
        >
          Your delivery, your vibe.
        </Animated.Text>

        <Animated.View entering={FadeIn.delay(800)} style={{ width: '100%' }}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/store')}>
            <Text style={styles.buttonText}>Enter the Shop</Text>
          </TouchableOpacity>
        </Animated.View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    marginBottom: 16,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#22c55e',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 12,
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  sparkles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
})
