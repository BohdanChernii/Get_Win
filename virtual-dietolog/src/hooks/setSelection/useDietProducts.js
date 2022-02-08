import setSelectionStore from '@store/set-selection-store';
import { useEffect } from 'react';
import eventStore from '@store/event-store';

export const useDietProducts = () => {
  // const {diet, fetchDiet} = setSelectionStore;
  // const {activity_days} = eventStore;
  // const dietSource = []
  // if (diet) {
  //    let dietDays = JSON.parse(JSON.stringify(diet))
  //    dietDays.forEach((item) => {
  //       const [key] = Object.keys(item)
  //       if (key === 'w0') {
  //          const el = dietDays.splice(dietDays.indexOf(item), 1)
  //          dietDays = dietDays.concat(el)
  //       }
  //    })
  //
  //    dietDays.forEach(item => {
  //       const [key] = Object.keys(item);
  //       const {day: dayName} = activity_days.find(item => item.name === key);
  //       const dayNumber = Number(key.replace('w', ''));
  //
  //       const basket = [];
  //       Object.values(item).forEach(day => {
  //          Object.values(day).forEach(food => {
  //             food.forEach(item => {
  //                item.id = Number(item.id)
  //                item.take_food = Number(item.take_food)
  //                item.products = JSON.parse(item.products)
  //             })
  //             basket.push(...food);
  //          })
  //       })
  //       dietSource.push({dayName, dayNumber, basket})
  //    })
  // }
  // useEffect(() => {
  //    fetchDiet()
  // }, []);
  // return dietSource
};
