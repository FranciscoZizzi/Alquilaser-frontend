import React from 'react'

const IconButton = ({icon}:{icon:React.ReactElement}) => {
    return (
        <button style={{borderColor:"red"}}>
            {icon}
        </button>
    );
};

export default IconButton