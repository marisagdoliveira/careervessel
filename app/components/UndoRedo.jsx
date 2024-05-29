import React, { useEffect, useState } from 'react';
import Redo from '../../public/assets/redo.svg'
import Undo from '../../public/assets/undo.svg'
function UndoRedo() {

  const [isMac, setIsMac] = useState(false);

 

  const handleUndo = () => {
    document.execCommand('undo');
  };

  const handleRedo = () => {
    document.execCommand('redo');
  };



  return (
    <div className='flex gap-5'>
      <button onClick={handleUndo}>
        <Undo className="size-8"/>
      </button>
      <button onClick={handleRedo}> 
      <Redo className="size-8"/>
      </button>
    </div>
  );
}

export default UndoRedo;
