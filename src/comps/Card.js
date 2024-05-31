import React from "react";

const Card = ({ id, src }) => {
    return (
        <img src={src} alt={id} />
    )
}

export default Card;