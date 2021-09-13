/*
 * @Time    : 2021/09/14 00:52:33
 * @Author  : DannyDong
 * @File    : index.ts
 * @Description: Api
 */

import request from 'umi-request';

export class KumiApi {
  // 获取所有任务
  async getTaskList(): Promise<any> {
    const res = await request.get('/api/task/get/all');
    return res;
  }
}
