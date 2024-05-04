import { useState } from 'react';
var jalaali = require('jalaali-js');

const useTimeConverter = (initialTime) => {

  const [convertedTime, setConvertedTime] = useState(initialTime);

  const convertTime = (mildadiTime) => {
    let { jy, jm, jd } = jalaali.toJalaali(mildadiTime);
    const jalaliTime = refactorFormat(`${jy}/${jm}/${jd} ${mildadiTime.getHours()}:${mildadiTime.getMinutes()}:${mildadiTime.getSeconds()}`);
    return setConvertedTime(jalaliTime);
  };

  return [convertedTime, convertTime];
};

export default useTimeConverter;