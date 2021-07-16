import axios from "axios";

export type SelectOption = {
  value: string;
  label: string;
};

export type Camera = {
  name: string;
  full_name: string;
};

export async function getCameras(rovername: any) {
  var cameralist: SelectOption[] = [];
  const url = `http://localhost:8000/rovers/${rovername}/cameras`;
  const {data} = await axios.get(
    `http://localhost:8000/rovers/${rovername}/cameras`
  );
  for (var camera of data) {
    const cameraOption: SelectOption = {
      value: camera.name,
      label: camera.full_name,
    };
    cameralist.push(cameraOption);
  }
  return cameralist;
}
