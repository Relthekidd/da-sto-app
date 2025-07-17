// src/components/ProductCard.tsx
import React from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Eye } from 'lucide-react-native'
import type { Product } from '@/types/product'

export default function ProductCard({
  id,
  name,
  type,
  weightOptions,
  thc,
  image,
}: Product) {
  const basePrice = weightOptions?.[0]?.price
  const router = useRouter()
  const { width } = useWindowDimensions()
  const cardWidth = (width - 48) / 2 // Padding + spacing

  return (
    <Pressable
      onPress={() => router.push(`/product/${id}`)}
      style={[styles.card, { width: cardWidth }]}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.eyeButton}>
          <Eye size={18} color="#111" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{type}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>
            {basePrice
              ? `Starting at $${basePrice.toFixed(2)}`
              : 'Price varies'}
          </Text>
          <Text style={styles.thc}>THC: {thc}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  eyeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 6,
    borderRadius: 20,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    color: '#10b981',
    fontWeight: 'bold',
    fontSize: 13,
  },
  thc: {
    fontSize: 12,
    color: '#888',
  },
})
