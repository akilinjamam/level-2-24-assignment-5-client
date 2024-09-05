/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";
export const updloadCloudinaryImage = (
  imgFile: any,
  setImgHolder: { (value: SetStateAction<string[]>): void; (arg0: any): void },
  toast:any
) => {
  const data = new FormData();
  data.append("file", imgFile);
  data.append("upload_preset", "smipgehv");
  data.append("cloud_name", "dw57lx7qa");
  toast.info('image adding. please wait')

  fetch("https://api.cloudinary.com/v1_1/dw57lx7qa/image/upload", {
    method: "post",
    body: data,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      console.log(res?.url);
      if (res?.url) {
        setImgHolder((prev: string) => [...prev, res?.url]);
        toast.success('image added successfully')
      } else {
        console.log("error from cloudinay");
      }
    })
    .catch((err) => console.log(err));
};
