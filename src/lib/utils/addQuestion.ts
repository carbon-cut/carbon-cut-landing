import { QuestionProps } from "@/app/_forms/types"
import { get } from "http";

type input = [boolean | undefined, boolean | null]

function getNumber(inputs: input[]){
    return inputs.reduce((prev, curr) => prev + (Number(curr[0] || curr[1])), 0);
}



function addQestions(inputs: input[], currentIndex: number, Components: React.FC<QuestionProps>[]) {
    return (prev: React.FC<QuestionProps>[]) =>{
        const out = prev.slice();
        console.log('number:: ', getNumber(inputs), ' : ', Components[0].name);
        console.log('input:', inputs);
        out.splice(currentIndex + 1 + 
                    getNumber(inputs),
                    0, ...Components);
        return out;
    }
}

function deleteQuestions(inputs: input[], currentIndex: number, deleteNum: number = 1) {
    return( (prev: React.FC<QuestionProps>[])=>{
          const out = prev.slice();
          out.splice(currentIndex + 1 +
            getNumber(inputs), deleteNum);
          return out;
        })
}

export {
    addQestions,
    deleteQuestions
}