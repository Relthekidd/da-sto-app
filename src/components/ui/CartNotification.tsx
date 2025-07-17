import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface CartNotificationProps {
  message: string
}

export default function CartNotification({ message }: CartNotificationProps) {
  if (!message) return null

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#d1fae5',
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: '#065f46',
    textAlign: 'center',
  },
})
