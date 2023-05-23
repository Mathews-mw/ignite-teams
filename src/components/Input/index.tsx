import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { Container } from "./styles";
import { RefObject } from "react";

interface IInputProps extends TextInputProps {
  inputRef: RefObject<TextInput>;
}

export function Input({ inputRef, ...rest }: IInputProps) {
  const theme = useTheme();
  
  return (
    <Container ref={inputRef} placeholderTextColor={theme?.COLORS.GRAY_300} {...rest} />
  )
}