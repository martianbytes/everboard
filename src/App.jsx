import { useEffect, useRef, useState } from "react";
import {Layer, Rect, Stage, Transformer } from "react-konva";

export default function App() {
  // hold the shape
  const rectRef = useRef(null);
  //hold the transformer
  const transformerRef = useRef(null);

  // store selected shape
  const [isSelected, setIsSelected] = useState(null);

  //whenever the shape is clicked, select it 
  
  useEffect(() => {
      // first store the selected shape
      if (isSelected && transformerRef.current && rectRef.current) {
        transformerRef.current.nodes([rectRef.current]); //attach yourself to the selected shape
        //render instantly
        transformerRef.current.getLayer().batchDraw();

      }
    }, [isSelected])
    // deselect if we click on empty stage
    const handleDeselect = (e) => {
      const clickedOnEmptyStage = e.target === e.target.getStage();
      if (clickedOnEmptyStage) {
        setIsSelected(false);
      }
    }
  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={handleDeselect} onTouchStart={handleDeselect}>
        <Layer>
          <Rect ref={rectRef}
            onClick={() => setIsSelected(true)}
            onTap={() => setIsSelected(true)}
            draggable
            width={100}
            height={100}
            x={50}
            y={50}
            fill={'purple'}
          />
          {isSelected && <Transformer ref={transformerRef} />}
        </Layer>
      </Stage>
    </div>
  )
}