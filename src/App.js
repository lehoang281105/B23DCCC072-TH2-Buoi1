import logo from "./logo.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import ImageSearch from "./components/ImgSearch";
import RandomColor from "./components/RandomColor";
function App() {
  return (
    <div className="container">
      <div className="todo-container">
        <ToDoList />
      </div>
      <div className="image-search-container">
        <ImageSearch />
      </div>
      <div className="random-color-container">
        <RandomColor />
      </div>
    </div>
  );
}

export default App;
