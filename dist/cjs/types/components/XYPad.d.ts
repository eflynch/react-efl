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
export default function XYPad(props: XYPadProps): JSX.Element;
export {};
