import eventStore from '@store/event-store';

const useActivityDuration = (id) => {
  const options = eventStore.activity_duration.map((item) => ({
    label: item.name,
    value: item.value,
  }));
  const opt = eventStore.activity_duration?.find((item) => item.id == id);
  let optValue;
  if (id) {
    optValue = {
      label: opt?.name,
      value: opt?.value,
    };
  } else optValue = null;

  const placeholder = options?.length > 0 ? options[0].label : '';

  return { options, placeholder, optValue };
};

export default useActivityDuration;
