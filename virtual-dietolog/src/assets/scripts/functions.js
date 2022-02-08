import md5 from 'md5';
import userStore from "@store/user-store";
import {_slideUp} from "@scripts/slides";

export function handleHideShowPassword() {
   const inputs = document.querySelectorAll("input[data='password']")
   const passClose = document.querySelectorAll('.form__viewpass')
   inputs.forEach(input => {
      if (input.classList.contains('_active')) {
         input.setAttribute('type', 'password');
      } else {
         input.setAttribute('type', 'text');
      }
      input.classList.toggle('_active');
   })
   passClose.forEach(item => item.classList.toggle('_active'))
}

export function sortArrByObjName(arr) {
   return arr.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
   })
}

export function sortArrByName(arr) {
   return arr.sort((a, b) => {
      const nameA = a.toUpperCase();
      const nameB = b.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
   })
}

export function checkSelectProducts(allProducts, dataProducts = []) {
   let selectedProducts = [];
   let unSelectedProducts = [];
   const unSelectedProductsIds = [];
   
   selectedProducts = allProducts.map(pr => {
      const PR = {...pr};
      PR.selected = 0
      if (dataProducts.includes(Number(pr.id))) {
         PR.selected = 1
      }
      return PR
   })
   
   unSelectedProducts = allProducts.filter(pr => {
      const PR = {...pr};
      if (!PR.selected) {
         unSelectedProductsIds.push(PR)
         return PR
      }
   })
   
   return {selectedProducts, unSelectedProducts, unSelectedProductsIds}
}


export const delCookies = () => {
   document.cookie.split(";").forEach(function (c) {
      document.cookie = c
         .replace(/^ +/, "")
         .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
   });
}
export const delCookiesByName = name => {
   document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
export const convertMD5 = (pass) => {
   const encodedVal = md5(pass);
   return userStore.user.pass === encodedVal;
};

export const onHiddenColors = () => {
   const spoilerMainColor = document.querySelector('.spoilers_default.hidden');
   const spoilersArrow = document.querySelector('.spoilers_default__arrow');
   spoilersArrow.classList.remove('active')
   _slideUp(spoilerMainColor)
}
export const getAllCookies = () => {
   let cookies = document.cookie
   if (cookies) {
      cookies = cookies
         .split(';')
         .map(cookie => cookie.split('='))
         .reduce((accumulator, [key, value]) => (
            {...accumulator, [key.trim()]: decodeURIComponent(value)}
         ), {});
   }
   return cookies
}

export const unselectAllDraggableProducts = () => {
   const isDraggableProductSelected = document.querySelectorAll('.day__diet-item')
   isDraggableProductSelected.forEach(li => {
      li.classList.remove('isDraggableProductSelected', 'isDraggableProductDragging')
   })
}