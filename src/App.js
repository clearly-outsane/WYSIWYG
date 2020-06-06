import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const App = () => {
  const [Images, setImages] = useState([]);
  //Use editorState to resume the Editor's state the next time you load it
  const [editorState, setStateEditor] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    console.log("Current Editor State", editorState);
    setStateEditor(editorState);
  };
  const _uploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
    // need to save it to the state so we can get it's data
    // later when we decide what to do with it.

    // Make sure you have a uploadImages: [] as your default state
    let uploadedImages = Images;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    };
    console.log("Image uploaded object:", imageObject);
    uploadedImages.push(imageObject);

    setImages(uploadedImages);

    // We need to return a promise with the image src
    // the img src we will use here will be what's needed
    // to preview it in the browser. This will be different than what
    // we will see in the index.md file we generate.
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  return (
    <div className="App">
      <Editor
        editorState={editorState}
        toolbar={{ image: { uploadCallback: _uploadImageCallBack } }}
        image={{ previewImage: true }}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default App;
