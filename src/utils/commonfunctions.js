// format date to human readable, eventullay use dayjs library foradvance formating
export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
}

export const isValidUsername = (username) => {
  // Regular expression to match username containing only alphabet, number, and underscore
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(username);
};

export const isValidPassword = (password) => {
  // Regular expression to match password with required criteria
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isValidEmail = (email) => {
  // Regular expression to match email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Function to generate a random string of specified length
export const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

//detect if the user is using a mobile device
export const isMobile = () => {
  return window.innerWidth < 768;
};

// Function to get the current user's location
export const getUserLocation = async () => {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data;
};

export const truncate = (text, length = 30) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  } else {
    return text;
  }
};

// detect and convert links withing a string to anchor tags
export const linkify = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" aria-label=${url} title=${url} target="_blank">${truncate(
      url
    )}</a>`;
  });
};
