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
    backgroundColor: '#064e3b',
    padding: 12,
    borderRadius: 8,
  },
  text: {
    color: '#d1fae5',
    textAlign: 'center',
  },
})
