import { useEffect } from 'react';
import activityStore from '@store/activity-store';
import eventStore from '@store/event-store';

const useActivitySelect = (selectValue) => {
  const { activityOption, setActivityOption } = activityStore;
  const { activities } = eventStore;

  const opt = activityOption?.find((item) => item.value === selectValue);
  const placeholder = activityOption?.length > 0 ? activityOption[0].label : '';

  useEffect(() => {
    const options = [];
    activities.forEach((item) => {
      const { label, id: value } = item;
      options.push({ label, value });
    });
    setActivityOption(options);
  }, []);
  return { opt, placeholder, activityOption };
};
export default useActivitySelect;
