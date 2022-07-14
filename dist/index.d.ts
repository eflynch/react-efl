/// <reference types="react" />
declare type Position = {
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
declare function XYPad(props: XYPadProps): JSX.Element;

export { Position, XYPad };
