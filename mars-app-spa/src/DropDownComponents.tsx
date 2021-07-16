import { createContext, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { getCameras, SelectOption } from "./getCameraHelper";
import { getPhotos } from "./getPhotosHelper";
import { Camera } from "./getCameraHelper";
import { PhotoContext } from "./DropDownAndPhotoComponent";
import { StyledSelect } from "./Components/MarsImage/styles";

const roverNames: SelectOption[] = [
  { value: "Curiosity", label: "Curiosity" },
  { value: "Spirit", label: "Spirit" },
  { value: "Opportunity", label: "Opportunity" },
  { value: "Perseverance", label: "Perseverance" },
];

const RoverContext = createContext({
  cameralist: [{ value: "", label: "" }],
  rovername: "",
  setcameralist: (value: SelectOption[]) => {},
  setrovername: (name: string) => {},
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

  const Provider = RoverContext.Provider;

  return (
    <div>
      <Provider value={{ cameralist, rovername, setcameralist, setrovername }}>
        <FirstChoice />
        <SecondChoice />
      </Provider>
    </div>
  );
};

const FirstChoice: React.FC = () => {
  let { cameralist, rovername, setcameralist, setrovername } =
    useContext(RoverContext);
  return (
    <div>
      Select a Rover
      <p>
      <Select
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
  let { cameralist, rovername } = useContext(RoverContext);
  let { photoList, setphotolist } = useContext(PhotoContext);
  return (
    <div>
      Select a Camera
      <p>
      <Select
        options={cameralist}
        autosize={true}
        clearable={true}
        onChange={async (response) => {
          photoList = await getPhotos(response?.value, rovername);
          setphotolist(photoList);
        }}
      />
      </p>
    </div>
  );
};

export default DropDown;
