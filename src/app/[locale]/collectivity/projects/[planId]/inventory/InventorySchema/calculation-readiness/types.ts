export type CalculationReadinessIssue = {
  path: (string | number)[];
  message: string;
};

export type CalculationReadinessResult =
  | { success: true }
  | { success: false; error: { issues: CalculationReadinessIssue[] } };
