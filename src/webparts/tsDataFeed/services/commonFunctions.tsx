import * as React from "react";
import { campNameList } from "./constants";

export const chapterOptionsMaker = (itemList: string[]) => {
  const chapterOptions: any[] = [
    <option value="Select Chapter" selected className="textItalic">Select Chapter</option>,
  ];
  if (itemList?.length) {
    itemList.forEach((item: any) => {
      item && chapterOptions.push(
        <option value={item}>{item}</option>
      );
    });
  }
  return chapterOptions;
};

export const eventOptionsMaker = (
  itemList: any[],
) => {
  const eventOptions: any[] = [
    <option value="Select Event" selected={true} className="textItalic">Select Event</option>,
  ];
  if (itemList?.length && itemList) {
    itemList.forEach((item: any) => {
      item && eventOptions.push(
        <option
          value={item.eventId}
        >
          {item.eventName}
        </option>
      );
    });
  }
//   console.log(eventOptions)
  return eventOptions;
};

export const teamOptionsMaker = (itemList: any[]) => {
  const teamOptions: any[] = [<option value="Select Team" className="textItalic" selected>Select Team</option>];
  if (itemList?.length && itemList) {
    itemList.forEach((item: any) => {
      item && teamOptions.push(<option value={item.teamId}>{item.teamName}</option>);
    });
  }
  return teamOptions;
};

export const priorityOptionsMaker = (priority?: string) => {
  const teamOptions: any[] = [
    <option value="Select Team Priority" className="textItalic">Select Team Priority</option>,
    <option value="A" selected={priority == 'A'}>A</option>,
    <option value="B" selected={priority == 'B'}>B</option>,
    <option value="C" selected={priority == 'C'}>C</option>,
    <option value="Mega" selected={priority == 'Mega'}>Mega</option>,
  ];
  return teamOptions;
};


export const staffLeadOptionsMaker = (itemList: string[],selectedStaffLead?: string) => {
  const staffLeadOptions: any[] = [
    <option value="Select Staff Lead" selected className="textItalic">Select Staff Lead</option>,
  ];
  if (itemList?.length) {
    itemList.forEach((item: any) => {
      item && staffLeadOptions.push(
        <option value={item} selected={item == selectedStaffLead}>{item}</option>
      );
    });
  }
  return staffLeadOptions;
};

export const campNameOptionsMaker = (selectedCampName?: string) => {
  const campNameOptions: any[] = [
    <option value="Select Camp" selected className="textItalic">Select Camp</option>,
  ];
  if (campNameList?.length) {
    campNameList.forEach((item: any) => {
      item && campNameOptions.push(
        <option value={item} selected={item == selectedCampName}>{item}</option>
      );
    });
  }
  return campNameOptions;
};

export const nationalManagerOptionsMaker = (itemList: string[],selectedNationalManager?: string) => {
  const nationalManagerOptions: any[] = [
    <option value="Select National Manager" selected className="textItalic">Select National Manager</option>,
  ];
  if (itemList?.length) {
    itemList.forEach((item: any) => {
      item && nationalManagerOptions.push(
        <option value={item} selected={item == selectedNationalManager}>{item}</option>
      );
    });
  }
  return nationalManagerOptions;
};