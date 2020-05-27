import { useObserver } from "mobx-react-lite";
import React from "react";

const SFTPUpload = () => {
  return useObserver(() => <>SFTP文件导入</>);
};

export default SFTPUpload;
