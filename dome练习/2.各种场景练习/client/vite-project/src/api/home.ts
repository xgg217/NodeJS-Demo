import service from '@/utils/request';

/**
 * 获取自己的信息
 */
const apiWhoami = () => {
  return service.get('/api/admin/whoami');
};

export {
  apiWhoami
}

