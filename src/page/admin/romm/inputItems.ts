import { TInputs } from "./AdminRoom";

export type TInputItems = {
  type: string;
  placeHolder: string;
  reg: keyof TInputs;
};

export const inputItems: TInputItems[] = [
  {
    type: "text",
    placeHolder: "type room name",
    reg: "name",
  },
  {
    type: "number",
    placeHolder: "type room no:",
    reg: "roomNo",
  },
  {
    type: "number",
    placeHolder: "type room floor no:",
    reg: "floorNo",
  },
  {
    type: "number",
    placeHolder: "type room capacity",
    reg: "capacity",
  },
  {
    type: "number",
    placeHolder: "type price per slot",
    reg: "pricePerSlot",
  },
  {
    type: "text",
    placeHolder: "type amenities: whiteboard,projectors",
    reg: "amenities",
  },
];
