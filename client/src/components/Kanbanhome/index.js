import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";

import InputContainer from "../InputContainer";
import List from "../List";

import store from "../../utils/store";
import StoreApi from "../../utils/storeApi";

import "./styles.scss";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const addMoreCard = (title, listId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    axios
      .post("http://localhost:5000/tasks/modifyCards", newState)
      .then(() => setData(newState));
  };

  const removeCard = (index, listId) => {
    const list = data.lists[listId];

    list.cards.splice(index, 1);

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    axios
      .post("http://localhost:5000/tasks/modifyCards", newState)
      .then(() => setData(newState));
  };

  const updateCardTitle = (title, index, listId) => {
    const list = data.lists[listId];
    list.cards[index].title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    axios
      .post("http://localhost:5000/tasks/modifyCards", newState)
      .then(() => setData(newState));
  };

  const addMoreList = (title) => {
    if (!title) {
      return;
    }

    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    axios
      .post("http://localhost:5000/tasks/modifyCards", newState)
      .then(() => setData(newState));
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    axios
      .post("http://localhost:5000/tasks/modifyCards", newState)
      .then(() => setData(newState));
  };

  const deleteList = (listId) => {
    const lists = data.lists;
    const listIds = data.listIds;

    delete lists[listId];

    listIds.splice(listIds.indexOf(listId), 1);

    const newState = {
      lists: lists,
      listIds: listIds,
    };
    axios
      .post("http://localhost:5000/tasks/modifyCards", newState)
      .then(() => setData(newState));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "list") {
      const newListIds = data.listIds;

      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        listIds: newListIds,
      };
      axios
        .post("http://localhost:5000/tasks/modifyCards", newState)
        .then(() => setData(newState));

      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => card.id === draggableId
    )[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        },
      };
      axios
        .post("http://localhost:5000/tasks/modifyCards", newState)
        .then(() => setData(newState));
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList,
        },
      };
      axios
        .post("http://localhost:5000/tasks/modifyCards", newState)
        .then(() => setData(newState));
    }
  };
  return (
    <>
      {data.lists &&
        data.listIds && (
          <StoreApi.Provider
            value={{
              addMoreCard,
              addMoreList,
              updateListTitle,
              removeCard,
              updateCardTitle,
              deleteList,
            }}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                  <div
                    className="wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {data.listIds.map((listId, index) => {
                      const list = data.lists[listId];

                      return <List list={list} key={listId} index={index} />;
                    })}
                    <div>
                      <InputContainer type="list" />
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </StoreApi.Provider>
        )}
    </>
  );
}
