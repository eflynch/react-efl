import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Position = {x:number, y:number};

type XYPadProps = {
    width?:number,
    height?:number,
    position:Position,
    circleRadius?:number,
    onChange:(position:Position)=>void
};

const XYPad = (props:XYPadProps) => {
    const width = props.width || 100;
    const height = props.height || 100;
    const circleRadius = props.circleRadius || 0.1;

    const [dragging, setDragging] = useState<"dragging"|"idle"|"snap">("idle");
    const [relativePosition, setRelativePosition] = useState<Position|null>(null);
    const circleRef = useRef<SVGCircleElement>(null);
    const rectRef = useRef<SVGRectElement>(null);

    const circlePosition = {
        x: props.position.x - circleRadius/2,
        y: props.position.y - circleRadius/2
    };

    const onMouseDown = useCallback((e:any)=>{
        // snap circle if outside circle
        if (e.target == rectRef.current) {
            setDragging("snap");
            const x = (e.pageX - e.target.getBoundingClientRect().left)/width - circleRadius/4;
            const y = (e.pageY - e.target.getBoundingClientRect().top)/height - circleRadius/4;
            props.onChange({
                x: Math.min(Math.max(x, 0), 1),
                y: Math.min(Math.max(y, 0), 1)
            });
        } else if (e.target == circleRef.current) {
            const relX = e.pageX - (circlePosition.x * width);
            const relY = e.pageY - (circlePosition.y * height);
            setDragging("dragging");
            setRelativePosition({
                x: relX,
                y: relY
            });
        } else {
            return;
        }
        
        e.stopPropagation();
        e.preventDefault();
    }, [circlePosition]);

    const onMouseMove = useCallback((e:any)=>{
        if (dragging == "idle") {return;}
        if (dragging == "snap") {
            onMouseDown(e);
            return;
        }
        if (!relativePosition){return;}
        const x = (e.pageX - relativePosition.x)/width + circleRadius/2;
        const y = (e.pageY - relativePosition.y)/height + circleRadius/2;
        props.onChange({
            x: Math.min(Math.max(x, 0), 1),
            y: Math.min(Math.max(y, 0), 1)
        });
        e.stopPropagation();
        e.preventDefault();
    }, [props.onChange, dragging, relativePosition, circleRadius, width, height, onMouseDown]);

    const onMouseUp = useCallback((e:any)=>{
        setDragging("idle");
        e.stopPropagation();
        e.preventDefault();
    }, []);

    useEffect(()=>{
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        return ()=>{
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove); 
        };
    }, [onMouseDown, onMouseUp, onMouseMove]);

    return (
        <svg viewBox={`${-circleRadius} ${-circleRadius} ${1+circleRadius} ${1+circleRadius}`}
             width={width} height={height}>
            <rect ref={rectRef} rx={circleRadius} x={-circleRadius} y={-circleRadius}
                  width={1+circleRadius} height={1+circleRadius} fill="black" />
            <circle ref={circleRef} fill="white" cx={circlePosition.x} cy={circlePosition.y} r={circleRadius}/>
        </svg>
    );
}

export default XYPad;
