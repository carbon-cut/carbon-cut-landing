import React from 'react'

type Props = {
    carbonFootprint: number;
    averageFootprint: number
}

function ResultCard({carbonFootprint, averageFootprint}: Props) {
  return (
    <div className="mb-20">
            <div className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-light text-foreground mb-2 tracking-tight">
                Your Carbon Footprint
              </h1>
              <p className="text-base text-gray-500 font-light">Based on your lifestyle</p>
            </div>

            <div className="bg-gradient-to-br from-white via-[#F9FFFE] to-white rounded-2xl border border-[#E0F2F1] p-12 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-3 mb-6">
                  <span className="text-7xl font-light bg-gradient-to-r from-[#00A261] to-[#FF6034] bg-clip-text text-transparent">
                    {carbonFootprint.toFixed(1)}
                  </span>
                  <span className="text-xl text-gray-600 font-light">tons CO₂/year</span>
                </div>
              </div>

              <div className="border-t border-[#E0F2F1] pt-8">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#E6F9F3] to-[#F0FDF4]">
                    <p className="text-sm text-[#003A52] font-light mb-2">vs Global Average</p>
                    <p className="text-2xl font-light text-[#00A261]">{averageFootprint} tons</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#FFF0E6] to-[#FFF8E6]">
                    <p className="text-sm text-[#CC552A] font-light mb-2">Difference</p>
                    <p
                      className={`text-2xl font-light ${carbonFootprint > averageFootprint ? "text-[#FF6034]" : "text-[#00A261]"}`}
                    >
                      {Math.abs(carbonFootprint - averageFootprint).toFixed(1)} tons
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default ResultCard