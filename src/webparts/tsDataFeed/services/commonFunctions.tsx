import * as React from "react";
import Form from "react-bootstrap/Form";

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

export const eventOptionsMaker = (
  itemList: any[],
  selectedEventId?: number
) => {
  const eventOptions: any[] = [
    <option value="Select Event">Select Event</option>,
  ];
  if (itemList?.length && itemList) {
    itemList.forEach((item: any) => {
      eventOptions.push(
        <option
          value={item.eventId}
          selected={item?.eventId == selectedEventId}
        >
          {item.eventName}
        </option>
      );
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

export const priorityOptionsMaker = (priority?: string) => {
  const teamOptions: any[] = [
    <option value="Select Team Priority">Select Team Priority</option>,
    <option value="A" selected={priority == 'A'}>A</option>,
    <option value="B" selected={priority == 'B'}>B</option>,
    <option value="C" selected={priority == 'C'}>C</option>,
    <option value="Mega" selected={priority == 'Mega'}>Mega</option>,
  ];
  return teamOptions;
};

export const getTeamAssociationCheckbox = (teamAssociation?: string)=>{
    const teamAssociationArray:string[] = teamAssociation?.split(';');
    const teamAssociationHashMap:{ [key: string]: number } = {};
    teamAssociationArray?.forEach((teamAssociation:string)=>{
        teamAssociationHashMap[teamAssociation]=1;
    })
    console.log(teamAssociationHashMap);
    const teamAssociationCheckboxes: any[] = [
        <Form.Check type="checkbox" label="Board" value="Board" />,
          <Form.Check type="checkbox" label="Camp" value="Camp" />,
          <Form.Check type="checkbox" label="Chair" value="Chair" />,
          <Form.Check type="checkbox" label="HH" value="HH" />,
          <Form.Check type="checkbox" label="Lapsed Team" value="Lapsed Team" />,
          <Form.Check
            type="checkbox"
            label="Planning Comm"
            value="Planning Comm"
          />,
          <Form.Check
            type="checkbox"
            label="RC Member/Team"
            value="RC Member/Team"
          />,
          <Form.Check type="checkbox" label="RC Secured" value="RC Secured" />,
          <Form.Check type="checkbox" label="Sponsor" value="Sponsor" />
    ]

    return teamAssociationCheckboxes;
}
