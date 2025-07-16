// app/store.tsx
import { WebView } from 'react-native-webview'

export default function StorePage() {
  return (
    <WebView
      source={{ uri: 'https://dasto.site' }}
      style={{ flex: 1 }}
    />
  )
}
