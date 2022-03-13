import { useReducer } from "react";
import TheMenu from "./components/TheMenu";
import TheKeyboard from "./components/TheKeyboard";
import TheFooter from "./components/TheFooter";
import TheLoading from "./components/TheLoading";
import { useSampler } from "./hooks";
import { initialState, reducer, StoreContext } from "./store";
import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useSampler(dispatch);
  return (
    <div className="App">
      {state.isLoaded ? (
        <StoreContext.Provider value={{ state, dispatch }}>
          {/* <div className="el-box">
            <div className="el-center">
              <div className="el-stack app-util-width:100%">
                <TheMenu />
                <TheKeyboard />
                <TheFooter />
              </div>
            </div>
          </div> */}
          <div className="el-cover">
            <TheMenu />
            <div className="el-cover__centered" style={{ margin: "auto" }}>
              <TheKeyboard />
            </div>
            <TheFooter />
          </div>
        </StoreContext.Provider>
      ) : (
        <TheLoading />
      )}
    </div>
  );
}

export default App;
