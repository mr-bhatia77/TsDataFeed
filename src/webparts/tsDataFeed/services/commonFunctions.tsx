import * as React from "react";
import Form from "react-bootstrap/Form";
import {teamAssociationCheckList} from './constants';

export const chapterOptionsMaker = (itemList: string[]) => {
  const chapterOptions: any[] = [
    <option value="Select Chapter">Select Chapter</option>,
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
    <option value="Select Event">Select Event</option>,
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
    const teamAssociationCheckboxes: any[] = teamAssociationCheckList.map((item:string)=>{
        return <Form.Check type="checkbox" label={item} value={item} checked={teamAssociationHashMap[item] == 1}/>
    })

    return teamAssociationCheckboxes;
}
