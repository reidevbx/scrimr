import { useState } from 'react'
import { 
  Scrimr, 
  ScrimrText, 
  ScrimrButton, 
  ScrimrCard,
  ScrimrAPI,
  type TransitionEffect,
  type CharacterSet,
  type FontFamily,
  type LengthMode
} from 'scrimr'

// Interactive Playground Component
function InteractivePlayground() {
  // Core state - only 3 main controls
  const [isLoading, setIsLoading] = useState(true)
  const [text, setText] = useState('Hello, this is Scrimr!')
  const [minLength, setMinLength] = useState(10)
  const [maxLength, setMaxLength] = useState(30)
  const [randomSpaces, setRandomSpaces] = useState(false)
  
  // Length mode controls
  const [lengthMode, setLengthMode] = useState<LengthMode>('content')
  const [lengthChangeInterval, setLengthChangeInterval] = useState(150)
  
  // Basic controls
  const [characterSet, setCharacterSet] = useState<CharacterSet>('alphanumeric')
  const [transitionEffect, setTransitionEffect] = useState<TransitionEffect>('decode')
  const [enableShimmer, setEnableShimmer] = useState(true)
  const [shimmerSpeed, setShimmerSpeed] = useState(3)
  const [scrambleInterval, setScrambleInterval] = useState(50)
  const [fontFamily, setFontFamily] = useState<FontFamily>('mono')
  
  // Shimmer colors - support 2-3 colors
  const [gradientType, setGradientType] = useState<'single' | 'two' | 'three'>('single')
  const [shimmerColor1, setShimmerColor1] = useState('#9333ea')
  const [shimmerColor2, setShimmerColor2] = useState('#ec4899')
  const [shimmerColor3, setShimmerColor3] = useState('#3b82f6')
  
  // Calculate shimmer colors array
  const shimmerColors = gradientType === 'single' ? [shimmerColor1] :
                       gradientType === 'two' ? [shimmerColor1, shimmerColor2] :
                       [shimmerColor1, shimmerColor2, shimmerColor3]

  const characterSets: CharacterSet[] = ['letters', 'numbers', 'symbols', 'alphanumeric', 'all']
  const transitionEffects: TransitionEffect[] = ['instant', 'fade', 'typewriter', 'decode']
  const fontFamilies: FontFamily[] = ['mono', 'sans', 'serif', 'system']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Scrimr Interactive Playground</h1>
        <p className="text-center text-gray-600 mb-8">簡單的 shimmer 載入效果 - 只需3個參數</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
              <h2 className="text-xl font-bold mb-6">預覽效果</h2>
              
              {/* Main Preview */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">主要預覽</p>
                  <div className="text-2xl">
                    <Scrimr
                      isLoading={isLoading}
                      text={text}
                      minLength={minLength}
                      maxLength={maxLength}
                      randomSpaces={randomSpaces}
                      lengthMode={lengthMode}
                      lengthChangeInterval={lengthChangeInterval}
                      characterSet={characterSet}
                      transitionEffect={transitionEffect}
                      enableShimmer={enableShimmer}
                      shimmerColors={shimmerColors}
                      shimmerSpeed={shimmerSpeed}
                      scrambleInterval={scrambleInterval}
                      fontFamily={fontFamily}
                      className="font-bold"
                    >
                      {text}
                    </Scrimr>
                  </div>
                </div>
              </div>

              {/* Attribute API Demo */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-bold text-blue-800 mb-2">🆕 屬性 API 示範</h3>
                <p className="text-xs text-blue-600 mb-3">使用 data-scrimr 屬性直接在 HTML 元素上啟用效果</p>
                <div className="space-y-2">
                  <p 
                    data-scrimr="true"
                    data-scrimr-min-length={minLength}
                    data-scrimr-max-length={maxLength}
                    data-scrimr-random-spaces={randomSpaces}
                    data-scrimr-length-mode={lengthMode}
                    data-scrimr-length-change-interval={lengthChangeInterval}
                    data-scrimr-character-set={characterSet}
                    data-scrimr-shimmer-colors={JSON.stringify(shimmerColors)}
                    data-scrimr-shimmer-speed={shimmerSpeed}
                    data-scrimr-scramble-interval={scrambleInterval}
                    data-scrimr-font-family={fontFamily}
                    className="font-medium text-blue-800"
                  >
                    屬性 API 測試文字
                  </p>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded block">
                    {"<p data-scrimr=\"true\" data-scrimr-min-length=\"10\">文字</p>"}
                  </code>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => ScrimrAPI.init()}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded"
                  >
                    重新初始化
                  </button>
                  <button
                    onClick={() => ScrimrAPI.destroyAll()}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                  >
                    清除所有
                  </button>
                </div>
              </div>

              {/* Component Previews */}
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">ScrimrText 組件</p>
                  <ScrimrText
                    as="h3"
                    isLoading={isLoading}
                    text={text}
                    minLength={minLength}
                    maxLength={maxLength}
                    randomSpaces={randomSpaces}
                    characterSet={characterSet}
                    transitionEffect={transitionEffect}
                    enableShimmer={enableShimmer}
                    shimmerColors={shimmerColors}
                    shimmerSpeed={shimmerSpeed}
                    scrambleInterval={scrambleInterval}
                    fontFamily={fontFamily}
                    className="text-xl"
                  >
                    {text}
                  </ScrimrText>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">ScrimrButton 組件</p>
                  <ScrimrButton
                    isLoading={isLoading}
                    text="Click Me!"
                    minLength={8}
                    maxLength={15}
                    randomSpaces={randomSpaces}
                    characterSet={characterSet}
                    transitionEffect={transitionEffect}
                    enableShimmer={enableShimmer}
                    shimmerColors={shimmerColors}
                    shimmerSpeed={shimmerSpeed}
                    scrambleInterval={scrambleInterval}
                    fontFamily={fontFamily}
                    buttonClassName="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Click Me!
                  </ScrimrButton>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">ScrimrCard 組件</p>
                  <ScrimrCard
                    isLoading={isLoading}
                    title="Card Title"
                    description="This is a card description."
                    titleLength={15}
                    descriptionLength={35}
                    characterSet={characterSet}
                    transitionEffect={transitionEffect}
                    enableShimmer={enableShimmer}
                    shimmerColors={shimmerColors}
                    shimmerSpeed={shimmerSpeed}
                    scrambleInterval={scrambleInterval}
                    fontFamily={fontFamily}
                  />
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
                    text（顯示文字）
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="留空則使用長度範圍控制"
                  />
                  <p className="text-xs text-gray-500 mt-1">有內容時使用內容長度，無內容時使用下面的長度範圍</p>
                </div>

                {/* Core Controls - Only 3 main settings */}
                <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h3 className="text-sm font-bold text-blue-800 mb-4">🎯 核心控制（3個參數解決所有問題）</h3>
                  
                  {/* Length Mode */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">字數模式</label>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="lengthMode"
                          value="content"
                          checked={lengthMode === 'content'}
                          onChange={(e) => setLengthMode(e.target.value as LengthMode)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">固定字數（使用內容長度）</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="lengthMode"
                          value="dynamic"
                          checked={lengthMode === 'dynamic'}
                          onChange={(e) => setLengthMode(e.target.value as LengthMode)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm">動態字數（隨機變化）</span>
                      </label>
                    </div>
                  </div>
                  
                  {/* Dynamic Mode Controls */}
                  {lengthMode === 'dynamic' && (
                    <>
                      {/* Length Change Interval */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          lengthChangeInterval（字數變化間隔）: {lengthChangeInterval}ms
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="500"
                          step="10"
                          value={lengthChangeInterval}
                          onChange={(e) => setLengthChangeInterval(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Min Length - Only show in dynamic mode or when minLength < maxLength */}
                  {lengthMode === 'dynamic' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        minLength（最少字數）: {minLength}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={minLength}
                        onChange={(e) => setMinLength(Number(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">動態模式下字數變化的最小值</p>
                    </div>
                  )}

                  {/* Max Length */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      {lengthMode === 'content' ? 'maxLength（備用字數）' : 'maxLength（最大字數）'}: {maxLength}
                    </label>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={maxLength}
                      onChange={(e) => setMaxLength(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {lengthMode === 'content' 
                        ? '固定模式：當內容為空時使用此長度'
                        : '動態模式：字數變化的最大值'
                      }
                    </p>
                  </div>

                  {/* Random Spaces */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={randomSpaces}
                        onChange={(e) => setRandomSpaces(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium">randomSpaces（隨機空格）</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1">模擬真實文字的空格分布</p>
                  </div>
                </div>

                {/* Basic Settings */}
                <div>
                  <h3 className="text-sm font-bold mb-3">⚙️ 基本設置</h3>
                  
                  {/* Character Set */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      characterSet（字元集）
                    </label>
                    <select
                      value={characterSet}
                      onChange={(e) => setCharacterSet(e.target.value as CharacterSet)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {characterSets.map(set => (
                        <option key={set} value={set}>{set}</option>
                      ))}
                    </select>
                  </div>

                  {/* Transition Effect */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      transitionEffect（過渡效果）
                    </label>
                    <select
                      value={transitionEffect}
                      onChange={(e) => setTransitionEffect(e.target.value as TransitionEffect)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {transitionEffects.map(effect => (
                        <option key={effect} value={effect}>{effect}</option>
                      ))}
                    </select>
                  </div>

                  {/* Font Family */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      fontFamily（字體）
                    </label>
                    <select
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value as FontFamily)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {fontFamilies.map(font => (
                        <option key={font} value={font}>
                          {font === 'mono' ? 'Monospace (等寬)' : 
                           font === 'sans' ? 'Sans-serif (無襯線)' :
                           font === 'serif' ? 'Serif (襯線)' : 
                           'System (系統預設)'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Speed Controls */}
                <div>
                  <h3 className="text-sm font-bold mb-3">⚡ 速度控制</h3>
                  
                  {/* Scramble Speed */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      scrambleInterval（亂碼速度）: {scrambleInterval}ms
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="10"
                      value={scrambleInterval}
                      onChange={(e) => setScrambleInterval(Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">數值越小速度越快</p>
                  </div>
                </div>

                {/* Shimmer Settings */}
                <div>
                  <h3 className="text-sm font-bold mb-3">✨ Shimmer 設置</h3>
                  
                  {/* Enable Shimmer */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={enableShimmer}
                        onChange={(e) => setEnableShimmer(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium">enableShimmer（啟用閃光效果）</span>
                    </label>
                  </div>

                  {enableShimmer && (
                    <>
                      {/* Gradient Type */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          漸層類型
                        </label>
                        <select
                          value={gradientType}
                          onChange={(e) => setGradientType(e.target.value as 'single' | 'two' | 'three')}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="single">單色</option>
                          <option value="two">雙色漸層</option>
                          <option value="three">三色漸層</option>
                        </select>
                      </div>

                      {/* Color 1 */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          顏色 1
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={shimmerColor1}
                            onChange={(e) => setShimmerColor1(e.target.value)}
                            className="w-12 h-8 border rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={shimmerColor1}
                            onChange={(e) => setShimmerColor1(e.target.value)}
                            className="flex-1 px-2 py-1 border rounded text-sm"
                          />
                        </div>
                      </div>

                      {/* Color 2 */}
                      {(gradientType === 'two' || gradientType === 'three') && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">
                            顏色 2
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={shimmerColor2}
                              onChange={(e) => setShimmerColor2(e.target.value)}
                              className="w-12 h-8 border rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={shimmerColor2}
                              onChange={(e) => setShimmerColor2(e.target.value)}
                              className="flex-1 px-2 py-1 border rounded text-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Color 3 */}
                      {gradientType === 'three' && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium mb-2">
                            顏色 3
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={shimmerColor3}
                              onChange={(e) => setShimmerColor3(e.target.value)}
                              className="w-12 h-8 border rounded cursor-pointer"
                            />
                            <input
                              type="text"
                              value={shimmerColor3}
                              onChange={(e) => setShimmerColor3(e.target.value)}
                              className="flex-1 px-2 py-1 border rounded text-sm"
                            />
                          </div>
                        </div>
                      )}

                      {/* Shimmer Speed */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          shimmerSpeed（閃爍速度）: {shimmerSpeed}s
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="10"
                          step="0.1"
                          value={shimmerSpeed}
                          onChange={(e) => setShimmerSpeed(Number(e.target.value))}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">數值越小速度越快</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Code Preview */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium mb-2">程式碼預覽</h3>
                  
                  {/* Component API */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-600 mb-2">🔸 組件 API</h4>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      <code>{`<Scrimr
  isLoading={${isLoading}}
  text="${text}"
  minLength={${minLength}}
  maxLength={${maxLength}}
  randomSpaces={${randomSpaces}}
  characterSet="${characterSet}"
  transitionEffect="${transitionEffect}"
  enableShimmer={${enableShimmer}}
  shimmerColors={${JSON.stringify(shimmerColors)}}
  shimmerSpeed={${shimmerSpeed}}
  scrambleInterval={${scrambleInterval}}
  fontFamily="${fontFamily}"
>
  {children}
</Scrimr>`}</code>
                    </pre>
                  </div>

                  {/* Attribute API */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">🔸 屬性 API</h4>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      <code>{`<p 
  data-scrimr="true"
  data-scrimr-min-length="${minLength}"
  data-scrimr-max-length="${maxLength}"
  data-scrimr-random-spaces="${randomSpaces}"
  data-scrimr-character-set="${characterSet}"
  data-scrimr-shimmer-colors='${JSON.stringify(shimmerColors)}'
  data-scrimr-shimmer-speed="${shimmerSpeed}"
  data-scrimr-scramble-interval="${scrambleInterval}"
  data-scrimr-font-family="${fontFamily}"
>
  您的內容
</p>

// JavaScript 初始化
import { ScrimrAPI } from 'scrimr'
ScrimrAPI.init() // 自動掃描並初始化`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function App() {
  return <InteractivePlayground />
}