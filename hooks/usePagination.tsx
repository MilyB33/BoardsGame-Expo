import { useState } from 'react';

interface State {
  offset: number;
  limit: number;
}

const usePagination = (initialState?: State) => {
  const [pagination, setPagination] = useState(
    initialState || {
      offset: 0,
      limit: 5,
    }
  );

  const setOffset = () =>
    setPagination({
      ...pagination,
      offset: pagination.offset + pagination.limit,
    });

  const setLimit = (limit: number) =>
    setPagination({
      ...pagination,
      limit: limit,
    });

  return { setOffset, setLimit, pagination };
};

export default usePagination;
