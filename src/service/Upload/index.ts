import request from "../request";

export interface LocalUploadParams {
  files: File | File[];
}

export const localUpload = (params: FormData) =>
  request.post<{ success: boolean }>(`/geoai/v1/image/upload`, params);
