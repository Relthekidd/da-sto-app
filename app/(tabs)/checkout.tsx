// app/(tabs)/checkout.tsx

import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import useCartStore from '../store';                      // default import of your hook
import { sendOrderNotification } from '../services/orderNotification';

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();     // no selector arrow

  const [formData, setFormData] = useState<{
    name: string;
    address: string;
    phone: string;
    idPhoto: string | null;
    deliveryInstructions: string;
    specialRequests: string;
  }>({
    name: '',
    address: '',
    phone: '',
    idPhoto: null,
    deliveryInstructions: '',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setFormData((prev) => ({ ...prev, idPhoto: result.assets[0].uri }));
    }
  };

  const handleSubmit = async () => {
    const { name, address, phone, idPhoto, deliveryInstructions, specialRequests } = formData;
    if (!name || !address || !phone || !idPhoto) {
      return Alert.alert('Missing Info', 'Please complete all fields and upload your ID photo.');
    }

    setLoading(true);
    try {
      const orderDetails = {
        orderId: `ORD-${Date.now()}`,
        customer: { name, address, phone, idPhotoUrl: idPhoto },
        items,                                        // items is inferred type
        total,
        deliveryFee: 10,
        deliveryInstructions,
        specialRequests,
        timestamp: new Date().toISOString(),
      };

      const ok = await sendOrderNotification(orderDetails);
      if (!ok) throw new Error();

      clearCart();
      router.push({ pathname: '/order-success', params: { orderId: orderDetails.orderId } });
    } catch {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {items.map((item) => (
        <View
          key={`${item.id}-${item.selectedWeight.weight}`}
          style={styles.lineItem}
        >
          <Text>
            {item.name} ({item.selectedWeight.weight}) x {item.quantity}
          </Text>
          <Text>${(item.selectedWeight.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}

      <Text style={styles.summary}>Delivery Fee: $10.00</Text>
      <Text style={styles.summary}>Total: ${(total + 10).toFixed(2)}</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={(text) => setFormData((p) => ({ ...p, name: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Address"
        multiline
        value={formData.address}
        onChangeText={(text) => setFormData((p) => ({ ...p, address: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => setFormData((p) => ({ ...p, phone: text }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Delivery Instructions"
        multiline
        value={formData.deliveryInstructions}
        onChangeText={(text) =>
          setFormData((p) => ({ ...p, deliveryInstructions: text }))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Special Requests"
        multiline
        value={formData.specialRequests}
        onChangeText={(text) =>
          setFormData((p) => ({ ...p, specialRequests: text }))
        }
      />

      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={styles.uploadText}>
          {formData.idPhoto ? 'Change ID Photo' : 'Upload ID Photo'}
        </Text>
      </TouchableOpacity>

      {formData.idPhoto && (
        <Image source={{ uri: formData.idPhoto }} style={styles.preview} />
      )}

      <Button
        title={loading ? 'Placing Order…' : 'Place Order'}
        onPress={handleSubmit}
        disabled={loading}
      />
      {loading && <ActivityIndicator style={styles.loader} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summary: { marginVertical: 8, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  uploadButton: { marginBottom: 12 },
  uploadText: { color: '#10B981', fontWeight: '600' },
  preview: { width: '100%', height: 150, borderRadius: 8, marginBottom: 12 },
  loader: { marginTop: 10 },
});
