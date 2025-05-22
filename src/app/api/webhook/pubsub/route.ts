import { NextRequest, NextResponse } from 'next/server'
import xml2js from "xml2js"

/**
 * PubSubHubBubからの確認リクエストを処理するハンドラー
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const challenge = searchParams.get('hub.challenge')
  
  if (challenge) {
    console.log('PubSubHubbub 購読確認リクエスト受信')
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
  
  return new NextResponse('Bad Request', { status: 400 })
}

/**
 * YouTubeからの動画更新通知を処理するハンドラー
 */
export async function POST(request: NextRequest) {
  // リクエストボディを取得
  const body = await request.text()
  
  // XMLをパース
  const parsedPubSub = await xml2js.parseStringPromise(body)

  // フィードにentryが含まれていない場合（動画削除など）
  if (!parsedPubSub?.feed?.entry) {
    console.log('entry が存在しない更新通知を受信')
    return new NextResponse('OK', { status: 200 })
  }

  // 動画情報を取得
  const entry = parsedPubSub.feed.entry[0]
  
  const videoData = {
    videoId: entry["yt:videoId"][0],
    title: entry.title[0],
    published: entry.published[0],
    channelId: entry["yt:channelId"][0]
  }

  console.log('新しい動画が公開されました:', videoData)
  
  // ここで動画情報を保存したり、通知を送ったりする処理を実装
  
  return new NextResponse('OK', { status: 200 })
}
