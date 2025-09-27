import { Progress } from '@/components/ui/progress';
import { getColor } from '@/lib/formTabs/geters';
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

  return (
    <div className='max-w-6xl mx-auto'>
    <div className="mb-8 ">
        <div className="flex justify-between items-center mb-2 ">
          <span className="text-sm font-medium text-muted-foreground">
            {currentSectionName} - Question {currentQuestion + 1} of {currentSectionDataLength}
          </span>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress color={getColor(tab)} value={progress} className="h-2" />
    </div>
    </div>
  )
}

export default ProgressBar