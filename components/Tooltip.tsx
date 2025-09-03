import React from 'react';
import { Tooltip } from '@chakra-ui/react';
import { CustomTooltipProps } from '@interfaces';

const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  label = "",
  placement = "left",
  marginRight = 28,
  arrowSize = 5,
  isDisabled = false,
  children 
}) => {
  return (
    <Tooltip
      aria-label='A tooltip'
      label={label} 
      hasArrow 
      placement={placement}
      bg="white"
      color="black"
      marginRight={marginRight} 
      arrowSize={arrowSize} 
      className="custom-tooltip text-sm px-1 rounded-sm font-semibold capitalize"
      isDisabled={isDisabled}
    >
      {children}
    </Tooltip>
  )
}

export default CustomTooltip;