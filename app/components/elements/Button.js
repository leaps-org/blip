import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button as Base, Flex, Box, ButtonProps } from 'rebass/styled-components';
import styled, { ThemeContext } from 'styled-components';
import cx from 'classnames';

import Icon from './Icon';
import baseTheme, { transitions } from '../../themes/baseTheme';

const StyledButton = styled(Base)`
  transition: ${transitions.easeOut};
  position: relative;

  &:disabled {
    pointer-events: none;
  }

  &.processing {
    pointer-events: none;

    > div:first-child, .icon {
      transition: none;
      visibility: hidden;
    }
  }
`;

const StyledCircularProgress = styled(Box)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Button = props => {
  const {
    children,
    selected,
    processing,
    icon,
    iconLabel,
    iconPosition,
    iconFontSize,
    iconSrc,
    className = '',
    ...buttonProps
  } = props;

  const classNames = cx({ processing, selected });
  const themeContext = useContext(ThemeContext);
  const isLeftIcon = iconPosition === 'left';
  const flexDirection = isLeftIcon ? 'row-reverse' : 'row';

  const iconMargins = {
    left: isLeftIcon ? 0 : 2,
    right: isLeftIcon ? 2 : 0,
  };

  let justifyContent = 'center';
  if (icon) justifyContent = isLeftIcon ? 'flex-end' : 'flex-start';

  return (
    <Flex as={StyledButton} flexDirection={flexDirection} alignItems="center" justifyContent={justifyContent} {...buttonProps} className={`${classNames} ${className}`}>
      <Box justifyContent="center">{children}</Box>
      {(icon || iconSrc) && (
        <Icon tabIndex={-1} className="icon" fontSize={iconFontSize} mr={iconMargins.right} ml={iconMargins.left} theme={baseTheme} variant="static" icon={icon} iconSrc={iconSrc} label={iconLabel} />
      )}
      {processing && (
        <StyledCircularProgress>
          <CircularProgress
            color="inherit"
            size={themeContext?.fontSizes[3]}
            thickness={5}
          />
        </StyledCircularProgress>
      )}
    </Flex>
  );
};

Button.propTypes = {
  ...ButtonProps,
  processing: PropTypes.bool,
  selected: PropTypes.bool,
  icon: PropTypes.elementType,
  iconLabel: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  iconFontSize: PropTypes.string,
  iconSrc: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'textPrimary',
    'textSecondary',
    'textTertiary',
    'actionListItem',
    'actionListItemDanger',
    'pagination',
    'paginationLight',
    'filter',
    'chip',
  ]),
};

Button.defaultProps = {
  iconPosition: 'right',
  iconFontSize: 'inherit',
  type: 'button',
  variant: 'primary',
};

export default Button;
