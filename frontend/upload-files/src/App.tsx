import React, { useState } from "react"
import axios from "axios"
import FormData from "form-data"
import FileDownload from "js-file-download"

function App() {
  const [file,setFile]=useState<File>()

  const fileSetting=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files!==null) {
      setFile(e.target.files[0])
    }
  }
 const submit=(e:React.FormEvent<HTMLFormElement>)=>{
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
      <input type="file" name="files" onChange={(e)=>fileSetting(e)} />
    <button>submit</button>
      </form>
    </div>
  );
}

export default App;
