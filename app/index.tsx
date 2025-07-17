// app/index.tsx
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'

export default function Home() {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', padding: 16 }}>
      <Text style={{ color: '#fff', marginBottom: 12 }}>Welcome to Da Sto’</Text>
      <Button title="Open Store" onPress={() => router.push('/store')} />
    </SafeAreaView>
  )
}
