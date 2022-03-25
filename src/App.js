import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorPage from "./pages/editorpage/EditorPage";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
    <div>
      <Toaster 
      position="top-right"
      toastOptions={{
        success:{
          theme:{
            primary:"#4aed88"
          },
        },
      }}></Toaster>
    </div>
    <BrowserRouter>
      <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/editor/:roomId" element={<EditorPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
