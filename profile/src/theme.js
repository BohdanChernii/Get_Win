// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

// @btn-disable-color: @disabled-color;
// @btn-disable-bg: @disabled-bg;
// @btn-disable-border: @border-color-base;
// @disabled-bg

const vars = {
   colors: {
      primary: {
         main: '#4E5AF2',
         dark: '#3843ED',
         light: '#5E6BF6',
         extraLight: '#DCDEFC',
      },
      success: {
         
         main: '#71D575',
         dark: '#58C65C',
         light: '#84DF88',
      },
      grey: {
         main: '#8D97B0',
         dark: '#6D7895',
         light: '#D2D8E8',
         extraLight: '#EDF2FF',
      }
   }
}

const modifyVars = {
   // primary
   'primary-color': vars.colors.primary.main,
   
   // link
   'link-color': vars.colors.primary.main,
   
   // Border
   'border-radius-base': '3px',
   
   // Buttons
   'btn-font-size-lg': '12px',
   'btn-font-weight': '600',
   'btn-height-base': '40px',
   
   // disabled
   'disabled-bg': vars.colors.primary.extraLight,
   'disabled-color': vars.colors.grey.main,
   // table
   'table-row-hover-bg': "#EDF2FF70",
   'table-selected-row-hover-bg': "#EDF2FF70",
   'dropdown-font-size': '12px',
   // checkbox
   
   'checkbox-size': '12px',
   'checkbox-color': vars.colors.success.main,
   'btn-padding-horizontal-base': '24px',
   
   // switch-color
   'switch-color': vars.colors.success.main,
   // switch-color
   'zindex-dropdown': 999,
   'zindex-modal': 998,
   'zindex-modal-mask': 998,
}
module.exports = modifyVars;