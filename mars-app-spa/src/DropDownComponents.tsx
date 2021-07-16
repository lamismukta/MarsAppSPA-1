import { createContext, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getCameras, SelectOption } from "./getCameraHelper";
import { getPhotos } from "./getPhotosHelper";
import { Camera } from "./getCameraHelper";
import { PhotoContext } from "./DropDownAndPhotoComponent";
import { StyledSelect } from "./Components/MarsImage/styles";
import NumericInput from "react-numeric-input";

const roverNames: SelectOption[] = [
  { value: "Curiosity", label: "Curiosity" },
  { value: "Spirit", label: "Spirit" },
  { value: "Opportunity", label: "Opportunity" },
  { value: "Perseverance", label: "Perseverance" },
];

export const RoverContext = createContext({
  cameralist: [{ value: "", label: "" }],
  rovername: "",
  cameraname: '',
  setcameralist: (value: SelectOption[]) => {},
  setrovername: (name: string) => {},
  setcameraname: (name: string) => {}
});

const DropDown: React.FC = () => {
  var [cameralist, setCameraList] = useState([{ value: "", label: "" }]);
  function setcameralist(value: SelectOption[]) {
    setCameraList(value);
  }
  var [rovername, setRoverName] = useState("");
  function setrovername(name: string) {
    setRoverName(name);
  }
  var [cameraname, setCameraName] = useState("");
  function setcameraname(name: string) {
    setCameraName(name);
  }

  const RoverProvider = RoverContext.Provider;

  return (
    <div>
      <RoverProvider value={{ cameralist, rovername, cameraname, setcameralist, setrovername, setcameraname }}>
        <FirstChoice />
        <SecondChoice />
        <SolInput />
      </RoverProvider>
    </div>
  );
};

const FirstChoice: React.FC = () => {
  let { cameralist, rovername, setcameralist, setrovername } =
    useContext(RoverContext);
  return (
    <div style={{width: '1000px'}}>
      Select a Rover
      <p>
      <Select
        style={{width: '1000px'}}
        options={roverNames}
        autosize={true}
        clearable={true}
        onChange={async (response) => {
          setrovername(response ? response.value : "");
          cameralist = await getCameras(response?.value);
          setcameralist(cameralist);
        }}
      />
      </p>
    </div>
  );
};

const SecondChoice: React.FC = () => {
  var { cameralist, rovername , cameraname, setcameraname} = useContext(RoverContext);
  return (
    <div style={{width: '1000px'}}>
      Select a Camera
      <p>
      <Select
        options={cameralist}
        autosize={true}
        clearable={true}
        onChange={async (response) => {
        setcameraname(response ? response.value : "");
        }}
      />
      </p>
    </div>
  );
};

const SolInput: React.FC = () => {
  var { photoList, setphotolist, sol, setsol } = useContext(PhotoContext);
  var { rovername, cameraname } = useContext(RoverContext);
  return (
    <div>
      <p>Enter Sol</p>
      <p>
        <NumericInput
          onChange={async (response) => {
            console.log(cameraname)
            setsol(response ?? 1000);
            photoList = await getPhotos(cameraname, rovername, sol);
            setphotolist(photoList);
            console.log(photoList);
          }}
        />
      </p>
    </div>
  );
};

export default DropDown;
