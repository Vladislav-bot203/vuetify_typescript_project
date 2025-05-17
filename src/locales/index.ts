import { createI18n } from "vue-i18n";

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ru",
  messages: {
    en: {
      page: {
        title: "Create new interview | Interviews | Statistics"
      },  
      auth: {
        title: "LogIn | Create an acoount",
        eMailInputLabel: "E-mail",
        passwordInputLabel: "Password",
        passwordConfirmInputLabel: "Confirm your password",
        eMailInputPlaceholder: "Input your e-mail adress",
        passwordConfirmInputPlaceholder: "Confirm your password",
        passwordInputPlaceholder: "Input your password",
        buttonText: "LogIn | Create",
      },
      home: {
        companyInput: 'Company *',
        descriptionLinkInput: 'Company description link *',
        contactsNameInput: 'HR name *',
        telegramInput: 'Telegram username',
        whatsAppInput: 'WhatsApp',
        phoneInput: 'Phone number',
        buttonText: 'create'
      },
      interviews: {
        tableHeaders: {
            0: "Company",
            1: "HR Name",
            2: "Vacancy",
            3: "Contacts",
            4: "Passed stages",
            5: "Salary",
            6: "Result",
            7: "Actions"
        },
        descriptionLink: "Go to vacancy description" 
      }
    },
  },
});
