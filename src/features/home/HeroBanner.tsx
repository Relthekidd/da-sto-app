import React from 'react'
import { Image, Text, View, StyleSheet, Dimensions, Pressable } from 'react-native'
import { useRouter } from 'expo-router'

const windowHeight = Dimensions.get('window').height

export default function HeroBanner() {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.push('/shop')}>
      <View style={[styles.container, { height: windowHeight }]}>
        <Image
          source={{
            uri: 'https://shopharborside.com/wp-content/uploads/2023/11/indoor-cannabis-farm-greenhouse-1024x576.jpg',
          }}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Text style={styles.title}>Da Sto’</Text>
          <Text style={styles.description}>
            Fast, discreet weed delivery. Tap to shop now.
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#eee',
    textAlign: 'center',
  },
})
