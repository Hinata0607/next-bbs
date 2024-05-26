import React from 'react'
import BBSCard from './BBSCard'
import { BBSdata } from '../types/types'

interface BBSAllDatarops {
    bbsAllData: BBSdata[];
}

const BBSCardList = ({bbsAllData}: BBSAllDatarops) => {
  return (
    <div  className="grid lg:grid-cols-3 px-4 py-4 gap-4">
        {bbsAllData.map((bbsData: BBSdata) => (
            <BBSCard key={bbsData.id} bbsData={bbsData}/>
        ))}
    </div>
  )
}

export default BBSCardList