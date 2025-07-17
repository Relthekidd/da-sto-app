// app/store.tsx
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function StorePage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
      <WebView source={{ uri: 'https://dasto.site' }} style={{ flex: 1 }} />
    </SafeAreaView>
  )
}
