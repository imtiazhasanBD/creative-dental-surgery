import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-background text-white z-50">
    <div className="relative flex space-x-2">
      <span className="h-8 w-8 bg-customBlue rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="h-8 w-8 bg-customBlue rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="h-8 w-8 bg-customBlue rounded-full animate-bounce"></span>
    </div>
  </div>
  )
}

export default Loading