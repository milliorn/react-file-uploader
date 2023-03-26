import { useState } from "react";

function App(): JSX.Element {
  // state variables for the selected file, whether a file is picked, and the contents of the file
  const [fileContents, setFileContents] = useState<string>("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // function to handle when the user selects a file
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setIsFilePicked(true); // set that a file has been picked
    setSelectedFile(event.target.files![0]); // set the selected file
  };

  // function to handle when the user submits the form
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // read the contents of the selected file
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContents(reader.result as string);
      };
      reader.readAsText(selectedFile);
    }

    console.log("Selected file:", selectedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-3xl font-bold underline text-center">Upload File</h1>
      {/* form to upload a file */}
      <form className="mt-8 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-200 hover:bg-blue-400 rounded font-bold py-2 px-4 flex flex-col max-w-xs items-center justify-center mx-auto my-0"
          >
            <span className="text-lg font-bold text-center text-black">
              {/* show the name of the selected file, or prompt to select a file */}
              {selectedFile ? selectedFile.name : "Select a file"}
            </span>
          </label>
          {isFilePicked && (
            <span className="text-lg font-bold flex items-center mx-auto my-0 pt-4 pb-2 px-4 text-center">
              {/* prompt the user to upload the selected file */}
              Press Upload or click on {selectedFile?.name}
            </span>
          )}
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            onChange={changeHandler}
            className="hidden"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
      {/* display the contents of the uploaded file */}
      {fileContents && (
        <div className="mt-8">
          <p id="file-contents">{fileContents}</p>
        </div>
      )}
    </div>
  );
}

export default App;
