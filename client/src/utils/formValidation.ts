const createNameValidation = (message: string) => ({
  required: 'Это поле обязательно к заполнению',
  pattern: {
    value: /^[A-ZА-Я][A-Za-zА-Яа-я\s-]*$/,
    message,
  },
});

export const firstNameValidation = createNameValidation('Пожалуйста, введите корректное имя.');
export const middleNameValidation = createNameValidation('Пожалуйста, введите корректное отчество.');
export const lastNameValidation = createNameValidation('Пожалуйста, введите корректную фамилию.');

export const emailValidation = {
  required: 'Введите email',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'Неверный формат email',
  },
};

export const phoneValidation = {
  required: 'Введите номер телефона',
  pattern: {
    value: /^7[0-9]{10}$/,
    message: 'В формате 79xxxxxxx',
  },
};
