export const flex = (props) => `
  display: flex;
  ${!!props?.alignItems ? `align-items: ${props.alignItems};` : ""}
  ${!!props?.justifyContent ? `justify-content: ${props.justifyContent};` : ""}
  ${!!props?.direction ? `flex-direction: ${props.direction};` : ""}
`;
