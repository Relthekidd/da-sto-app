// src/features/home/FeaturedProducts.tsx
import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import ProductCard from '@/components/ProductCard'
import { products } from '@/lib/data'
import type { Product } from '@/types'

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p: Product) =>
    ['Zoap', 'Dosi Dos', 'Double Queen'].includes(p.name)
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Products</Text>
      <FlatList
        data={featuredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <ProductCard {...item} />
        )}
        scrollEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#111827',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
})
