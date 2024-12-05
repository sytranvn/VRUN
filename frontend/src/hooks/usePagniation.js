import { useState } from 'react';

const PAGE_SIZE = 10;

const INIT_STATE = {
  records: [],
  currentPage: 0, // default API param is 0
  pageSize: PAGE_SIZE,
  total: 1,
  totalCount: 0,
  isFullyLoaded: false,
};

const usePagination = (callback) => {
  const [list, setList] = useState(INIT_STATE);

  const loadList = async (payload = {}) => {
    const { pageSize, page, ...others } = payload;
    const limit = payload.pageSize || PAGE_SIZE;
    const skip = payload.page || list.currentPage;

    const resp = await callback({ limit, skip, ...others });

    const totalPage = Math.ceil(resp.count / limit);

    setList({
      records: resp.data || [],
      currentPage: skip,
      pageSize: limit,
      totalPage,
      totalCount: resp.count,
      isFullyLoaded: skip >= totalPage,
    });

    return resp;
  };

  const reset = async (payload = {}) => {
    setList(INIT_STATE);
    const resp = await loadList(payload);

    return resp;
  }

  return [list, loadList, reset];
};

export default usePagination;