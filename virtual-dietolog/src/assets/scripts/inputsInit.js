//Placeholers
// todo: just add code to useEffect

export function inputs_init() {
  let inputs = document.querySelectorAll(
    'input[data-value],textarea[data-value]'
  );
  if (inputs.length > 0) {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      const input_g_value = input.getAttribute('data-value');
      input_placeholder_add(input);
      if (input.value != ('' && null) && input.value != input_g_value) {
        input_focus_add(input);
      }
      input.addEventListener('focus', function () {
        if (input.value == input_g_value) {
          input_focus_add(input);
          input.value = '';
        }
        if (input.getAttribute('data-type') === 'pass') {
          input.setAttribute('type', 'password');
        }
        input_remove_error(input);
      });
      input.addEventListener('blur', function () {
        if (input.value == '') {
          input.value = input_g_value;
          input_focus_remove(input);
          if (input.classList.contains('_mask')) {
            input_clear_mask(input, input_g_value);
          }
          if (input.getAttribute('data-type') === 'pass') {
            input.setAttribute('type', 'text');
          }
        }
      });
    }
  }
}
export function input_placeholder_add(input) {
  const input_g_value = input.getAttribute('data-value');
  if (input.value === '' && input_g_value != '') {
    input.value = input_g_value;
  }
}
export function input_focus_add(input) {
  input.classList.add('_focus');
  input.parentElement.classList.add('_focus');
  input.parentElement.parentElement.classList.add('_focus');
}
export function input_focus_remove(input) {
  input.classList.remove('_focus');
  input.parentElement.classList.remove('_focus');
  input.parentElement.parentElement.classList.remove('_focus');
}
export function input_clear_mask(input, input_g_value) {
  input.inputmask.remove();
  input.value = input_g_value;
  input_focus_remove(input);
}

export function input_add_error(input) {
  input.classList.add('_error');
  input.parentElement.classList.add('_error');
  input.parentElement.parentElement.classList.add('_error');

  let input_error = input.parentElement.querySelector('.form__error');
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
  let input_error_text = input.getAttribute('data-error');
  if (input_error_text && input_error_text != '') {
    input.parentElement.insertAdjacentHTML(
      'beforeend',
      '<div class="form__error">' + input_error_text + '</div>'
    );
  }
}
export function input_remove_error(input) {
  input.classList.remove('_error');
  input.parentElement.classList.remove('_error');
  input.parentElement.parentElement.classList.remove('_error');

  let input_error = input.parentElement.querySelector('.form__error');
  if (input_error) {
    input.parentElement.removeChild(input_error);
  }
}
export function input_view_password(viewPassIcons) {
  for (let index = 0; index < viewPassIcons.length; index++) {
    const element = viewPassIcons[index];

    element.addEventListener('click', function (e) {
      const iconParentConteiner = e.target.offsetParent;
      if (element.classList.contains('_active')) {
        iconParentConteiner
          .querySelector('input')
          .setAttribute('type', 'password');
      } else {
        iconParentConteiner.querySelector('input').setAttribute('type', 'text');
      }
      element.classList.toggle('_active');
    });
  }
}
