"use client"; // Mark this as a client component

import { Provider } from "react-redux";
import store from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
