module.exports = function createMessage(name, surname, email) {
  return {
    from: 'softmaster@internet.ru',
    to: email,
    subject: 'Корпоративный портал SoftMaster',
    html: `
            <h4 style="padding: 10px;background-color: #50526e;color: #fff;">Тема: Доступ в SoftMaster</h4>
            <h1 style="color: #3f4259">${name} ${surname},</h1>
            <p style="padding:10px;background-color: #f8f9fa;color: #50526e;font-size:18px">Вам открыт доступ в Корпоративный портал.\n
            При первом входе по электронному адресу ${email} ваш пароль будет сохранен. \n
            Дальнейшая авторизация в портал будет осуществлена по нему.
            </p>
            <h3 style="color: #3f4259">С наилучшими пожеланиями, команда SoftMaster.</h3>
            <div style="color: var(--bs-gray); font-size: 14px; margin-top: 20px">email для обратной связи: softmaster@internet.ru</div>
      `,
  };
};
