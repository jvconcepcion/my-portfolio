'use client';
import { StringToJSXProps } from '@interfaces';
import React from 'react';

const  StringToJSX: React.FC<StringToJSXProps> = ({ domString, styles, className }) => {

  try {
    const parsedDocument = new DOMParser().parseFromString(domString, 'text/html');
    const parsedElement = parsedDocument.body.firstChild;

    if (parsedElement) {
      let elementType = 'div';  // Default to div

      if (parsedElement.nodeType === Node.ELEMENT_NODE) {
        elementType = (parsedElement as Element).tagName.toLowerCase();
      }

      const elementProps: Record<string, any> = {};

      // Add styles if provided
      if (styles) {
        elementProps.style = styles;
      }

      // Add className if provided
      if (className) {
        elementProps.className = className;
      }

      return React.createElement(
        elementType,
        elementProps,
        parsedElement.textContent
      )
    }
    console.error('Parsed element is undefined.');
  } catch (error) {
    console.error('Error parsing the DOM string:', error);
  }


  return null
};

export default StringToJSX;