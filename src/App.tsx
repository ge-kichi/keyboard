import { useReducer } from "react";
import TheKeyboard from "./components/TheKeyboard";
import TheMenu from "./components/TheMenu";
import TheFooter from "./components/TheFooter";
import { initialState, reducer, StoreContext } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <StoreContext.Provider value={{ state, dispatch }}>
        <div className="el-box el-stack" style={{ minHeight: "100vh" }}>
          <div style={{ flex: 1 }}>
            <div className="el-reel">
              <TheKeyboard />
            </div>
            <TheMenu />
          </div>
          <TheFooter />
        </div>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
