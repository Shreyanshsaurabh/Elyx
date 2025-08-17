'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Calendar, Heart, FileText, Download } from 'lucide-react'

interface TimelineData {
  id: number
  month: string
  memberConcern: string
  decisionByElyx: string
  reasonForDecision: string
}

export default function Home() {
  const [timelineData, setTimelineData] = useState<TimelineData[]>([])
  const [selectedItem, setSelectedItem] = useState<TimelineData | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      parseCSV(text)
    }
    reader.readAsText(file)
  }

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim())
    const data: TimelineData[] = []
    
    for (let i = 1; i < lines.length; i++) {
      const columns = lines[i].split('|').map(col => col.trim())
      if (columns.length >= 4) {
        data.push({
          id: i,
          month: columns[1],
          memberConcern: columns[2],
          decisionByElyx: columns[3],
          reasonForDecision: columns[4]
        })
      }
    }
    
    setTimelineData(data)
    if (data.length > 0) {
      setSelectedItem(data[0])
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-blue-900">Health Timeline Visualizer</h1>
          </div>
          <p className="text-blue-700 text-lg">Upload your healthcare timeline CSV to visualize your journey</p>
        </header>

        {!timelineData.length ? (
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-900 flex items-center justify-center gap-2">
                  <Upload className="h-6 w-6" />
                  Upload Your Timeline Data
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-blue-700 mb-6">
                  Upload a CSV file with your healthcare timeline data to get started
                </p>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="cursor-pointer flex flex-col items-center gap-4"
                  >
                    <FileText className="h-12 w-12 text-blue-500" />
                    <span className="text-blue-700 font-medium">Choose CSV file</span>
                    <span className="text-blue-500 text-sm">or drag and drop</span>
                  </label>
                </div>
                <div className="mt-6 text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">Expected CSV format:</h3>
                  <pre className="bg-blue-50 p-3 rounded text-sm text-blue-700 overflow-x-auto">
{`| Month | Member Concern | Decision by Elyx | Reason for Decision |
| Jan | Concern details | Decision details | Reason details |`}
                  </pre>
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = '/elyx_member_timeline.csv'
                        link.download = 'elyx_member_timeline.csv'
                        link.click()
                      }}
                      variant="outline"
                      className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Sample CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  Timeline Overview
                </h2>
                <Button
                  onClick={() => {
                    setTimelineData([])
                    setSelectedItem(null)
                  }}
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  Upload New File
                </Button>
              </div>

              <div
                ref={sliderRef}
                className="timeline-slider flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {timelineData.map((item) => (
                  <Card
                    key={item.id}
                    className={`flex-shrink-0 w-80 cursor-pointer transition-all hover:shadow-lg ${
                      selectedItem?.id === item.id
                        ? 'ring-2 ring-blue-500 bg-blue-50'
                        : 'hover:bg-blue-50'
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {item.month}
                        </span>
                        <span className="text-xs text-blue-500">#{item.id}</span>
                      </div>
                      <CardTitle className="text-lg text-blue-900 line-clamp-2">
                        {item.memberConcern}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-blue-600 font-medium mb-1">Decision:</p>
                          <p className="text-sm text-blue-800 line-clamp-3">
                            {item.decisionByElyx}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-medium mb-1">Reason:</p>
                          <p className="text-sm text-blue-700 line-clamp-2">
                            {item.reasonForDecision}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {selectedItem && (
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-full border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-blue-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Detailed View - {selectedItem.month}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Member Concern</h3>
                        <p className="text-blue-800 leading-relaxed">
                          {selectedItem.memberConcern}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Decision by Elyx</h3>
                        <p className="text-blue-800 leading-relaxed">
                          {selectedItem.decisionByElyx}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">Reason for Decision</h3>
                        <p className="text-blue-700 leading-relaxed">
                          {selectedItem.reasonForDecision}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="border-blue-200 h-full">
                    <CardHeader>
                      <CardTitle className="text-blue-900">Timeline Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">
                          {timelineData.length}
                        </div>
                        <div className="text-sm text-blue-700">Total Entries</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-700">Current Entry:</span>
                          <span className="font-medium text-blue-900">
                            {selectedItem.id} of {timelineData.length}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-700">Month:</span>
                          <span className="font-medium text-blue-900">{selectedItem.month}</span>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-blue-200">
                        <p className="text-xs text-blue-600 text-center">
                          Scroll horizontally to browse all timeline entries
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}