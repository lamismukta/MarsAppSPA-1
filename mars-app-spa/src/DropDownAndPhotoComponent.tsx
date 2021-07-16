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

  return (
    <div>
      <PhotoProvider value={{ photoList, setphotolist, sol, setsol }}>
          <StyledDropDown />
          <Photos />
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
      <div className = 'photo-gallery'>
        {photoList.slice(0, len).map((photo) => (
            <div className = 'photo'>
          <MarsImage src={photo.img_src} />
          <p className = 'caption'> Earth Date: {photo.earth_date} </p>
          </div>
        ))}
      </div>
    );
};

export default DropDownPhotos;
