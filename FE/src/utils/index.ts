export const emailValidation = (value: string) => {
  if (!new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(value)) return 'Email is invalid';
};
