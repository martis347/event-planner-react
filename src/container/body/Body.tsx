import React, { useState, useCallback, useMemo } from "react";
import CreateButton from "./create-button/CreateButton";
import UpcomingEvents from "./upcoming-events/UpcomingEvents";
import PastEvents from "./past-events/PastEvents";
import FullCalendar from "./full-calendar/FullCalendar";
import styled from "styled-components";
import Drawer from "./drawer/Drawer";
import { Event } from "models";
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
  height: 100%;
  padding: 0 12px;
  overflow-y: auto;
`;

const RightSideWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Body = () => {
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

  const [modifiedEvent, setModifiedEvent] = useState<Event | undefined>();
  const handleCreate = useCallback(() => {
    setModifiedEvent({
      description: "",
      id: "",
      location: "",
      name: "",
      startTime: undefined,
      endTime: undefined,
      canBeRated: false,
      ratings: []
    });
  }, []);

  const handleClose = useCallback(() => setModifiedEvent(undefined), []);

  const handleDelete = useCallback(
    async (eventId: string) => {
      const result = await deleteEvent({
        variables: {
          eventId
        },
        refetchQueries: ["upcomingEvents", "pastEvents"]
      });

      if (result.errors?.length) {
        console.log("error");
      } else {
        setModifiedEvent(undefined);
      }
    },
    [deleteEvent]
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

      if (result.errors?.length) {
        console.log("error");
      } else {
        setModifiedEvent(undefined);
      }
    },
    [createEvent, updateEvent]
  );

  return (
    <>
      <BodyWrapper>
        <LeftSideWrapper>
          <CreateButton onClick={handleCreate} />
          <UpcomingEvents onEventClick={setModifiedEvent} />
          <PastEvents onEventClick={setModifiedEvent} />
        </LeftSideWrapper>
        <RightSideWrapper>
          <FullCalendar />
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
