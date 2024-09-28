import React from 'react';
import { ITableProps } from '../interface';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
  overflow: hidden;
`;

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  &:hover{
    background-color: #f1f1f1;
  }
`;

const ColumnRow = styled(TableRow)`
  padding: 8px 0;
  background-color: #F5F5F5;
`;

const Cell = styled.div`  
  text-align: center;
  flex: 1;
  padding: 8px;
`;

const HeaderCell = styled(Cell)`
  color: #686868;
`;

const Table: React.FC<ITableProps> = ({columns, data}) => {
  return (
    <Container>
      <ColumnRow>
      {columns.map(col => (
        <HeaderCell key={col.columnId}>{col.header}</HeaderCell>
      ))
      }
      </ColumnRow>
      {
        data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map(col => (
              <Cell key={col.columnId}>
                {col.render ? col.render(row) : row[col.columnId]}
              </Cell>
            ))}
          </TableRow>
        ))
      }
    </Container>
  )
}

export default Table
