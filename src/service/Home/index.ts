import request from "../request";

export interface ImgParams {
  name?: string; // 影像名称
  sortOrder?: string; //   排序内容
  orderBy?: string; //排序方式
  batchNumber?: string; //批次数
  start_time?: string; //开始时间
  end_time?: string; //结束时间
  pageNumber?: string; //分页数
  currentPage?: string; //当前页码
  all_return?: boolean; // true是全部返回， false是分页
}

export interface ImgDataListProps {
  id: number; //  影像id
  name: string; //  影像名
  path: string; //  存放路径
  range: string; //  经纬度范围
  createTime: string; //  创建时间
  batchNumber: number; //  批次数
  userId: number; //  用户id
  source: string; //  来源
  thumb: string; //  缩略图"

  //数字索引
  //[index: number]: number;
  //字符串索引
  //[key: string]: string;
}

//获取影像列表
export const getImgData = (params: ImgParams) =>
  request.get<{ list: ImgDataListProps[]; total: number }>(`/geoai/v1/image`, {
    params,
  });

//删除影像
export const deleteImg = (id: number) =>
  request.delete<{}>(`/geoai/v1/image/${id}`);

//根据影像id获得影像详情
export const getImgInfoById = (id: number) =>
  request.get<{}>(`/geoai/v1/image/${id}`);
