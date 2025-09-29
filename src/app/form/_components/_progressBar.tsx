import { Progress } from '@/components/ui/progress';
import { TabValues } from '@/lib/formTabs/types';
import React, { useMemo } from 'react'

type ProgressProps = {
    dataLengths: 
      {[key in TabValues]: number} &
      {total: number}
    ;
    currentQuestion: number;
    currentSectionDataLength: number;
    currentSectionName: string;
    tab: TabValues
}
function ProgressBar({
    dataLengths, currentQuestion, currentSectionDataLength, currentSectionName, tab
}: ProgressProps) {

  const progress = useMemo(()=>{
    let sup = 0;
    switch(tab){
      case "transport":
        sup = 0;
        break;
      case "energie":
        sup = dataLengths.transport
        break;
      case "food":
        sup = dataLengths.transport + dataLengths.energie
        break;
      case "waste":
        sup = dataLengths.transport + dataLengths.energie + dataLengths.food
        break;
      case "vacation":
        sup = dataLengths.transport + dataLengths.energie + dataLengths.food + dataLengths.waste
        break;
    }
return (sup + currentQuestion)/dataLengths.total * 100
  }, [dataLengths])

  const ColorVariants = {
    transport: {bg: "bg-section-transport/20", main: "bg-section-transport"},
    energie: {bg: "bg-section-energie/20", main: "bg-section-energie"},
    food: {bg: "bg-section-food/20", main: "bg-section-food"},
    waste: { bg: "bg-section-waste/20", main: "bg-section-waste"},
    vacation: {bg: "bg-section-vacation/20", main: "bg-section-vacation"},
  }

  return (
    <div className='max-w-6xl mx-auto'>
    <div className="mb-8 ">
        <div className="flex justify-between items-center mb-2 ">
          <span className="text-sm font-medium text-muted-foreground">
            {currentSectionName} - Question {currentQuestion + 1} of {currentSectionDataLength}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress color={ColorVariants[tab].main} value={progress} bg={`h-21 ${ColorVariants[tab].bg}`} />
    </div>
    </div>
  )
}

export default ProgressBar