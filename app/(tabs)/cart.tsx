import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useCartStore } from '@/store/cartStore'
import type { Product, WeightOption } from '@/types'

interface CartItem extends Product {
  selectedWeight: WeightOption
  quantity: number
}
import { Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const router = useRouter()
  const { items, total, updateQuantity, removeFromCart } = useCartStore((state) => ({
    items: state.items,
    total: state.total,
    updateQuantity: state.updateQuantity,
    removeFromCart: state.removeFromCart,
  }))

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: '#000' }]}>
        <Text style={[styles.emptyText, { color: '#fff' }]}>Your cart is empty</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.shopLink}>Continue Shopping</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>

      {items.map((item: CartItem) => (
        <View
          key={`${item.id}-${item.selectedWeight.weight}`}
          style={styles.card}
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.weight}>
              {item.selectedWeight.weight}
            </Text>
            <Text style={styles.price}>
              ${item.selectedWeight.price.toFixed(2)}
            </Text>

            <Picker
              selectedValue={item.quantity}
              onValueChange={(value: number) =>
                updateQuantity(item.id, item.selectedWeight, value)
              }
              style={styles.picker}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <Picker.Item key={num} label={`${num}`} value={num} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => removeFromCart(item.id, item.selectedWeight)}
          >
            {/* lucide-react-native uses stroke/width */}
            <Trash2 stroke="red" width={20} height={20} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Order Summary</Text>

        <View style={styles.row}>
          <Text>Subtotal</Text>
          <Text>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Delivery Fee</Text>
          <Text>$10.00</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.boldText}>Total</Text>
          <Text style={styles.boldText}>${(total + 10).toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#fff' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#1f2937',
    borderRadius: 10,
  },
  image: { width: 72, height: 72, borderRadius: 8 },

  name: { fontWeight: 'bold', fontSize: 16, color: '#fff' },
  type: { color: '#ccc' },
  weight: { fontSize: 12, color: '#ccc' },
  price: { color: '#059669', marginTop: 4 },

  picker: { height: 40, width: 120, marginTop: 8 },

  summary: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#111827',
    borderRadius: 12,
  },
  summaryTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#fff' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  boldText: { fontWeight: 'bold', color: '#fff' },

  checkoutButton: {
    marginTop: 12,
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: 'bold' },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: { fontSize: 20, marginBottom: 12, color: '#fff' },
  shopLink: { color: '#059669', fontWeight: '600' },
});
