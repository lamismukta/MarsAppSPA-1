import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import NumericInput from "react-numeric-input";
import { MarsImage, StyledDropDown } from "./Components/MarsImage/styles";
import DropDown, { RoverContext } from "./DropDownComponents";
import { SelectOption } from "./getCameraHelper";
import { getPhotos, Photo } from "./getPhotosHelper";

export const PhotoContext = createContext({
  photoList: [{ id: 0, sol: 0, img_src: "", earth_date: "" }],
  setphotolist: (value: Photo[]) => {},
  sol: 1000,
  setsol: (value: number) => {},
});

const PhotoProvider = PhotoContext.Provider;
const RoverProvider = RoverContext.Provider;

export const DropDownPhotos: React.FC = () => {
  var [photoList, setPhotoList] = useState([
    { id: 0, sol: 0, img_src: "", earth_date: "" },
  ]);
  function setphotolist(value: Photo[]) {
    setPhotoList(value);
  }
  var [sol, setSol] = useState(0);
  function setsol(value: number) {
    setSol(value);
  }
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

  return (
    <div>
      <PhotoProvider value={{ photoList, setphotolist, sol, setsol }}>
        <RoverProvider
          value={{
            cameralist,
            rovername,
            cameraname,
            setcameralist,
            setrovername,
            setcameraname,
          }}
        >
          <StyledDropDown />
          <SolInput />
          <Photos />
        </RoverProvider>
      </PhotoProvider>
    </div>
  );
};

const Photos: React.FC = () => {
  var { photoList } = useContext(PhotoContext);
  const len = Math.min(photoList.length, 5);
  if (len === 0) {
    return <p> No photos found! </p>;
  } else
    return (
      <div>
        {photoList.slice(0, len).map((photo) => (
          <MarsImage src={photo.img_src} width="15%" />
        ))}
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

export default DropDownPhotos;
