// app/index.tsx
import { View, Text, Button } from 'react-native'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Da Sto’</Text>
      <Button title="Open Store" onPress={() => router.push('/store')} />
    </View>
  )
}
