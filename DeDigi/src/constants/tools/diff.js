import { horizontalTemplate, sideBySideTemplate, verticalTemplate } from '../../templates/DiffTemplate';

const diffType = {
  sideBySide: {
    id: 'sideBySide',
    name: 'side by side',
    template: sideBySideTemplate,
  },
  horizontal: {
    id: 'horizontal',
    name: 'horizontal',
    template: horizontalTemplate,
  },
  vertical: {
    id: 'vertical',
    name: 'vertical',
    template: verticalTemplate,
  },
};

export default diffType;
