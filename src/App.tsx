import { useState } from "react";

function App(): JSX.Element {
  // Declare state variables for the selected file and whether a file has been picked
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);

  // Event handler for file selection input change
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // Update state with the selected file and set isFilePicked to true
    setSelectedFile(event.target.files![0]);
    setIsFilePicked(true);
  };

  // Event handler for form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Selected file:", selectedFile);
    // handle file upload logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      {/* Heading */}
      <h1 className="text-3xl font-bold underline text-center">Upload File</h1>
      {/* Form */}
      <form className="mt-8 flex flex-col items-center" onSubmit={handleSubmit}>
        {/* File upload input */}
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-200 hover:bg-blue-400 rounded font-bold py-2 px-4 flex flex-col max-w-xs items-center justify-center mx-auto my-0"
          >
            {/* Display "Select a file" if no file has been picked yet, otherwise display the selected file name */}
            {!isFilePicked ? (
              <span className="text-lg font-bold">Select a file</span>
            ) : (
              <span className="text-lg font-bold text-center text-black">
                {selectedFile?.name}
              </span>
            )}
          </label>
          {!isFilePicked ? (
            <></>
          ) : (
            <span className="text-lg font-bold flex items-center mx-auto my-0 pt-4 pb-2 px-4 text-center">
              Press Upload or click on {selectedFile?.name}
            </span>
          )}
          {/* Actual file input, hidden */}
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            onChange={changeHandler}
            className="hidden"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default App;
