import {createMuiTheme} from "@material-ui/core";
const orangeColor = '#E9856b';

export const Orange = createMuiTheme({
   overrides: {
      MuiPickersToolbar: {
         toolbar: {
            backgroundColor: orangeColor,
         },
      },
      MuiPickersCalendarHeader: {
         switchHeader: {
            // backgroundColor: lightBlue.A200,
            // color:  lightBlue.A200,
         },
      },
      MuiPickersDay: {
         day: {
            color: '#323339',
         },
         daySelected: {
            backgroundColor: orangeColor,
         },
         dayDisabled: {
            // color: lightBlue["100"],
         },
         current: {
            // color: lightBlue["900"],
            border: `1px solid ${orangeColor}`,
         },
      },
      MuiPickersClock: {
         pin: {
            color: '#323339',
         }
      }
      // MuiPickersModal: {
      //    dialogAction: {
            // color: orangeColor,
      //    },
      // },
      
   },
});


