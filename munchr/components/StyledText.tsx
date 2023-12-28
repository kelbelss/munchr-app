import { Text, TextProps } from "./Themed";

<link
  href="https://fonts.googleapis.com/css2?family=Imprima&display=swap"
  rel="stylesheet"
></link>;

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "Imprima" }]} />;
}
