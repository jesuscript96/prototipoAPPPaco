import { Redirect } from "expo-router";
import { usePacoStore } from "@/store/paco-store";

export default function PacoIndex() {
  const loggedIn = usePacoStore((s) => s.loggedIn);
  return loggedIn ? <Redirect href="/(paco)/home" /> : <Redirect href="/(paco)/login" />;
}
