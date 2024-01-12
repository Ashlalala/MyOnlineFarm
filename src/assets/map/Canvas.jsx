import { useEffect, useRef } from 'react'
import Controls from './Controls';

const Canvas = props => {
    /*const ref=useRef();

    
    useEffect(()=>{
        const canvas=ref.current;
        const context=canvas.getContext('2d');
        

        let controls=new Controls(canvas)
        
    },[])
    */

    return <canvas ref={props.canvasref} {...props}/>
}

export default Canvas