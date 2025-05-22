import { subscribeToPubSubHub } from './subscribe'

// 使用例
async function main() {
  try {
    // 特定のチャンネルをPubSubHubに登録
    const channelId = 'UCxxxxxxxxxxxxxxxxxxxxxxxx' // 実際のチャンネルIDに置き換え
    console.log(`チャンネルID: ${channelId} をPubSubHubに登録します`)
    
    const response = await subscribeToPubSubHub(channelId)
    
    if (response.status === 202) {
      console.log('✅ 登録リクエストが受理されました')
    } else {
      console.error('❌ 登録に失敗しました:', response.status)
    }
  } catch (error) {
    console.error('エラーが発生しました:', error)
  }
}

main()
