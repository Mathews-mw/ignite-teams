import { TouchableHighlightProps } from 'react-native';

import { ButtonTypeStyleProps, Container, Title } from "./styles";

interface IButtonProps extends TouchableHighlightProps {
  title: string;
  type?: ButtonTypeStyleProps;
}

export function Button({ title, type = 'PRIMARY', ...rest }: IButtonProps) {
  return (
    <Container type={type} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  )
}