import React from "react";
import './Title.css'

// export default function Title() {
//     return(
//         <h1 className="title">Hello Componente Title</h1>
//     );
// }

const Title = (props) => {
    return(
        <h1 className="title">Hello {props.text}</h1>
    );
}


export default Title;
