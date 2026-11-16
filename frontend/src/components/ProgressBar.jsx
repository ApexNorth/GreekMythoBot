import React from 'react';

function ProgressBar({progress}){
  return (
    <div>
      <div>
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}

export default ProgressBar;
