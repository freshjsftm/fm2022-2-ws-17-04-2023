import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllMessages } from '../../store/chatSlice';

const ListMessages = () => {
  const { messages, isFetching, error } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);
  return (
    <section>
      {isFetching && <p>Loading....</p>}
      {error && <p>Error!!!</p>}
      <ul>
        {messages.length > 0 &&
          messages.map((msg) => (
            <li key={msg._id}>{msg.content} from {msg.user}</li>
          ))}
      </ul>
    </section>
  );
};

export default ListMessages;
