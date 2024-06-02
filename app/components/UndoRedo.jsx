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
    <div className='relative w-[4vw]'>
      <button onClick={handleUndo}>
        <Undo className="absolute right-[60px] top-0 size-8 hover:size-9 transition-all duration-75"/>
      </button>
      <button onClick={handleRedo}> 
        <Redo className="absolute right-[00px] top-0 size-8 hover:size-9 transition-all duration-75"/>
      </button>
    </div>
  );
}

export default UndoRedo;
