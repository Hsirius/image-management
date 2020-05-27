import { useObserver } from "mobx-react-lite";
import React from "react";

const ServiceUpload = () => {
  return useObserver(() => <>服务器上传</>);
};

export default ServiceUpload;
