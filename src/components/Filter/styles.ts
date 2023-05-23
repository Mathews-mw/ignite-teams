import { TouchableOpacity } from "react-native";
import { styled, css } from "styled-components/native";

export interface FilterStyleProps {
  isActive?: boolean;
}

export const Container = styled(TouchableOpacity)<FilterStyleProps>`
  ${({ theme, isActive }) => isActive && css`
    border: 1px solid ${theme.COLORS.GREEN_700}
  `};

  border-radius: 6px;
  margin-right: 12px;

  height: 38px;
  width: 70px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${(props) => props.theme.FONT_SIZE.SM}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
  color: ${(props) => props.theme.COLORS.WHITE};

  text-transform: uppercase;
`;