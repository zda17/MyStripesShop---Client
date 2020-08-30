import React, { useState } from 'react';
import { CustomPicker, SketchPicker } from 'react-color';

function MyColorPicker() {

    const [color, setColor] = useState([]);
    const [currentColor, setCurrentColor] = useState('#3cd6bf');
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    
    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
      };
    
    const handleClose = () => {
        setDisplayColorPicker(false);
      };

    const onChange = (updatedColor) => {
        setCurrentColor(updatedColor);
    };

    const addColor = () => {
        setColor([...color, currentColor]);
        console.log(currentColor);
        console.log(color);
    }
    return (
        <>
            <div>
            <SketchPicker 
                color={currentColor}
                onChangeComplete={onChange}
                onChange={onChange}
                disableAlpha={true}
                width={300}
            />
            <button onClick={addColor}>ADD</button>
            </div> 
            </>
    );
  }

export default CustomPicker(MyColorPicker);