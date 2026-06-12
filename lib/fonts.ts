import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
  useFonts as useInterFonts,
} from "@expo-google-fonts/inter";

export const interFontMap = {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
  Inter_900Black,
};

export function usePacoFonts() {
  return useInterFonts(interFontMap);
}
