//import logo from "./logo.svg";
import { Button } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import "./App.css";
import Block from "./components/Block";
import Header from "./components/Header";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Block />
        <a
          href="https://github.com/sameerfa/wand-craft/tree/master"
          className="link"
        >
          <Button>
            <GitHub />
          </Button>
        </a>
      </div>
    </div>
  );
}

export default App;
