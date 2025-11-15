import { Provider } from "react-redux";
import { store } from "../model/config";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

function StoreProvider({ children }: IProps) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreProvider;
