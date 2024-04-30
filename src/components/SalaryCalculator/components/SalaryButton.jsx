import React from 'react'

const SalaryButton = ({SalaryValue,setSalaryValue,changeAmount, text}) => {
  return (
    <button onClick={(e)=>{setSalaryValue(SalaryValue*changeAmount)}} className="btn btn-secondary btn-outline">{text}</button>
  )
}

export default SalaryButton