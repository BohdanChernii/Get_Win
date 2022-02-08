import Inputmask from "inputmask";
import {input_focus_remove} from "@scripts/inputsInit";

export const initMask = (type, input) => {
   Inputmask(type, {
      placeholder: '',
      clearIncomplete: true,
      clearMaskOnLostFocus: true,
      showMaskOnHover: false,
      onincomplete: function () {
         input_focus_remove(input)
      },
   }).mask(input);
}

