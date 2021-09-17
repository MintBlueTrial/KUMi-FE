/*
 * @Time    : 2021/09/14 00:52:33
 * @Author  : DannyDong
 * @File    : index.ts
 * @Description: Api
 */

import request from 'umi-request';

export class KumiApi {
  // 获取所有任务
  async getTaskList(params: any): Promise<any> {
    const res = await request.get('/api/task/get/all', {
      params: params,
    });
    return res;
  }

  // 新增任务
  async createTask(params: any): Promise<any> {
    const res = await request.post('/api/task/create', {
      data: params,
    });
    return res;
  }

  // 删除任务
  async deleteTask(params: any): Promise<any> {
    const res = await request.post('/api/task/delete', {
      data: params,
    });
    return res;
  }
}
