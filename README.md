# YouTube PubSubHubBub サンプル実装

[English Version](#english-version)

## 目次

1. [概要](#概要)
2. [機能一覧](#機能一覧)
3. [インストール方法](#インストール方法)
4. [Webhook設定](#Webhook設定)
5. [使用方法](#使用方法)
6. [注意事項](#注意事項)
7. [ファイル構成](#ファイル構成)
8. [ライセンス](#ライセンス)
    

このリポジトリは、YouTubeのPubSubHubBubを使用して動画の更新通知を受け取る実装例を提供します。PubSubHubBubを使うことで、新しい動画がアップロードされた際にリアルタイムで通知を受け取ることができます。

## 概要

YouTube Data APIを使った定期的なポーリングではなく、PubSubHubBubを使うことで以下のメリットがあります。

- APIクォータの消費を最小限に
- リアルタイムで通知を受け取れる
- サーバーリソースを効率的に使用できる

## 機能一覧

- YouTubeチャンネルのPubSubHubBubへの登録
- Webhook経由での動画更新通知の受信
- 受信した通知からの動画情報の抽出

## インストール方法

### 前提条件
- Node.js 14.x以上
- npm 7.x以上
- パブリックにアクセス可能なWebhookエンドポイント

### セットアップ手順

1. リポジトリをクローンします
```bash
git clone https://github.com/tatsumin39/youtube-pubsubhubbub-example.git
cd youtube-pubsubhubbub-example
```

2. 依存パッケージをインストールします
```bash
npm install
```

3. 環境変数を設定します
```bash
# .envファイルを作成
cp .env.example .env
# .envファイルを編集して、YOUR_BASE_URLを設定します
```

4. サンプルを実行します
```bash
npm start
```

## Webhook設定

このサンプルを実際に動作させるには、パブリックにアクセス可能なWebhookエンドポイントが必要です。
webhookエンドポイントは.envファイルの`YOUR_BASE_URL`に設定します。


## 使用方法

### チャンネルの登録

`example.ts`ファイルを編集して、登録したいYouTubeチャンネルIDを設定します。

```typescript
// src/example.ts
async function main() {
  try {
    // 特定のチャンネルをPubSubHubに登録
    const channelId = 'UCxxxxxxxxxxxxxxxxxxxxxx' // 実際のチャンネルIDに置き換え
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
```

### Webhookの処理

Webhookエンドポイントが呼び出されると、`webhook.ts`の処理が実行されます。

1. 購読確認リクエスト（GET）：PubSubHubからの確認リクエストを処理
2. 更新通知（POST）：YouTubeからの動画更新通知を処理

## 注意事項

- PubSubHubBubの購読期間は最大10日間（864000秒）です。定期的に再購読する必要があります。
- Webhookエンドポイントは常にパブリックにアクセス可能である必要があります。
- 本番環境では適切なエラーハンドリングとセキュリティ対策を実装してください。

## ファイル構成

```
youtube-pubsubhubbub-example/
├── package.json
├── tsconfig.json
├── .env.example
├── src
│   ├── app
│   │   └── api
│   │       └── webhook
│   │           └── pubsub
│   │               └── route.ts
│   ├── example.ts
│   └── subscribe.ts
```
app/api/webhook/pubsub
## ライセンス

このプロジェクトは [MIT license](LICENSE) の下で公開されています。

## English Version

# YouTube PubSubHubBub Implementation Example

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Webhook Configuration](#webhook-configuration)
5. [How to Use](#how-to-use)
6. [Notes](#notes)
7. [File Structure](#file-structure)
8. [License](#license)


This repository provides an implementation example for receiving video update notifications using YouTube's PubSubHubBub. By using PubSubHubBub, you can receive real-time notifications when new videos are uploaded.

## Overview

Using PubSubHubBub instead of periodic polling with the YouTube Data API offers the following benefits:

- No consumption of API quota
- Real-time notifications
- Efficient use of server resources

## Features

- Subscription to YouTube channels via PubSubHubBub
- Receiving video update notifications via webhook
- Extracting video information from received notifications

## Installation

### Prerequisites
- Node.js 14.x or higher
- npm 7.x or higher
- Publicly accessible webhook endpoint

### Setup Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/youtube-pubsubhubbub-example.git
cd youtube-pubsubhubbub-example
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env file
cp .env.example .env
# Edit the .env file to set YOUR_WEBHOOK_URL
```

4. Run the example
```bash
npm start
```

## Webhook Configuration

To make this sample work, you need a publicly accessible webhook endpoint. 
Set the webhook endpoint in the `YOUR_BASE_URL` variable in your .env file.


## How to Use

### Channel Subscription

Edit the `example.ts` file to set the YouTube channel ID you want to subscribe to:

```typescript
// src/example.ts
async function main() {
  try {
    // Subscribe a specific channel to PubSubHub
    const channelId = 'UCxxxxxxxxxxxxxxxxxxxxxxxx' // Replace with the actual channel ID
    console.log(`Subscribing channel ID: ${channelId} to PubSubHub`)
    
    const response = await subscribeToPubSubHub(channelId)
    
    if (response.status === 202) {
      console.log('✅ Subscription request accepted')
    } else {
      console.error('❌ Subscription failed:', response.status)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
```

### Webhook Processing

When the webhook endpoint is called, the processing in `webhook.ts` is executed:

1. Subscription confirmation request (GET): Processes confirmation requests from PubSubHub
2. Update notification (POST): Processes video update notifications from YouTube





## Notes

- PubSubHubBub subscription period is maximum 10 days (864000 seconds). You need to resubscribe periodically.
- The webhook endpoint must always be publicly accessible.
- Implement appropriate error handling and security measures in production environments.

## File Structure

```
youtube-pubsubhubbub-example/
├── package.json
├── tsconfig.json
├── .env.example
├── src
│   ├── app
│   │   └── api
│   │       └── webhook
│   │           └── pubsub
│   │               └── route.ts
│   ├── example.ts
│   └── subscribe.ts
```

## License

This project is released under [MIT license](LICENSE).
