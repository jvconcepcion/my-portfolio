import React, { CSSProperties, FC } from 'react'

interface HeadingProps {
  element?: string;
  styles?: CSSProperties;
  text: string;
}

const Heading: FC<HeadingProps> = ({ element, styles, text }) => {
  const Element = element || 'h1';

  const elementProps: Record<string, any> = {};
  if (styles) {
    elementProps.style = styles;
  }
  elementProps.className = 'h3 text-start';

  return React.createElement(Element, elementProps, text);
}

export default Heading