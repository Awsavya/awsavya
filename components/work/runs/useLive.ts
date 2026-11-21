import { useState } from "react";

/**
 * Text for a polite live region. Saying the same sentence twice still changes the node's text (a
 * zero-width space alternates), so a repeated result — "Nothing changed." — is announced again.
 */
export function useLive(initial: string) {
  const [state, setState] = useState({ text: initial, n: 0 });
  const say = (text: string) => setState(s => ({ text, n: s.n + 1 }));
  return [state.text + (state.n % 2 ? "​" : ""), say, state.text] as const;
}
