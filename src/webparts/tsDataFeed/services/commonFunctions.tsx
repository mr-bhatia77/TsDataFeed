import * as React from "react";

export const chapterOptionsMaker = (itemList: string[]) => {
  const chapterOptions: any[] = [
    <option value="Select Chapter" selected className="textItalic">Select Chapter</option>,
  ];
  if (itemList?.length) {
    itemList.forEach((item: any) => {
      chapterOptions.push(
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
      eventOptions.push(
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
      teamOptions.push(<option value={item.teamId}>{item.teamName}</option>);
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
