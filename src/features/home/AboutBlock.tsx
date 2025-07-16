// src/features/home/AboutBlock.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Truck, Shield, Leaf } from 'lucide-react-native'

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Same-day delivery within our service area',
  },
  {
    icon: Shield,
    title: 'Lab Tested',
    description: 'All products verified for quality and safety',
  },
  {
    icon: Leaf,
    title: 'Premium Selection',
    description: 'Curated collection of top-tier products',
  },
]

export default function AboutBlock() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Why Choose Da Sto’</Text>
      <Text style={styles.subheading}>
        We're committed to providing the highest quality cannabis products with
        exceptional service and convenience.
      </Text>

      <View style={styles.grid}>
        {features.map(({ icon: Icon, title, description }) => (
          <View key={title} style={styles.feature}>
            <View style={styles.iconWrapper}>
              <Icon size={20} color="#059669" />
            </View>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureDesc}>{description}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 320,
    alignSelf: 'center',
    marginBottom: 24,
  },
  grid: {
    // RN 0.71+ supports gap; otherwise use marginBottom on items
    gap: 24,
  },
  feature: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconWrapper: {
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 9999,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
})
