import { useState } from 'react'
import { Scrimr } from 'scrimr'

function SimpleDemo() {
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState('Hello, this is the new simplified Scrimr!')
  const [length, setLength] = useState(20)
  const [speed, setSpeed] = useState(100)
  const [customChars, setCustomChars] = useState('')
  const [useCustomChars, setUseCustomChars] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2">Scrimr v2.0</h1>
        <p className="text-center text-gray-600 mb-8">簡化版文字shimmer組件 - 輕量級skeleton替代方案</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-bold mb-6">預覽效果</h2>
              
              {/* Main Preview */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
                <div className="text-center w-full max-w-md">
                  <p className="text-sm text-gray-500 mb-4">主要預覽</p>
                  <div className="text-2xl font-bold w-full">
                    <Scrimr
                      isLoading={isLoading}
                      length={length}
                      speed={speed}
                      {...(useCustomChars && customChars ? { chars: customChars } : {})}
                      className="text-blue-600"
                    >
                      {text}
                    </Scrimr>
                  </div>
                </div>
              </div>

              {/* Multiple Examples */}
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">標題範例</p>
                  <h3 className="text-xl font-bold">
                    <Scrimr
                      isLoading={isLoading}
                      length={15}
                      speed={120}
                      className="text-gray-800"
                    >
                      這是一個標題
                    </Scrimr>
                  </h3>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">段落範例</p>
                  <p className="text-gray-700 leading-relaxed">
                    <Scrimr
                      isLoading={isLoading}
                      length={50}
                      speed={80}
                      className="text-gray-600"
                    >
                      這是一段較長的文字內容，用來展示Scrimr在段落中的效果。新版本更加簡潔高效。
                    </Scrimr>
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">單行截斷範例 <code className="text-xs bg-gray-100 px-1 rounded">父層 w-full</code></p>
                  <div className="p-2 bg-gray-50 rounded w-full">
                    <Scrimr
                      isLoading={isLoading}
                      length={60}
                      speed={100}
                      className="text-gray-700"
                    >
                      這是一段很長的文字內容，會被截斷並顯示省略號，展示 Scrimr 內建 truncate 的效果
                    </Scrimr>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 父層容器設定寬度，Scrimr 內建 <code className="bg-gray-100 px-1 rounded">truncate</code> 自動截斷
                  </p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">按鈕範例</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Scrimr
                      isLoading={isLoading}
                      length={8}
                      speed={100}
                      className="text-white"
                    >
                      點擊我
                    </Scrimr>
                  </button>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">數字範例 <code className="text-xs bg-gray-100 px-1 rounded">chars="0123456789"</code></p>
                  <div className="text-xl font-mono">
                    <Scrimr
                      isLoading={isLoading}
                      length={6}
                      speed={150}
                      chars="0123456789"
                      className="text-green-600 font-bold"
                    >
                      $1,234.56
                    </Scrimr>
                  </div>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setIsLoading(true)
                    setTimeout(() => setIsLoading(false), 2000)
                  }}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  重新載入 (2秒)
                </button>
                <button
                  onClick={() => setIsLoading(!isLoading)}
                  className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {isLoading ? '停止載入' : '開始載入'}
                </button>
              </div>
            </div>
          </div>

          {/* Control Panel */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold mb-6">控制面板</h2>
              
              <div className="space-y-6">
                {/* Loading State */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLoading}
                      onChange={(e) => setIsLoading(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm font-medium">isLoading（載入狀態）</span>
                  </label>
                </div>

                {/* Text Content */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    顯示文字 (children)
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="輸入要顯示的文字"
                  />
                  <p className="text-xs text-gray-500 mt-1">載入完成後顯示的內容</p>
                </div>

                {/* Core Controls */}
                <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="text-sm font-bold text-blue-800 mb-4">🎯 核心參數</h3>
                  
                  {/* Length */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      length（文字長度）: {length}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={length}
                      onChange={(e) => setLength(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">預設 20 個字符</p>
                  </div>

                  {/* Speed */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      speed（更新速度）: {speed}ms
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="500"
                      step="10"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">預設 100ms，數值越小越快</p>
                  </div>

                  {/* Character Set */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      chars（字符集）
                    </label>
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-sm text-green-800 font-medium mb-2">✨ 預設模式（推薦）</p>
                        <p className="text-xs text-green-700">自動使用英文字母 + 數字 + 符號混合，無需設定任何參數</p>
                        <div className="mt-2 text-xs bg-green-100 p-2 rounded font-mono">
                          &lt;Scrimr isLoading={`{true}`}&gt;Hello&lt;/Scrimr&gt;
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={useCustomChars}
                            onChange={(e) => setUseCustomChars(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm font-medium">自定義字符集</span>
                        </label>
                      </div>
                      
                      {useCustomChars && (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={customChars}
                            onChange={(e) => setCustomChars(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='例如: "0123456789" 只顯示數字'
                          />
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => setCustomChars('0123456789')}
                              className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                            >
                              純數字
                            </button>
                            <button
                              onClick={() => setCustomChars('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
                              className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                            >
                              大寫字母
                            </button>
                            <button
                              onClick={() => setCustomChars('!@#$%^&*()')}
                              className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                            >
                              符號
                            </button>
                            <button
                              onClick={() => setCustomChars('LOADING.')}
                              className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded"
                            >
                              特定字符
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        💡 預設混合模式已經適合大部分情況，只有特殊需求才需要自訂
                      </p>
                    </div>
                  </div>
                </div>

                {/* Current Code */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium mb-2">程式碼預覽</h3>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                    <code>{`<Scrimr
  isLoading={${isLoading}}
  length={${length}}
  speed={${speed}}${useCustomChars && customChars ? `\n  chars="${customChars}"` : ''}
  className="text-blue-600"
>
  ${text}
</Scrimr>`}</code>
                  </pre>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>Scrimr v2.0 - 簡化版文字 shimmer 組件</p>
          <p>輕量級替代方案，告別複雜的 skeleton screens</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return <SimpleDemo />
}