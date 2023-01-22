export type Arithmetic = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type Operation = {
  fields: [string, string];
  arithmetic: Arithmetic;
  name?: string;
};
const multiplication = (v1: number, v2: number) => v1 * v2;
const addition = (v1: number, v2: number) => v1 + v2;
const division = (v1: number, v2: number) => v1 / v2;
const subtraction = (v1: number, v2: number) => v1 - v2;

// const chart = {
//   name: 'WideBandAFR',
//   yAxisLabel: 'AFR',
//   xAxisLabel: 'Date time',
//   xAxis: {
//     label: 'Date Time',
//   },
//   yAxis: {
//     label: 'AFR',
//     operation: {
//       name: 'AFR x TPS',
//       fields: ['wideBandAFR', 'TPS'],
//       arithmetic: 'multiplication',
//     },
//   },
//   values: [{afr: 14.6}, {afr: 14.7}].map((value) => {
//     return {
//       ...value,
//       'newKey': multiplication(value.afr, value.afr)
//     };
//   }),
// };

export const calculateArithmetic: ArithmeticOperation = (fieldValue1, fieldValue2, arithmetic) => {
  switch (arithmetic) {
    case "multiplication":
      return multiplication(fieldValue1, fieldValue2);
    case "division":
      return division(fieldValue1, fieldValue2);
    case "subtraction":
      return subtraction(fieldValue1, fieldValue2);
    case "addition":
    default:
      return addition(fieldValue1, fieldValue2);
  }
};
export type ArithmeticOperation = (fieldValue1: number, fieldValue2: number, arithmetic: Arithmetic) => number;

export type TableGroup = {
  fieldNames: string;
  operation?: Arithmetic;
  factor?: number;
}

export type BaseChartSettings = {
  xAxis: string;
}

export interface ChartSettings extends BaseChartSettings {
  name: string;
  yAxis: string;
  lineColor?: string;
  limits?: ChartRangeLimits;
}

// type Axis = {
//   name: string;
//   operation?: Operation;
// };

type ChartRangeLimits = {
  min: number;
  max: number;
}
