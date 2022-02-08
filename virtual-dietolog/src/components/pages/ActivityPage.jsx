import React, { useState } from 'react';
import ActivityCalendar from '@/components/content/ActivityCalendar.jsx';
import AddEventsDialog from '@/components/feature/modals/EventsDialog.jsx';
import ActivityDashboard from '@/components/feature/dashboards/ActivityDashboard.jsx';
import { observer } from 'mobx-react-lite';
import eventStore from '@store/event-store';
import activityStore from '@store/activity-store';
import InfoActivityDialog from '@/components/feature/modals/InfoActivityDialog.jsx';

function ActivityPage() {
  document.title = 'Виртуальный диетолог | Активности';

  const [postType, setPostType] = useState('add');

  const [openEventDialog, setOpenEventDialog] = useState(false);
  const handleOnChangeDialog = () => setOpenEventDialog((prev) => !prev);

  const [openInfoSelectDates, setOpenInfoSelectDates] = useState(false);
  const handleOnChangeInfoSelectDates = () =>
    setOpenInfoSelectDates((prev) => !prev);
  const [idEvent, setIdEvent] = useState(null);
  // DialogEvents ==================================================================
  const [dates, setDates] = useState({
    date_start: null,
    date_end: null,
  });
  const handleOnEditEvent = (id) => {
    const event = { ...eventStore.data.activity_events[id] };
    for (let key in event) {
      if (key in activityStore.eventInfo) {
        activityStore.setEventInfo(key, event[key]);
      }
      if ('duration' in event) {
        const { id } = eventStore.activity_duration.find(
          (item) => item.value === event.duration
        );
        activityStore.setEventInfo('activity_duration', id);
      }
    }

    for (let key in activityStore.eventDisabledDay) {
      activityStore.setDisabledDay(key, false);
    }

    for (let key in event) {
      if (key in activityStore.eventSelectedDay) {
        const timeDifference =
          new Date(activityStore.eventInfo.date_end).getTime() -
          new Date(activityStore.eventInfo.date_start).getTime();
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        let x = 0;
        let day = new Date(activityStore.eventInfo.date_start).getDate();
        while (x < daysDifference) {
          const date = new Date(
            new Date(activityStore.eventInfo.date_start).setDate(day)
          ).getDay();
          activityStore.setDisabledDay(`w${date}`, true);
          if (activityStore.eventInfo[key] == 1) {
            activityStore.setChangeDay(key, true);
          }
          x++;
          day++;
        }
      }
    }
    setIdEvent(id);
    setPostType('edit');
    handleOnChangeDialog();
  };
  // useEffect ==================================================================

  return (
    <>
      <div className="headline-box">
        <h2 className="_title">Активности</h2>
        <AddEventsDialog
          postType={postType}
          changePostType={setPostType}
          idEvent={idEvent}
          dates={dates}
          setDates={setDates}
          open={openEventDialog}
          changeDialog={handleOnChangeDialog}
        />
      </div>
      <ActivityDashboard />
      <ActivityCalendar
        canEventChange={true}
        setDates={setDates}
        changeDialog={handleOnChangeDialog}
        changeInfoSelectDates={handleOnChangeInfoSelectDates}
        editEvent={handleOnEditEvent}
      />
      <InfoActivityDialog
        open={openInfoSelectDates}
        changeDialog={handleOnChangeInfoSelectDates}
      />
    </>
  );
}

export default observer(ActivityPage);
