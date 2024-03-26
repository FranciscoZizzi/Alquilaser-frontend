import styled from 'styled-components';
import {theme} from "../../utils/theme";

export const StyledTextField = styled.div<{$isFocused: Boolean}>`
  padding: 1rem;
  position: relative;
  border-width: 2px;
  border-color: ${props => props.theme.primary500};
  border-radius: 0.375rem;

  ${({ $isFocused }) => $isFocused && `
    border-color: ${(props: { theme: { primary300: any; }; }) => props.theme.primary300}; 
 `}
`;

