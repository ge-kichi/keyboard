import { useReducer } from "react";
import TheSettings from "./components/TheSettings";
import TheKeyboard from "./components/TheKeyboard";
import TheFooter from "./components/TheFooter";
import { initialState, reducer, StoreContext } from "./store";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      <StoreContext.Provider value={{ state, dispatch }}>
        <div className="el-cover">
          <TheSettings />
          <div className="el-reel">
            <TheKeyboard />
          </div>
          <TheFooter />
        </div>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
