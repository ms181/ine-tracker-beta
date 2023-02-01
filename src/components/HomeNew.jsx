import React from 'react'

const HomeNew = () => {
  return (
    <div className="Home">
        <div className="flex flex-col gap-2 h-auto">
            <div className="flex gap-2 h-1/2">
                <div className="item w-2/5 bg-orange-500 h-full">Content</div>
                <div className="item w-3/5 bg-blue-500 h-full">Content2</div>
            </div>
            <div className="item w-full bg-green-500">Content3</div>
        </div>
    </div>
  )
}

export default HomeNew