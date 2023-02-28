const alertMessage = (message, type) => {
  const alertPlaceholder = document.getElementById('alert-placeholder');

  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <strong>${alertTypeMapper[type]}</strong>`,
    `   <div>${message}</div>`,
    '</div>'
  ].join('');

  alertPlaceholder.append(wrapper);

  setTimeout(() => alertPlaceholder.removeChild(wrapper), 2000);
}

const alertTypeMapper = {
  success: "Success",
  danger: "Error",
  warning: "Warning"
}