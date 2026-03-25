interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, index) => {
        const stepNum = index + 1
        const isComplete = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isComplete
                    ? 'bg-[#C9A84C] text-white'
                    : isActive
                    ? 'bg-[#2C1810] text-white ring-4 ring-[#C9A84C]/30'
                    : 'bg-[#F5E6E0] text-[#2C1810]/40'
                }`}
              >
                {isComplete ? '✓' : stepNum}
              </div>
              <span
                className={`mt-2 text-xs font-medium tracking-wide ${
                  isActive ? 'text-[#2C1810]' : 'text-[#2C1810]/40'
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-px mx-2 mb-5 transition-all duration-500 ${
                  stepNum < currentStep ? 'bg-[#C9A84C]' : 'bg-[#F5E6E0]'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
