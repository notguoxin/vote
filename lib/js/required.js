function genUID() {
  const length = 32
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    return match[2];
  }
  return null;
}

function setCookie(name, value, expires) {
  document.cookie = `${name}=${value}; expires=${expires};`;
}

// Check if the UID cookie exists
const uid = getCookie('UID');

if (!uid) {
  // If the UID cookie doesn't exist, generate a new UID and set the cookie to never expire
    const newUID = genUID();
    setCookie('UID', newUID, 'Fri, 31 Dec 9999 23:59:59 GMT');
}
document.getElementById("UID").innerHTML = `您的独特身份证名: <p style="color:red;display:inline;">${getCookie("UID")}</p>`