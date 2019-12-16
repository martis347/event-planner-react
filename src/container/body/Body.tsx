import React, { useState, useCallback, useMemo, useEffect } from "react";
import CreateButton from "./create-button/CreateButton";
import UpcomingEvents from "./upcoming-events/UpcomingEvents";
import PastEvents from "./past-events/PastEvents";
import FullCalendar from "./full-calendar/FullCalendar";
import styled from "styled-components";
import Drawer from "./drawer/Drawer";
import { Event } from "models";
import { ALL_EVENTS, AllEventsData } from "./query";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import {
  EventCreateVars,
  CREATE_EVENT,
  EventModifyVars as EventUpdateVars,
  UPDATE_EVENT,
  DELETE_EVENT,
  EventDeleteVars
} from "./drawer/query";
import { ExecutionResult } from "apollo-boost";
import PerfectScrollbar from "react-perfect-scrollbar";

const BodyWrapper = styled.div`
  display: flex;
  height: calc(100% - 60px);
`;

const LeftSideWrapper = styled(PerfectScrollbar)`
  min-width: 250px;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 12px;
  overflow-y: auto;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

const RightSideWrapper = styled.div`
  width: 100%;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Body = () => {
  const { data } = useQuery<AllEventsData>(ALL_EVENTS);

  const [createEvent, { loading: saving }] = useMutation<
    Event,
    EventCreateVars
  >(CREATE_EVENT);
  const [updateEvent, { loading: updating }] = useMutation<
    Event,
    EventUpdateVars
  >(UPDATE_EVENT);
  const [deleteEvent, { loading: deleting }] = useMutation<
    never,
    EventDeleteVars
  >(DELETE_EVENT);
  const disableDrawerActions = useMemo(() => saving || updating || deleting, [
    deleting,
    saving,
    updating
  ]);
  const events = useMemo(() => data?.events ?? [], [data]);

  const [modifiedEvent, setModifiedEvent] = useState<Event | undefined>();
  const handleCreate = useCallback((initialDate?: Date) => {
    setModifiedEvent({
      description: "",
      id: "",
      location: "",
      name: "",
      startTime: initialDate?.toISOString?.() ?? undefined,
      endTime: undefined,
      canBeRated: false,
      reviews: []
    });
  }, []);

  const handleEdit = useCallback((event?: Event) => {
    setModifiedEvent(event);
    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      (event ? `?event=${event.id}` : "");
    window.history.pushState({ path: newurl }, "", newurl);
  }, []);
  const handleClose = useCallback(() => handleEdit(undefined), [handleEdit]);

  const handleDelete = useCallback(
    async (eventId: string) => {
      const result = await deleteEvent({
        variables: {
          eventId
        },
        refetchQueries: ["upcomingEvents", "pastEvents"]
      });

      handleEdit(undefined);
    },
    [deleteEvent, handleEdit]
  );

  const handleSave = useCallback(
    async (event: Event) => {
      let result: ExecutionResult<Event>;
      if (event.id) {
        result = await updateEvent({
          variables: {
            event: {
              id: event.id,
              description: event.description,
              location: event.location,
              name: event.name,
              endTime: event.endTime,
              startTime: event.startTime!
            }
          },
          refetchQueries: ["upcomingEvents", "pastEvents"]
        });
      } else {
        result = await createEvent({
          variables: {
            event: {
              description: event.description,
              location: event.location,
              name: event.name,
              endTime: event.endTime,
              startTime: event.startTime!
            }
          },
          refetchQueries: ["upcomingEvents", "pastEvents"]
        });
      }

      handleEdit(undefined);
    },
    [createEvent, handleEdit, updateEvent]
  );

  useEffect(() => {
    if (events.length > 0) {
      const urlParams = new URLSearchParams(window.location.search);
      const eventId = urlParams.get("event");
      const event = events.find(e => e.id === eventId)!;

      handleEdit(event);
    }
  }, [events, handleEdit]);

  return (
    <>
      <BodyWrapper>
        <LeftSideWrapper>
          <CreateButton onClick={handleCreate} />
          <UpcomingEvents onEventClick={handleEdit} />
          <PastEvents onEventClick={handleEdit} />
        </LeftSideWrapper>
        <RightSideWrapper>
          <FullCalendar
            events={events}
            onEventEdit={handleEdit}
            onEventCreate={handleCreate}
          />
        </RightSideWrapper>
      </BodyWrapper>
      <Drawer
        event={modifiedEvent}
        disableDrawerActions={disableDrawerActions}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Body;
