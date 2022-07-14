/// <reference types="react" />
export declare type Position = {
    x: number;
    y: number;
};
declare type XYPadProps = {
    width?: number;
    height?: number;
    position: Position;
    circleRadius?: number;
    onChange: (position: Position) => void;
};
declare const XYPad: (props: XYPadProps) => JSX.Element;
export default XYPad;
