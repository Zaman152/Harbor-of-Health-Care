// @ts-nocheck
import { jsx as _jsx } from "react/jsx-runtime";
import { addPropertyControls, ControlType, cx, motion, useSVGTemplate, withCSS } from "framer";
import * as React from "react";
import { forwardRef } from "react";

const mask = "var(--framer-icon-mask)";
const Base = forwardRef(function (props, ref) {
  return /*#__PURE__*/ _jsx("svg", { ...props, ref, children: props.children });
});
const MotionSVG = motion.create(Base);
const SVG = /*#__PURE__*/ forwardRef((props, ref) => {
  const { animated, layoutId, children, ...rest } = props;
  return animated ? /*#__PURE__*/ _jsx(MotionSVG, { ...rest, layoutId, ref, children }) : /*#__PURE__*/ _jsx("svg", { ...rest, ref, children });
});
const svg = '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 2 14.5 L 12.5 14.5 C 13.605 14.5 14.5 13.605 14.5 12.5 L 14.5 5 L 7.25 0 L 0 5 L 0 12.5 C 0 13.605 0.895 14.5 2 14.5 Z" fill="transparent" height="14.49996px" id="lLOiAXUCt" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--1335ju, 1.5)" stroke="var(--18mrqx2, rgb(0, 0, 0))" transform="translate(4.75 4.75)" width="14.49996px"/><path d="M 0 2 C 0 0.895 0.895 0 2 0 L 2.5 0 C 3.605 0 4.5 0.895 4.5 2 L 4.5 5.5 L 0 5.5 Z" fill="transparent" height="5.500000000000002px" id="FFcYQg9ko" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--1335ju, 1.5)" stroke="var(--18mrqx2, rgb(0, 0, 0))" transform="translate(9.75 13.749)" width="4.499969999999999px"/></svg>';
const getProps = ({ dots, stroke, width1, ...props }) => {
  return {
    ...props,
    BKVe8Pgvw: dots ?? props.BKVe8Pgvw ?? 1,
    fICyAUQY1: stroke ?? props.fICyAUQY1 ?? "rgb(0, 0, 0)",
    lKf_CQTz5: width1 ?? props.lKf_CQTz5 ?? 1.5,
  };
};
const Component = /*#__PURE__*/ React.forwardRef(function (props, ref) {
  const { style, className, layoutId, fICyAUQY1, lKf_CQTz5, ...restProps } = getProps(props);
  const href = useSVGTemplate("763274199", svg);
  return /*#__PURE__*/ _jsx(SVG, {
    ...restProps,
    className: cx("framer-3BEg1", className),
    layoutId,
    ref,
    role: "presentation",
    style: { "--1335ju": lKf_CQTz5, "--18mrqx2": fICyAUQY1, ...style },
    viewBox: "0 0 24 24",
    children: /*#__PURE__*/ _jsx("use", { href }),
  });
});
const css = [
  "@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",
  `.framer-3BEg1 { -webkit-mask: ${mask}; aspect-ratio: 1; display: block; mask: ${mask}; width: 24px; }`,
];
const Icon = withCSS(Component, css, "framer-3BEg1");
Icon.displayName = "Home";
export default Icon;
addPropertyControls(Icon, {
  fICyAUQY1: { defaultValue: "rgb(0, 0, 0)", title: "Stroke", type: ControlType.Color },
  lKf_CQTz5: { defaultValue: 1.5, displayStepper: true, max: 4, min: 0, step: 0.5, title: "Width", type: ControlType.Number },
  BKVe8Pgvw: { defaultValue: 1, displayStepper: true, hidden: true, max: 4, min: 1, title: "Dots", type: ControlType.Number },
});
