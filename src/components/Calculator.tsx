import { useState } from 'react'
import type { ServiceType } from '../types'
import { TurukaCalculator } from './TurukaCalculator'
import { SocarCalculator } from './SocarCalculator'
import { ComparisonCalculator } from './ComparisonCalculator'

type TabType = ServiceType | 'compare'

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<TabType>('turuka')

  const tabs: { id: TabType; label: string }[] = [
    { id: 'turuka', label: '투루카' },
    { id: 'socar', label: '쏘카' },
    { id: 'compare', label: '비교' },
  ]

  return (
    <div className="space-y-5">
      <div role="tablist" className="bg-gray-100 border border-gray-200 rounded-lg p-1 inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm rounded-md px-5 py-1.5 text-sm font-medium transition-colors'
                : 'text-gray-500 hover:text-gray-700 px-5 py-1.5 text-sm cursor-pointer transition-colors'
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id="tabpanel-turuka"
        role="tabpanel"
        aria-labelledby="tab-turuka"
        className={activeTab === 'turuka' ? '' : 'hidden'}
      >
        <TurukaCalculator />
      </div>
      <div
        id="tabpanel-socar"
        role="tabpanel"
        aria-labelledby="tab-socar"
        className={activeTab === 'socar' ? '' : 'hidden'}
      >
        <SocarCalculator />
      </div>
      <div
        id="tabpanel-compare"
        role="tabpanel"
        aria-labelledby="tab-compare"
        className={activeTab === 'compare' ? '' : 'hidden'}
      >
        <ComparisonCalculator />
      </div>
    </div>
  )
}
