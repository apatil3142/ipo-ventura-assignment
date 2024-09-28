import React from "react"

export interface IColumnConfig{
  columnId: string,
  header: string,
  render?: (row: any) => React.ReactNode;
  alignContent?: 'left' | 'center' | 'right';
}

export interface ITableProps{
  columns: IColumnConfig[];
  data: any[];
}

export interface ITimelineProps {
  timeline: {label: string, date: string, completed: boolean}[]
}