import { ChangeEvent, FormEvent, useState } from "react";

function App(): JSX.Element {
  // These are state variables for storing the selected file's contents, whether a file is selected or not, and the file itself
  const [fileContents, setFileContents] = useState<string>("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  // This is a state variable to track whether a lockfile is required
  const [lockfileRequired, setLockfileRequired] = useState(false);

  // These are state variables for storing the contents of the lockfile, whether a lockfile is selected or not, and the lockfile itself
  const [lockfileContents, setLockfileContents] = useState<string>("");
  const [isLockfilePicked, setIsLockfilePicked] = useState(false);
  const [selectedLockfile, setSelectedLockfile] = useState<File | null>(null);

  // function to handle when the user selects a file
  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsFilePicked(true); // set that a file has been picked
    setSelectedFile(event.target.files![0]); // set the selected file

    // check if a lockfile is required
    const fileName = event.target.files![0].name;
    if (fileName === "package.json" || fileName === "Cargo.toml") {
      setLockfileRequired(true);
    } else {
      setLockfileRequired(false);
    }
  };

  // function to handle when the user selects a lockfile
  const lockfileChangeHandler = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setIsLockfilePicked(true); // set that a lockfile has been picked
    setSelectedLockfile(event.target.files![0]); // set the selected lockfile
  };

  // function to handle when the user submits the form
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    // read the contents of the selected file
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileContents(reader.result as string);
      };
      reader.readAsText(selectedFile);
    }

    // read the contents of the selected lockfile
    if (selectedLockfile) {
      const reader = new FileReader();
      reader.onload = () => {
        setLockfileContents(reader.result as string);
      };
      reader.readAsText(selectedLockfile);
    }

    console.log("Selected file:", selectedFile);
    console.log("Selected lockfile:", selectedLockfile);
  };

  // This function checks whether the given file is either a package.json or a Cargo.toml file
  const isPackageJsonOrCargoToml = (
    file: File | null | undefined | string
  ): boolean => {
    // Check if the file is not a string, is not null or undefined, and has a name that matches either package.json or Cargo.toml
    return (
      typeof file !== "string" &&
      !!file &&
      (file.name === "package.json" || file.name === "Cargo.toml")
    );
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

        {selectedFile && isPackageJsonOrCargoToml(selectedFile) && (
          <div className="mb-4">
            <label
              htmlFor="lockfile-upload"
              className="cursor-pointer bg-blue-200 hover:bg-blue-400 rounded font-bold py-2 px-4 flex flex-col max-w-xs items-center justify-center mx-auto my-0"
            >
              <span className="text-lg font-bold text-center text-black">
                {`Upload ${
                  selectedFile.name === "package.json"
                    ? "package-lock.json"
                    : "cargo.lock"
                }`}
              </span>
            </label>
            {isLockfilePicked && (
              <span className="text-lg font-bold flex items-center mx-auto my-0 pt-4 pb-2 px-4 text-center">
                {/* prompt the user to upload the selected lockfile */}
                Press Upload or click on {selectedLockfile?.name}
              </span>
            )}
            <input
              id="lockfile-upload"
              name="lockfile-upload"
              type="file"
              onChange={lockfileChangeHandler}
              className="hidden"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          disabled={
            isPackageJsonOrCargoToml(selectedFile?.name) && !selectedLockfile
          }
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
