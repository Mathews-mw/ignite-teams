import { TouchableOpacityProps } from 'react-native';
import { Container, Title, FilterStyleProps } from "./styles";

interface IFilterProps extends TouchableOpacityProps, FilterStyleProps {
  title: string;
}

export function Filter({ title, isActive = false, ...rest }: IFilterProps) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
}