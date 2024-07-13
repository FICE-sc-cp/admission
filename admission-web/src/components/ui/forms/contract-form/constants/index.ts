interface IFirstStepRadioGroup {
  heading: string;
  options: string[];
}

export const firstStepRadioGroups: IFirstStepRadioGroup[] = [
  {
    heading: 'Освітній рівень(бакалавр/магістр)',
    options: ['Бакалавр', 'Магістр'],
  },
  {
    heading: 'Форма навчання (бюджет/контракт)',
    options: ['Бюджет', 'Контракт'],
  },
  {
    heading: 'Форма навчання (денна/заочна)',
    options: ['Денна', 'Заочна'],
  },
  {
    heading: 'Спеціальність',
    options: [
      '121 Інженерія програмного забезпечення',
      '123 Комп’ютерна інженерія',
      '126 Інформаційні системи та технології',
    ],
  },
];
