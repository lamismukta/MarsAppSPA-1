import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { MarsImage, StyledDropDown } from "./Components/MarsImage/styles";
import DropDown from "./DropDownComponents";
import {Photo} from "./getPhotosHelper"

export const PhotoContext = createContext({
    photoList: [{id: 0, sol: 0, img_src: '', earth_date: ''}],
    setphotolist: (value: Photo[]) => {},
  });
  
  const Provider = PhotoContext.Provider;

export const DropDownPhotos: React.FC = () => {
    var [photoList, setPhotoList] = useState([{id: 0, sol: 0, img_src: '', earth_date: ''}]);
    function setphotolist(value: Photo[]) {
      setPhotoList(value);
    }

    return(
        <div>
        <Provider value = {{photoList, setphotolist}}>
            <StyledDropDown /> 
            <Photos />
        </Provider>
        </div>

    )

}

const Photos: React.FC = () => {
    var { photoList } = useContext(PhotoContext);
    const len = Math.min(photoList.length,5);
    if( len === 0 ) { return(
    <p> No photos found! </p>)} else 
    return(
        <div>
        {/* <View style={{padding: 1, alignSelf: 'flex-start'}}> */}
        {photoList.slice(0,len).map((photo) => (<MarsImage src={photo.img_src} width = '15%' />))}
        {/* </View> */}
        </div>
    )


}

export default DropDownPhotos;