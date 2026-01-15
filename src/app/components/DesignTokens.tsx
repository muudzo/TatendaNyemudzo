export function DesignTokens({ onBack }: { onBack: () => void }) {
  return (
    <div className="w-full min-h-screen bg-zinc-950 text-white p-12 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="mb-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded text-sm transition-colors"
          >
            ← Back to OS Selector
          </button>
          <h1 className="text-5xl font-bold mb-4">Legacy OS Design Tokens</h1>
          <p className="text-zinc-400 text-lg mb-2">
            Forensic documentation of Windows Vista Aero and Mac OS X Aqua visual specifications
          </p>
          <p className="text-amber-400 text-sm italic">
            This is a portfolio hidden inside an OS, not a portfolio about an OS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* WINDOWS VISTA AERO */}
          <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Windows Vista Aero</h2>
            
            {/* Glass Properties */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Glass Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-12 rounded"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0.2) 100%)',
                      border: '2px solid rgba(255,255,255,0.3)',
                    }}
                  />
                  <div>
                    <div className="font-mono text-zinc-100">Glass Base</div>
                    <div className="text-zinc-500">40% → 10% → 20% opacity gradient</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-20 h-12 rounded bg-black/40 backdrop-blur-none" />
                  <div>
                    <div className="font-mono text-zinc-100">Background Tint</div>
                    <div className="text-zinc-500">rgba(0, 0, 0, 0.4) — Heavy, visible</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-12 rounded border-2"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                  />
                  <div>
                    <div className="font-mono text-zinc-100">Border</div>
                    <div className="text-zinc-500">2-3px solid, rgba(255, 255, 255, 0.3)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shadows & Glows */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Shadows & Glows</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Window Drop Shadow</div>
                  <div className="text-zinc-500">0 8px 32px rgba(0, 0, 0, 0.8)</div>
                  <div className="text-zinc-500">Sharp, dark, dramatic falloff</div>
                </div>
                
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Aero Glow (Buttons)</div>
                  <div className="text-zinc-500">0 0 20px rgba(0, 174, 239, 0.9)</div>
                  <div className="text-zinc-500">Strong blue emission, visible at distance</div>
                </div>

                <div>
                  <div className="font-mono text-zinc-100 mb-1">Inner Shadow</div>
                  <div className="text-zinc-500">inset -10px -10px 30px rgba(0, 0, 0, 0.4)</div>
                  <div className="text-zinc-500">Creates depth in glass surfaces</div>
                </div>
              </div>
            </div>

            {/* Gradients */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Gradients</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-mono text-zinc-100 mb-2">Title Bar</div>
                  <div
                    className="w-full h-8 rounded mb-1"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(0, 174, 239, 0.9), rgba(0, 120, 212, 0.7))',
                    }}
                  />
                  <div className="text-zinc-500">Strong, obvious color stops</div>
                </div>

                <div>
                  <div className="font-mono text-zinc-100 mb-2">Button Hover</div>
                  <div
                    className="w-full h-8 rounded mb-1"
                    style={{
                      background: 'linear-gradient(to bottom, #e8f4ff, #00a4ef)',
                    }}
                  />
                  <div className="text-zinc-500">Light to saturated blue</div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Signature Colors</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#00a4ef' }} />
                  <div className="font-mono text-zinc-100">#00a4ef</div>
                  <div className="text-zinc-500">Primary Blue</div>
                </div>

                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#429321' }} />
                  <div className="font-mono text-zinc-100">#429321</div>
                  <div className="text-zinc-500">Progress Green</div>
                </div>

                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#f25022' }} />
                  <div className="font-mono text-zinc-100">#f25022</div>
                  <div className="text-zinc-500">Flag Red</div>
                </div>

                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#ffb900' }} />
                  <div className="font-mono text-zinc-100">#ffb900</div>
                  <div className="text-zinc-500">Flag Yellow</div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Typography</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Primary Font</div>
                  <div className="text-zinc-500" style={{ fontFamily: '"Segoe UI", sans-serif' }}>
                    Segoe UI (Regular, 400 weight)
                  </div>
                </div>
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Letter Spacing</div>
                  <div className="text-zinc-500">-0.02em (tight, not loose)</div>
                </div>
              </div>
            </div>
          </div>

          {/* MAC OS X AQUA */}
          <div className="bg-zinc-900 rounded-lg p-8 border border-zinc-800">
            <h2 className="text-3xl font-bold mb-6 text-blue-300">Mac OS X Aqua</h2>
            
            {/* Aqua Properties */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Aqua Glass Properties</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-12 rounded"
                    style={{
                      background: 'linear-gradient(to bottom, #f0f9ff, #7dd3fc)',
                    }}
                  />
                  <div>
                    <div className="font-mono text-zinc-100">Aqua Button Gradient</div>
                    <div className="text-zinc-500">Light → saturated, smooth blend</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-12 rounded"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0))',
                    }}
                  />
                  <div>
                    <div className="font-mono text-zinc-100">Internal Highlight</div>
                    <div className="text-zinc-500">Top highlight, 60-90% opacity</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-12 rounded border"
                    style={{ borderColor: 'rgba(0, 0, 0, 0.2)' }}
                  />
                  <div>
                    <div className="font-mono text-zinc-100">Border (Bevel)</div>
                    <div className="text-zinc-500">1px solid, subtle, dark edges</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shadows */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Shadows</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Window Drop Shadow</div>
                  <div className="text-zinc-500">0 4px 24px rgba(0, 0, 0, 0.5)</div>
                  <div className="text-zinc-500">Softer than Vista, more diffused</div>
                </div>
                
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Button Shadow</div>
                  <div className="text-zinc-500">0 2px 6px rgba(0, 0, 0, 0.3)</div>
                  <div className="text-zinc-500">Subtle depth cue</div>
                </div>

                <div>
                  <div className="font-mono text-zinc-100 mb-1">Glow (Hover)</div>
                  <div className="text-zinc-500">0 0 20px rgba(147, 197, 253, 0.6)</div>
                  <div className="text-zinc-500">Elastic, soft blue emission</div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Signature Colors</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#bae6fd' }} />
                  <div className="font-mono text-zinc-100">#bae6fd</div>
                  <div className="text-zinc-500">Aqua Blue (mid)</div>
                </div>

                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#7dd3fc' }} />
                  <div className="font-mono text-zinc-100">#7dd3fc</div>
                  <div className="text-zinc-500">Aqua Blue (deep)</div>
                </div>

                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#f0f9ff' }} />
                  <div className="font-mono text-zinc-100">#f0f9ff</div>
                  <div className="text-zinc-500">Highlight</div>
                </div>

                <div>
                  <div className="w-full h-12 rounded mb-2" style={{ background: '#e8e8e8' }} />
                  <div className="font-mono text-zinc-100">#e8e8e8</div>
                  <div className="text-zinc-500">Boot Screen Gray</div>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">Typography</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Primary Font</div>
                  <div className="text-zinc-500" style={{ fontFamily: '"Lucida Grande", sans-serif' }}>
                    Lucida Grande (Regular, 400 weight)
                  </div>
                </div>
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Letter Spacing</div>
                  <div className="text-zinc-500">0.01em (slightly open)</div>
                </div>
              </div>
            </div>

            {/* Dock & Window Chrome */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-zinc-300">UI Elements</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Dock Magnification</div>
                  <div className="text-zinc-500">Parabolic curve, 2.5x max scale</div>
                </div>
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Window Title Bar</div>
                  <div className="text-zinc-500">Brushed metal or pinstripe gradient</div>
                </div>
                <div>
                  <div className="font-mono text-zinc-100 mb-1">Spinner</div>
                  <div className="text-zinc-500">12 radial segments, 6px stroke, sequential fade</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Notes */}
        <div className="mt-12 bg-zinc-900 rounded-lg p-8 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6 text-amber-400">Historical Accuracy Notes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-400">Vista ≠ Windows 7</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>• Vista glass is <strong className="text-white">heavier, louder</strong></li>
                <li>• Borders are <strong className="text-white">thicker</strong> (2-3px vs 1px)</li>
                <li>• Shadows are <strong className="text-white">sharper, darker</strong></li>
                <li>• Gradients are <strong className="text-white">more obvious</strong></li>
                <li>• Orb has <strong className="text-white">visible refraction</strong></li>
                <li>• UI feels <strong className="text-white">overdesigned</strong> by 2026 standards</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">Aqua Design Philosophy</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>• <strong className="text-white">Fluidity</strong> over drama</li>
                <li>• <strong className="text-white">Elastic motion</strong>, not harsh</li>
                <li>• <strong className="text-white">Soft glows</strong>, warm tones</li>
                <li>• <strong className="text-white">Beveled edges</strong> on all surfaces</li>
                <li>• <strong className="text-white">Vertical lift</strong> feeling on hover</li>
                <li>Spinner has <strong className="text-white">correct thickness</strong> (6px)</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-800">
            <h3 className="text-xl font-semibold mb-3 text-zinc-300">What to Avoid (Modern Mistakes)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-zinc-400 text-sm">
              <div className="bg-red-950/30 p-3 rounded border border-red-900/50">
                <div className="font-mono text-red-400 mb-1">❌ Backdrop blur</div>
                <div className="text-xs">Modern CSS effect, didn't exist</div>
              </div>
              <div className="bg-red-950/30 p-3 rounded border border-red-900/50">
                <div className="font-mono text-red-400 mb-1">❌ Flat icons</div>
                <div className="text-xs">Everything had dimension</div>
              </div>
              <div className="bg-red-950/30 p-3 rounded border border-red-900/50">
                <div className="font-mono text-red-400 mb-1">❌ rounded-2xl</div>
                <div className="text-xs">Corners were subtle</div>
              </div>
              <div className="bg-red-950/30 p-3 rounded border border-red-900/50">
                <div className="font-mono text-red-400 mb-1">❌ Minimalism</div>
                <div className="text-xs">These UIs were maximal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quality Bar */}
        <div className="mt-8 bg-gradient-to-r from-blue-950 to-cyan-950 rounded-lg p-8 border border-blue-800">
          <h2 className="text-2xl font-bold mb-4 text-white">Quality Bar</h2>
          <p className="text-lg text-blue-100 italic">
            "If a former Vista user doesn't immediately feel: <strong>'Oh wow… this is Vista.'</strong> — the design is not finished."
          </p>
          <p className="mt-4 text-sm text-blue-300">
            This is not an inspired redesign. This is forensic recreation constrained only by the browser.
          </p>
        </div>
      </div>
    </div>
  );
}