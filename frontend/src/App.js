import Body from "./components/Body"
import { Provider } from "react-redux"
import appStore from "./utils/appStore";
import { BrowserRouter } from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(appStore);

function App() {
  return (
    <Provider store={appStore} >
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Body />
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
