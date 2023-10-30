const isCorrectLength = (string, length) => string.length <= length;

const isPalindromeString = (string) => {
  const stringToLower = string.toString().toLowerCase().replaceAll(' ', '');
  let reverseString = '';

  for(let i = stringToLower.length - 1; i >= 0; i--){
    reverseString += stringToLower[i];
  }

  return stringToLower === reverseString;
};

const searchNumber = (string) => {
  let result = '';
  if(typeof string !== 'string'){
    string = String(string);
  }
  for(let i = 0; i < string.length; i++){
    if(!isNaN(parseInt(string[i], 10))){
      result += string[i];
    }
  }

  return result.length > 0? +result : Number.NaN;
};

const isPossibleMeeteing = (workingStart, workingEnd, meetingStart, meetingLength) => {
  workingStart = Number(workingStart.split(':')[0]) * 60 + Number(workingStart.split(':')[1]);
  workingEnd = Number(workingEnd.split(':')[0]) * 60 + Number(workingEnd.split(':')[1]);
  meetingStart = Number(meetingStart.split(':')[0]) * 60 + Number(meetingStart.split(':')[1]);
  const meetingEnd = meetingStart + meetingLength;

  return (workingStart <= meetingStart) && (meetingEnd <= workingEnd);
};

isCorrectLength('test', 4);
isPalindromeString('Кекс');
searchNumber(1.5);
isPossibleMeeteing();
