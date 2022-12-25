export enum Position {
  Manager = 0,
  SoftwareDeveloper = 1,
  QAEngeneer = 2,
  Stuff = 3
}

export const showPosition = (value: Position) => {
  switch (value) {
    case 0:
      return 'Manager';
    case 1:
      return 'Software Developer';
    case 2:
      return 'QA Engineer';
    case 3:
      return 'Stuff';
  }
};
