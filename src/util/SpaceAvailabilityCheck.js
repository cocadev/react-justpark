import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

const getDayOfWeek = function (dayNum) {
  switch (dayNum) {
    case 0:
      return "sunday";
    case 1:
      return "monday";
    case 2:
      return "tuesday";
    case 3:
      return "wednesday";
    case 4:
      return "thursday";
    case 5:
      return "friday";
    case 6:
      return "saturday";
    default:
      return " ";
  }
};

//TODO: Edge case of last day of booking not being avalable 24 hours but booking end time still falls in range

const SpaceAvailabilityCheck = function (spotAvailability, userStart, userEnd) {
  //Checks if search time is more than one day
  let timeDifference = Math.abs(userEnd.getTime() - userStart.getTime());
  let differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

  console.log(`Diff days ${differentDays}`);

  //Day of the week for user search start and end times
  let userStartDay = getDayOfWeek(userStart.getDay());
  let userEndDay = getDayOfWeek(userEnd.getDay());

  //If start and end are on the same day it checks if its 24 hours if not it checks if user range falls in spot range
  if (userStart.getDate() === userEnd.getDate()) {
    let is24Hours = spotAvailability[`${userStartDay}`].available_24_hours;
    if (is24Hours === true) {
      return true;
    } else {
      //Splits time string at ":" to get hour/minute components
      let spotStart = String(spotAvailability[`${userStartDay}`].start).split(
        ":"
      );
      let spotEnd = String(spotAvailability[`${userEndDay}`].end).split(":");

      //Selects hour and minutes from split string
      let spotStartHour = spotStart[0];
      let spotStartMinute = spotStart[1];

      let spotEndHour = spotEnd[0];
      let spotEndMinute = spotEnd[1];

      //Date set to the day user is searching but time from spot availability
      let spotStartDate = new Date(
        parseInt(userStart.getFullYear()),
        parseInt(userStart.getMonth()),
        parseInt(userStart.getDate()),
        parseInt(spotStartHour),
        parseInt(spotStartMinute)
      );
      let spotEndDate = new Date(
        parseInt(userEnd.getFullYear()),
        parseInt(userEnd.getMonth()),
        parseInt(userEnd.getDate()),
        parseInt(spotEndHour),
        parseInt(spotEndMinute)
      );

      //Creates date range between the spots start and end time and checks if the user time falls in that range
      const range = moment.range(spotStartDate, spotEndDate);

      if (range.contains(userStart) && range.contains(userEnd)) {
        return true;
      } else {
        return false;
      }
    }
  } else {
    //If booking is on more than one day we check that each day during booking is available
    var day = userStart.getDay();
    for (var i = 0; i <= differentDays; i++) {
      let currentDay = getDayOfWeek(day);
      let is24 = spotAvailability[`${currentDay}`].available_24_hours;
      day += 1;
      if (day === 7) {
        day = 0;
      }

      if (is24 !== true) {
        return false;
      }
    }
    return true;
  }
};

export { SpaceAvailabilityCheck };
