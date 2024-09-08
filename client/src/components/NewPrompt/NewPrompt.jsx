import { useEffect, useRef, useState } from "react";
import "./newPrompt.css";
import { Upload } from "../Upload/Upload";
import { IKImage } from "imagekitio-react";
import model from '../../lib/gemini';
import Markdown from 'react-markdown';

export const NewPrompt = () => {
  const endRef = useRef(null);
  const [userPrompt, setUserPrompt] = useState("");
  const [result, setResult] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {}
  })

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [])

  const runModel = async (text) => {
    const result = await model.generateContent(text);
    setResult(result.response.text());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;
    setUserPrompt(e.target.prompt.value);
    await runModel(e.target.prompt.value);
    e.target.reset();
  }

  return (
    <>
      {img.isLoading && <div className="">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGEKIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="380"
          transformation={[{ width: 380 }]}
        />
      )}
      {/* <button onClick={runModel}>TEST AI</button> */}
      {userPrompt && <div className="message user">{userPrompt}</div>}
      {result && <div className="message"><Markdown>{result}</Markdown></div>}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <Upload setImg={setImg} />
        <input id="file" type="file" multiple={false} hidden />
        <input autoComplete="off" type="text" name="prompt" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button> 
      </form>
    </>
  )
}
