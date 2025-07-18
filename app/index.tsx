import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Animated, { FadeIn, ZoomIn, withRepeat, withTiming, useSharedValue, useAnimatedStyle, Easing } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native'
import { BG_IMAGE, SPARKLE_ANIMATION, CART_ICON } from '@/constants/images'
import { useEffect, useRef } from 'react'

export default function Home() {
  const router = useRouter()
  const sparkleRef = useRef(null)

  // Float animation for the logo
  const float = useSharedValue(0)
  const animatedFloat = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value }],
  }))
  // Pulse animation for the glow circle
  const glowScale = useSharedValue(1)
  const animatedGlow = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
  }))
  useEffect(() => {
    float.value = withRepeat(withTiming(-10, { duration: 1200 }), -1, true)
    glowScale.value = withRepeat(withTiming(1.3, { duration: 1500 }), -1, true)
  }, [])

  return (
    <ImageBackground
      source={BG_IMAGE}
      resizeMode="cover"
      style={styles.bg}
      imageStyle={{ opacity: 0.2 }}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', '#000']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Sparkle overlay */}
      <LottieView
        ref={sparkleRef}
        source={SPARKLE_ANIMATION}
        autoPlay
        loop
        colorFilters={[
          { keypath: 'Small', color: '#ffffff' },
          { keypath: 'Medium', color: '#ffffff' },
          { keypath: 'Big', color: '#ffffff' },
        ]}
        style={styles.sparkles}
      />

      <SafeAreaView style={styles.container}>
        {/* Floating logo */}
        <Animated.View
          entering={ZoomIn.springify().delay(200)}
          style={[styles.logo, animatedFloat]}
        >
          <Image source={CART_ICON} style={styles.cartIcon} />
        </Animated.View>

        <Animated.Text
          entering={FadeIn.duration(800)
            .delay(400)
            .easing(Easing.out(Easing.cubic))
            .withInitialValues({ opacity: 0, transform: [{ scale: 0.9 }] })}
          style={styles.title}
        >
          Welcome to Da Sto’
        </Animated.Text>

        <Animated.Text
          entering={FadeIn.duration(800)
            .delay(600)
            .easing(Easing.out(Easing.cubic))
            .withInitialValues({ opacity: 0, transform: [{ translateY: 10 }] })}
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
    marginBottom: 24,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 28,
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
    width: '150%',
    height: '150%',
    left: '-25%',
    top: '-25%',
    zIndex: -1,
  },
});
