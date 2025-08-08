# Scrimr 使用指南

Scrimr 提供兩種靈活的使用方式：**組件 API** 和 **屬性 API**，讓您可以根據項目需求選擇最適合的整合方式。

## 🎯 核心概念

Scrimr 使用 **3 個核心參數** 來控制 shimmer 載入效果：

- `minLength`: 最少字數 (預設: 10)
- `maxLength`: 最大字數 (預設: 30)  
- `randomSpaces`: 隨機空格 (預設: false)

## 📦 安裝

```bash
npm install scrimr
# 或
yarn add scrimr
# 或
pnpm add scrimr
```

## 🔸 方式一：組件 API

適合 React 項目，提供完整的 TypeScript 支援和 React 特性。

### 基本使用

```tsx
import { Scrimr } from 'scrimr'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  
  return (
    <Scrimr 
      isLoading={isLoading}
      minLength={10}
      maxLength={20}
      randomSpaces={true}
    >
      用戶名稱
    </Scrimr>
  )
}
```

### 完整配置

```tsx
<Scrimr
  isLoading={true}
  text="載入中的文字"
  
  // 🎯 核心控制
  minLength={10}
  maxLength={30}
  randomSpaces={false}
  
  // ⚙️ 基本設定
  characterSet="alphanumeric"
  transitionEffect="decode"
  fontFamily="mono"
  
  // ⚡ 速度控制
  scrambleInterval={50}
  shimmerSpeed={3}
  
  // ✨ 外觀設定
  enableShimmer={true}
  shimmerColors={['#9333ea', '#ec4899', '#3b82f6']}
  
  className="text-lg font-bold"
>
  實際內容
</Scrimr>
```

### 專用組件

```tsx
import { ScrimrText, ScrimrButton, ScrimrCard } from 'scrimr'

// 文字組件
<ScrimrText as="h1" isLoading={loading}>標題</ScrimrText>

// 按鈕組件  
<ScrimrButton isLoading={loading}>點擊我</ScrimrButton>

// 卡片組件
<ScrimrCard 
  isLoading={loading}
  title="標題"
  description="描述內容"
/>
```

## 🔹 方式二：屬性 API

適合需要最小化改動的現有項目，直接在 HTML 元素上使用屬性。

### 基本使用

```html
<!-- 基本啟用 -->
<p data-scrimr="true">用戶名稱</p>

<!-- 自訂參數 -->
<h1 
  data-scrimr="true"
  data-scrimr-min-length="15"
  data-scrimr-max-length="25"
  data-scrimr-random-spaces="true"
>
  產品標題
</h1>
```

### JavaScript 初始化

```javascript
import { ScrimrAPI } from 'scrimr'

// 自動掃描並初始化所有 data-scrimr 元素
ScrimrAPI.init()

// 手動控制特定元素
ScrimrAPI.initElement('#my-element', {
  minLength: 10,
  maxLength: 20,
  randomSpaces: true
})

// 完成載入（停止 shimmer）
ScrimrAPI.complete('#my-element', '最終顯示的文字')

// 清除所有效果
ScrimrAPI.destroyAll()
```

### 完整屬性列表

```html
<p 
  data-scrimr="true"
  
  <!-- 🎯 核心控制 -->
  data-scrimr-min-length="10"
  data-scrimr-max-length="30"
  data-scrimr-random-spaces="false"
  
  <!-- ⚙️ 基本設定 -->
  data-scrimr-character-set="alphanumeric"
  data-scrimr-transition-effect="decode"
  data-scrimr-font-family="mono"
  
  <!-- ⚡ 速度控制 -->
  data-scrimr-scramble-interval="50"
  data-scrimr-shimmer-speed="3"
  
  <!-- ✨ 外觀設定 -->
  data-scrimr-enable-shimmer="true"
  data-scrimr-shimmer-colors='["#9333ea", "#ec4899"]'
>
  您的內容
</p>
```

### JSON 配置方式

```html
<!-- 使用 JSON 配置所有參數 -->
<div data-scrimr='{
  "minLength": 15,
  "maxLength": 25,
  "randomSpaces": true,
  "shimmerColors": ["#10b981", "#34d399"],
  "shimmerSpeed": 2
}'>
  內容
</div>
```

## 📋 實際使用場景

### 1. 用戶列表

```tsx
// 組件方式
{users.map(user => (
  <div key={user.id}>
    <Scrimr isLoading={!user.loaded} minLength={8} maxLength={15}>
      {user.name}
    </Scrimr>
  </div>
))}

// 屬性方式
<div class="user-list">
  <p data-scrimr="true" data-scrimr-min-length="8" data-scrimr-max-length="15">
    用戶名稱
  </p>
</div>
```

### 2. 商品卡片

```tsx
// 組件方式
<ScrimrCard
  isLoading={loading}
  title="產品名稱"
  description="產品描述內容"
  titleLength={20}
  descriptionLength={50}
/>

// 屬性方式  
<div class="product-card">
  <h3 data-scrimr="true" data-scrimr-max-length="20">產品名稱</h3>
  <p data-scrimr="true" data-scrimr-max-length="50" data-scrimr-random-spaces="true">
    產品描述
  </p>
</div>
```

### 3. 表單載入

```tsx
// 組件方式
<ScrimrButton isLoading={submitting}>
  {submitting ? '提交中...' : '提交'}
</ScrimrButton>

// 屬性方式
<button 
  data-scrimr="true"
  data-scrimr-min-length="6"
  data-scrimr-max-length="10"
  class="submit-btn"
>
  提交
</button>
```

## 🎨 最佳實踐

### 1. 長度設定
```tsx
// ✅ 好的設定
minLength={text.length - 5}  // 接近實際長度
maxLength={text.length + 5}

// ❌ 避免設定
minLength={1}    // 太短，不真實
maxLength={100}  // 太長，影響佈局
```

### 2. 隨機空格使用
```tsx
// ✅ 長文字使用隨機空格
<Scrimr randomSpaces={true} minLength={20} maxLength={40}>
  較長的描述文字內容
</Scrimr>

// ✅ 短文字不使用隨機空格  
<Scrimr randomSpaces={false} minLength={5} maxLength={10}>
  標題
</Scrimr>
```

### 3. 顏色配置
```tsx
// ✅ 品牌色系
shimmerColors={['#your-primary', '#your-secondary']}

// ✅ 語義化配置
shimmerColors={['#dc2626']} // 錯誤狀態
shimmerColors={['#10b981']} // 成功狀態
```

## 🔄 API 對比

| 特性 | 組件 API | 屬性 API |
|------|----------|----------|
| **適用場景** | React 項目 | 任何 HTML 項目 |
| **類型支援** | ✅ 完整 TypeScript | ⚠️ 需手動定義 |
| **整合難度** | 中等 | 簡單 |
| **性能** | 優秀 | 良好 |
| **SSR 支援** | ✅ 原生支援 | ⚠️ 需配置 |

選擇建議：
- **新 React 項目**：使用組件 API
- **現有項目改造**：使用屬性 API  
- **混合項目**：兩者皆可使用

## 🚨 注意事項

1. **屬性 API 需要手動初始化**：記得呼叫 `ScrimrAPI.init()`
2. **避免重複初始化**：同一個元素不要重複初始化
3. **性能考慮**：大量元素時建議分批處理
4. **清理資源**：組件卸載時記得呼叫 `destroy` 方法