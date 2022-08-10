import React, { useState } from "react"
import axios from "axios"
import FormData from "form-data"
import FileDownload from "js-file-download"

function App() {
  const [file,setFile]=useState(null)
 const submit=(e)=>{
  e.preventDefault()
  const formData=new FormData();
  formData.append("files",file)
  axios.post("http://localhost:3001/upload",formData,{
    responseType:"blob"
  }).then((res)=>{
    FileDownload(res.data,"downloaded.json")
  }).catch(err=>{
    console.log(err)
  })
 }
  return (
    <div className="App">
      <form onSubmit={(e)=>submit(e)}>
      <input type="file" name="files" onChange={(e)=>setFile(e.target.files[0])} />
    <button>submit</button>
      </form>
    </div>
  );
}

export default App;
