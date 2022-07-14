'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

function XYPad(props) {
    var width = props.width || 100;
    var height = props.height || 100;
    var circleRadius = props.circleRadius || 0.1;
    var _a = react.useState("idle"), dragging = _a[0], setDragging = _a[1];
    var _b = react.useState(null), relativePosition = _b[0], setRelativePosition = _b[1];
    var circleRef = react.useRef(null);
    var rectRef = react.useRef(null);
    var circlePosition = {
        x: props.position.x - circleRadius / 2,
        y: props.position.y - circleRadius / 2
    };
    var onMouseDown = react.useCallback(function (e) {
        // snap circle if outside circle
        if (e.target == rectRef.current) {
            setDragging("snap");
            var x = (e.pageX - e.target.getBoundingClientRect().left) / width - circleRadius / 4;
            var y = (e.pageY - e.target.getBoundingClientRect().top) / height - circleRadius / 4;
            props.onChange({
                x: Math.min(Math.max(x, 0), 1),
                y: Math.min(Math.max(y, 0), 1)
            });
        }
        else if (e.target == circleRef.current) {
            var relX = e.pageX - (circlePosition.x * width);
            var relY = e.pageY - (circlePosition.y * height);
            setDragging("dragging");
            setRelativePosition({
                x: relX,
                y: relY
            });
        }
        else {
            return;
        }
        e.stopPropagation();
        e.preventDefault();
    }, [circlePosition]);
    var onMouseMove = react.useCallback(function (e) {
        if (dragging == "idle") {
            return;
        }
        if (dragging == "snap") {
            onMouseDown(e);
            return;
        }
        if (!relativePosition) {
            return;
        }
        var x = (e.pageX - relativePosition.x) / width + circleRadius / 2;
        var y = (e.pageY - relativePosition.y) / height + circleRadius / 2;
        props.onChange({
            x: Math.min(Math.max(x, 0), 1),
            y: Math.min(Math.max(y, 0), 1)
        });
        e.stopPropagation();
        e.preventDefault();
    }, [props.onChange, dragging, relativePosition, circleRadius, width, height, onMouseDown]);
    var onMouseUp = react.useCallback(function (e) {
        setDragging("idle");
        e.stopPropagation();
        e.preventDefault();
    }, []);
    react.useEffect(function () {
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        return function () {
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [onMouseDown, onMouseUp, onMouseMove]);
    return (React.createElement("svg", { viewBox: "".concat(-circleRadius, " ").concat(-circleRadius, " ").concat(1 + circleRadius, " ").concat(1 + circleRadius), width: width, height: height },
        React.createElement("rect", { ref: rectRef, rx: circleRadius, x: -circleRadius, y: -circleRadius, width: 1 + circleRadius, height: 1 + circleRadius, fill: "black" }),
        React.createElement("circle", { ref: circleRef, fill: "white", cx: circlePosition.x, cy: circlePosition.y, r: circleRadius })));
}

exports.XYPad = XYPad;
//# sourceMappingURL=index.js.map
