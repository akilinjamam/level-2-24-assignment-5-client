import { TSlotInputs } from "./UpdateAdminSlot";

export type TSlotInputItems = {
  type: string;
  placeHolder: string;
  reg: keyof TSlotInputs;
};

export const inputSlotItems: TSlotInputItems[] = [
  {
    type: "date",
    placeHolder: "type date:",
    reg: "date",
  },
  {
    type: "time",
    placeHolder: "type start time:",
    reg: "startTime",
  },
  {
    type: "time",
    placeHolder: "type room end time",
    reg: "endTime",
  },
];
export const inputSlotItemsForUpdate: TSlotInputItems[] = [
  {
    type: "date",
    placeHolder: "type date:",
    reg: "date",
  },
  // {
  //   type: "time",
  //   placeHolder: "type start time:",
  //   reg: "startTime",
  // },
  // {
  //   type: "time",
  //   placeHolder: "type room end time",
  //   reg: "endTime",
  // },
];
