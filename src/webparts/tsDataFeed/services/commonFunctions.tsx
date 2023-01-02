import * as React from "react";

export const chapterOptionsMaker = (itemList: any[]) => {
  const chapterOptions: any[] = [
    <option value="Select Chapter">Select Chapter</option>,
  ];
  if (itemList?.length && itemList) {
    itemList.forEach((item: any) => {
      chapterOptions.push(
        <option value={item.chapterId}>{item.chapterName}</option>
      );
    });
  }
  return chapterOptions;
};

export const eventOptionsMaker = (itemList: any[],selectedEventId?: number) => {
  const eventOptions: any[] = [
    <option value="Select Event">Select Event</option>,
  ];
  if (itemList?.length && itemList) {
    itemList.forEach((item: any) => {
      eventOptions.push(<option value={item.eventId} selected={item?.eventId == selectedEventId}>{item.eventName}</option>);
    });
  }
  return eventOptions;
};

export const teamOptionsMaker = (itemList: any[]) => {
  const teamOptions: any[] = [<option value="Select Team">Select Team</option>];
  if (itemList?.length && itemList) {
    itemList.forEach((item: any) => {
      teamOptions.push(<option value={item.teamId}>{item.teamName}</option>);
    });
  }
  return teamOptions;
};
