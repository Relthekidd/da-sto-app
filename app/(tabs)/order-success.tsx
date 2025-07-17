// app/(tabs)/order-success.tsx

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CheckCircle, Phone } from 'lucide-react-native';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  if (!params.orderDetails) {
    return (
      <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: '#000' }}>
        <Text style={{ color: '#fff' }}>Missing order details.</Text>
      </SafeAreaView>
    );
  }

  const orderDetails = typeof params.orderDetails === 'string'
    ? JSON.parse(params.orderDetails)
    : params.orderDetails;

  const {
    orderId,
    customerName,
    customerPhone,
    deliveryAddress,
    items,
    total,
    deliveryFee,
    timestamp,
  } = orderDetails;

  const formattedItems = items
    .map((item: any) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <CheckCircle size={64} color="#10b981" />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 16, color: '#fff' }}>Order Placed Successfully!</Text>
      </View>

      <View style={{ backgroundColor: '#1f2937', padding: 16, borderRadius: 10, marginBottom: 16 }}>
        <Text style={{ fontSize: 16, marginBottom: 6, color: '#fff' }}>
          <Text style={{ fontWeight: 'bold' }}>Order Number:</Text> {orderId}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 6, color: '#fff' }}>
          <Text style={{ fontWeight: 'bold' }}>Customer:</Text> {customerName}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 6, color: '#fff' }}>
          <Text style={{ fontWeight: 'bold' }}>Phone:</Text> {customerPhone}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 6, color: '#fff' }}>
          <Text style={{ fontWeight: 'bold' }}>Delivery Address:</Text> {deliveryAddress}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <Phone size={18} color="#10b981" />
          <Text style={{ marginLeft: 6, color: '#10b981' }}>Expect a call from us shortly!</Text>
        </View>
        <Text style={{ marginTop: 6, color: '#ccc' }}>
          We'll call within 15–30 mins to confirm and arrange delivery. Keep your phone nearby.
        </Text>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4, color: '#fff' }}>Order Items:</Text>
        <Text style={{ fontFamily: 'Courier', color: '#ddd', fontSize: 14, marginBottom: 8 }}>
          {formattedItems}
        </Text>
        <Text style={{ fontSize: 16, color: '#fff', marginBottom: 4 }}>
          <Text style={{ fontWeight: 'bold' }}>Total:</Text> ${(total + deliveryFee).toFixed(2)}
        </Text>
        <Text style={{ fontSize: 14, color: '#aaa' }}>
          <Text style={{ fontWeight: 'bold' }}>Order placed at:</Text> {new Date(timestamp).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/')}
        style={{
          backgroundColor: '#10b981',
          padding: 16,
          borderRadius: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Continue Shopping</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}
