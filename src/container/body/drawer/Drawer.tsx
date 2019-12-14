import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext
} from "react";
import styled from "styled-components";
import { Input, TextArea, DateTimeRange, Button } from "global-components";
import { MapMarker, AlignLeft, Clock, Text } from "icons/regular";
import DrawerHeader from "./DrawerHeader";
import { parseISO } from "date-fns";
import { Event } from "models";
import { AuthenticationContext } from "context/AuthenticationContext";

interface OwnProps {
  event?: Event;
  disableDrawerActions: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (eventId: string) => void;
}

const DrawerWrapper = styled.div<{ visible: number }>`
  height: 100%;
  position: absolute;
  background: white;
  transition: 0.3s right;

  ${props => (props.visible ? "right: 0px;" : "right: -400px;")}
`;

const DrawerContentWrapper = styled.div`
  padding: 16px;
  padding-top: 0px;
`;

const DrawerMask = styled.div<{ visible: number }>`
  position: absolute;
  overflow-x: hidden;
  top: 0;
  right: 0;
  height: 100%;

  ${props =>
    props.visible
      ? "background-color: rgba(0, 0, 0, 0.45); width: 100%;"
      : "width: 0;"}
`;

const DeleteButton = styled(Button)`
  background: white;
  color: red;
  margin: 0 8px;

  :hover {
    background: #fff5f5;
  }

  :active {
    background: #ffe0e0;
  }
`;

const Drawer = ({
  event,
  disableDrawerActions,
  onClose,
  onSave,
  onDelete
}: OwnProps) => {
  const [drawerVisible, setDrawerVisible] = useState(!!event);
  const [hasError, setHasError] = useState(false);
  const [eventName, setEventName] = useState(event?.name ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const [description, setDescription] = useState(event?.description ?? "");
  const [fromDate, setFromDate] = useState<Date | null>(
    event?.startTime ? parseISO(event.startTime) : null
  );
  const [toDate, setToDate] = useState<Date | null>(
    event?.endTime ? parseISO(event.endTime) : null
  );

  const { showAdminContent } = useContext(AuthenticationContext);
  const title = useMemo(() => {
    if (showAdminContent) {
      if (event?.id) {
        return "Modify an event";
      }
      return "Create an event";
    }

    return "View an event";
  }, [event, showAdminContent]);

  const saveIsDisabled = useMemo(() => {
    return hasError || !eventName || !fromDate || disableDrawerActions;
  }, [eventName, fromDate, hasError, disableDrawerActions]);

  const handleDelete = useCallback(() => {
    onDelete(event!.id);
  }, [event, onDelete]);

  const handleSave = useCallback(() => {
    onSave({
      id: event!.id,
      canBeRated: event!.canBeRated,
      description,
      name: eventName,
      location,
      ratings: [],
      startTime: fromDate ? fromDate.toISOString() : undefined,
      endTime: toDate ? toDate.toISOString() : undefined
    });
  }, [description, event, eventName, fromDate, location, onSave, toDate]);
  const handleDrawerClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    setDrawerVisible(!!event);
    setEventName(event?.name ?? "");
    setLocation(event?.location ?? "");
    setDescription(event?.description ?? "");
    setFromDate(event?.startTime ? parseISO(event.startTime) : null);
    setToDate(event?.endTime ? parseISO(event.endTime) : null);
  }, [event]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (drawerVisible) {
      window.addEventListener("keyup", handleKeyPress, false);

      return () => {
        window.removeEventListener("keyup", handleKeyPress, false);
      };
    }
  }, [onClose, drawerVisible]);

  const buttomButtons = useMemo(() => {
    if (!showAdminContent) {
      return null;
    }

    return (
      <>
        <Button disabled={saveIsDisabled} onClick={handleSave}>
          Save
        </Button>
        {event?.id && (
          <DeleteButton disabled={disableDrawerActions} onClick={handleDelete}>
            Delete
          </DeleteButton>
        )}
      </>
    );
  }, [
    disableDrawerActions,
    event,
    handleDelete,
    handleSave,
    saveIsDisabled,
    showAdminContent
  ]);

  return (
    <DrawerMask visible={drawerVisible ? 1 : 0} onClick={onClose}>
      <DrawerWrapper
        visible={drawerVisible ? 1 : 0}
        onClick={handleDrawerClick}
      >
        <DrawerHeader onClose={onClose}>{title}</DrawerHeader>
        <DrawerContentWrapper>
          <Input
            disabled={!showAdminContent}
            placeholder="Event name"
            icon={<Text />}
            value={eventName}
            onChange={setEventName}
          />
          <DateTimeRange
            disabled={!showAdminContent}
            icon={<Clock />}
            fromDate={fromDate}
            toDate={toDate}
            onFromChange={setFromDate}
            onToChange={setToDate}
            onError={setHasError}
          />
          <Input
            disabled={!showAdminContent}
            placeholder="Location"
            icon={<MapMarker style={{ paddingBottom: 3 }} />}
            value={location}
            onChange={setLocation}
          />
          <TextArea
            disabled={!showAdminContent}
            placeholder="Description"
            rows={5}
            icon={<AlignLeft />}
            value={description}
            onChange={setDescription}
          />
          {buttomButtons}
        </DrawerContentWrapper>
      </DrawerWrapper>
    </DrawerMask>
  );
};

export default Drawer;
