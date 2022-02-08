import React from 'react';
import {array, number} from 'prop-types';
import StepIconCurrent from "@/components/icons/steps/StepIconCurrent.jsx";
import StepIconWait from "@/components/icons/steps/StepIconWait.jsx";
import {Steps} from "antd";

DynamicSteps.propTypes = {
   steps: array,
   currentStep: number
};

function DynamicSteps({currentStep, steps, ...rest}) {
   
   const Component = steps[currentStep - 1]?.content;
   return (
      <div className="app-steps">
         <div className="app-steps__header">
            <Steps
               initial={1}
               current={currentStep}
               size='small'
               className='app-steps__steps'
               {...rest}>
               {steps.map(item => {
                  const icon = item.id < currentStep + 1 ? <StepIconCurrent/> : <StepIconWait/>
                  return <Steps.Step key={item.id} icon={icon} {...item}/>
               })}
            </Steps>
         </div>
         <div className="app-steps__content">
            {Component}
         </div>
      </div>
   );
}

export default DynamicSteps;