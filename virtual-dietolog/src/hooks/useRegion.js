import { useState } from 'react';

const regions = ['ua', 'ru', 'be'];
const getRegionNumber = (region) => {
  switch (region) {
    case 'ua':
      return '+38(999) 99 99 999';
    case 'ru':
      return '+7(999) 99 99 999';
    case 'be':
      return '+375(99)99 99 999';
    default:
      return '+38(999) 99 99 999';
  }
};
export const useRegions = () => {
  const [region, setRegion] = useState(regions);
  const regionNumber = getRegionNumber(region[0]);
  const changeRegion = (typeRegion) => {
    const newRegions = [...regions];
    const indexRegion = newRegions
      .map((item) => item.toUpperCase())
      .indexOf(typeRegion);
    const delReg = newRegions.splice(indexRegion, indexRegion + 1);
    newRegions.unshift(...delReg);
    setRegion(newRegions);
  };
  return { region, regionNumber, changeRegion };
};
