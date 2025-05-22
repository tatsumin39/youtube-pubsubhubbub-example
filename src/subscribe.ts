/**
 * YouTubeチャンネルをPubSubHubBubに登録する関数
 * @param channelId YouTubeチャンネルID
 * @returns レスポンス
 */
export async function subscribeToPubSubHub(channelId: string) {
  const hubUrl = 'https://pubsubhubbub.appspot.com/subscribe'
  const topicUrl = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`
  const callbackUrl = `${process.env.YOUR_BASE_URL}/api/webhook/pubsub`

  const params = new URLSearchParams({
    'hub.callback': callbackUrl,
    'hub.lease_seconds': '864000', // 10日間
    'hub.mode': 'subscribe',
    'hub.topic': topicUrl,
    'hub.verify': 'sync'
  })
  
  const response = await fetch(hubUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params.toString()
  })
  
  console.log('Response status:', response.status)
  
  return response
}
