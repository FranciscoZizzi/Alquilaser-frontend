import React from "react"

export const BackArrowIcon = ({ width, height, fill }: { width?: string, height?: string, fill?: string }) => {
    return (
        <svg width={width ?? "24"} height={height ?? "24"} viewBox="0 0 512 512" fill={fill ?? "black"} xmlns="http://www.w3.org/2000/svg">
            <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256" />
        </svg>
    );
}
