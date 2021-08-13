import React from 'react';
import  icon from './yoda.jpg';


const ErrorPlate =()=>{

  
    return(
      <div>
        <img src={icon} alt='error img'/>
        <p>
          can't get a resourse. Please choose another one
        </p>
      </div>
    );
  
}
export default ErrorPlate;