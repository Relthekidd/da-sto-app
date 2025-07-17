import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useCartStore, CartItem } from '../../store'; // adjust path to your store
import { Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const router = useRouter();
  const { items, total, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.shopLink}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
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
                updateQuantity(item.id, value)
              }
              style={styles.picker}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <Picker.Item key={num} label={`${num}`} value={num} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity onPress={() => removeItem(item.id)}>
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
        <View style={[styles.row, styles.boldRow]}>
          <Text>Total</Text>
          <Text>${(total + 10).toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => router.push('/checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  image: { width: 72, height: 72, borderRadius: 8 },

  name: { fontWeight: 'bold', fontSize: 16 },
  type: { color: '#666' },
  weight: { fontSize: 12, color: '#666' },
  price: { color: '#059669', marginTop: 4 },

  picker: { height: 40, width: 120, marginTop: 8 },

  summary: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#e5f4ed',
    borderRadius: 12,
  },
  summaryTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  boldRow: { fontWeight: 'bold' },

  checkoutButton: {
    marginTop: 12,
    backgroundColor: '#059669',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: 'white', fontWeight: 'bold' },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: { fontSize: 20, marginBottom: 12 },
  shopLink: { color: '#059669', fontWeight: '600' },
});
