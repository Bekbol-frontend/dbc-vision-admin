import type { MessageInstance } from "antd/es/message/interface";
import { createContext } from "react";

export const AntdMessageContext = createContext<MessageInstance>(null!)