import {HIDE_BANNER, SHOW_BANNER, SHOW_TESTING_MODAL} from "@store/types";

export const showBanner = () => ({type: SHOW_BANNER});
export const hideBanner = () => ({type: HIDE_BANNER});

export const showTestingModal = bool => ({type: SHOW_TESTING_MODAL, payload: bool});

