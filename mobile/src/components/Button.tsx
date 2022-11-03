import {
  Button as NativeBaseButton,
  IButtonProps as NativeBaseButtonProps,
  Text } from 'native-base';

interface ButtonProps extends NativeBaseButtonProps{
  text: string;
  type?: "primary" | "secondary";
}

export function Button({ text, type = "primary", ...props }: ButtonProps) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === "secondary" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "secondary" ? "red.700" : "yellow.700"
      }}
      _loading={{
        color: type === "secondary" ? "white" : "black"
      }}
      {...props}
    >
      <Text
        fontSize="sm"
        fontFamily="heading"
        color={type === "secondary" ? "white" : "black"}
      >
        {text}
      </Text>
    </NativeBaseButton>
  );
}