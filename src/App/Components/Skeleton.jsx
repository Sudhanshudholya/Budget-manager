// import React from 'react'
// import {ShimmerTable } from "react-shimmer-effects";

// const Skeleton = ({rows, cols}) => {
//   return (
//     <div>
//        <ShimmerTable row={rows} col={cols} width={'100%'} border={'1'} /> 
//     </div>
//   )
// }

// export default Skeleton



import React from 'react';
import { ShimmerTable } from 'react-shimmer-effects';

const Skeleton = ({ rows = 5, cols = 5 }) => {
  return (
    <div className="w-full p-4 bg-white shadow rounded-lg">
      <ShimmerTable row={rows} col={cols} width="100%" className="rounded-md" />
    </div>
  );
};

export default Skeleton;

