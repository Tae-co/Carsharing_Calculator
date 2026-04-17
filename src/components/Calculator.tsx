import { useState } from 'react'
import type { ServiceType } from '../types'
import { TurukaCalculator } from './TurukaCalculator'
import { SocarCalculator } from './SocarCalculator'

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<ServiceType>('turuka')

  return (
    <div className="space-y-5">
      <div role="tablist" className="bg-[#141414] border border-neutral-800 rounded-lg p-1 inline-flex">
        <button
          role="tab"
          aria-selected={activeTab === 'turuka'}
          onClick={() => setActiveTab('turuka')}
          className={
            activeTab === 'turuka'
              ? 'bg-white text-black rounded-md px-5 py-1.5 text-sm font-medium transition-colors'
              : 'text-neutral-400 hover:text-neutral-200 px-5 py-1.5 text-sm cursor-pointer transition-colors'
          }
        >
          투루카
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'socar'}
          onClick={() => setActiveTab('socar')}
          className={
            activeTab === 'socar'
              ? 'bg-white text-black rounded-md px-5 py-1.5 text-sm font-medium transition-colors'
              : 'text-neutral-400 hover:text-neutral-200 px-5 py-1.5 text-sm cursor-pointer transition-colors'
          }
        >
          쏘카
        </button>
      </div>

      {activeTab === 'turuka' ? <TurukaCalculator /> : <SocarCalculator />}
    </div>
  )
}
