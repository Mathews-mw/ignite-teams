import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container =  styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.COLORS.GRAY_600};

  padding: 24px;
`;

export const Form = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY_700};

  flex-direction: row;
  justify-content: center;

  border-radius: 6px;

  margin-bottom: 12px;
`;

export const HeaderList = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.COLORS.GRAY_600};

  flex-direction: row;
  justify-content: center;

  border-radius: 6px;

  margin-bottom: 12px;
`;

export const PlayersAmount = styled.Text`
  font-size: ${(props) => props.theme.FONT_SIZE.SM}px;
  font-family: ${(props) => props.theme.FONT_FAMILY.BOLD};
  color: ${(props) => props.theme.COLORS.GRAY_200};
`