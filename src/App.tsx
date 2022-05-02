import { CSSProperties, useReducer } from "react";
import TheKeyboard from "./components/TheKeyboard";
import TheMenu from "./components/TheMenu";
import TheFooter from "./components/TheFooter";
import ThePlayer from "./components/ThePlayer";
import { initialState, reducer, StoreContext } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <StoreContext.Provider value={{ state, dispatch }}>
        <div className="el-cover">
          <div>
            <div
              className="el-with-sidebar el-with-sidebar--right el-with-sidebar--noStretch"
              style={
                {
                  "--sideWidth": "15rem",
                  "--contentMin": "75%",
                } as CSSProperties
              }
            >
              <div className="el-stack">
                <TheKeyboard />
                <ThePlayer />
              </div>
              <TheMenu />
            </div>
          </div>
          <TheFooter />
        </div>
      </StoreContext.Provider>
    </div>
  );
}

export default App;
