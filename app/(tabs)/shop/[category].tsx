// src/features/shop/ShopScreen.tsx
import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import ProductCard from '@/components/ProductCard'
import CartNotification from '@/components/ui/CartNotification'
import { useNotification } from '@/hooks/useNotification'
import { products } from '@/lib/data'
import type { Product } from '@/types'


export default function ShopScreen() {
  // Get the dynamic category from the route
  const { category } = useLocalSearchParams<{ category: string }>()
  const { notification } = useNotification()

  // Filter products by category
  const categoryProducts = products.filter((p: Product) => p.category === category)
  const categoryTitle = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Shop'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryTitle}</Text>

      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <ProductCard {...item} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No products in this category yet.
          </Text>
        )}
        contentContainerStyle={
          categoryProducts.length === 0 && styles.emptyContainer
        }
      />

      {notification && (
        <CartNotification message={notification} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
})
