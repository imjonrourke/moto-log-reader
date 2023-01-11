export type Arithmetic = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type Operation = {
  fields: [string, string];
  arithmetic: Arithmetic;
  name?: string;
};

export type ArithmeticOperation = (fieldValue1: number, fieldValue2: number, arithmetic: Arithmetic) => number;

export type TableGroup = {
  fieldNames: string;
  operation?: Arithmetic;
  factor?: number;
}

type ChartSettings = {
  name: string;
  xAxis: string;
  yAxis: string;
  lineColor: string;
  limits: ChartRangeLimits;
};

type ChartRangeLimits = {
  min: number;
  max: number;
}
