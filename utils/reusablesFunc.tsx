export const performOperation = (prev: number, curr: number, operator: string) => {
  switch (operator) {
    case '+':
      return prev + curr;
    case '-':
      return prev + curr;
    case '*':
      return prev + curr;
    case '/':
      return prev + curr;
    default:
      console.error(`Invalid Operator: ${operator}`)
      return 0;
  };
};