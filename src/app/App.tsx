import { AntdConfig } from "./provider/AntdConfig"
import { AtndMessageContext } from "./provider/AntdMessageContext"
import { AppRouter } from "./provider/AppRouter/AppRouter"

function App() {
  return (
    <AntdConfig>
      <AtndMessageContext>
        <AppRouter />
      </AtndMessageContext>
    </AntdConfig>
  )
}

export default App