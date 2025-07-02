import React from "react";

const Dropdown = ({ classTypes, setClassType }) =>
{
  return (
    <select onChange={(e)=> setClassType(e.target.value)}>
      <option value='all'>All Classes</option>
      {classTypes.map((type, idx) =>
      {
        return <option value={type} key={idx}>{type}</option>
      })}
    </select>
  )
};

export default Dropdown;
