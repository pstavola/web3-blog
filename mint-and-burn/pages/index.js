/* pages/index.js */
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import React from "react";
import { useTable } from "react-table";
import ABI from "../utils/ABI.json";

export const provider = new ethers.providers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/2mkonj4jdaI86mtvzIFDn9rC0kp5zDbu');

export default function Home(props) {
  /* events are fetched server side and passed in as props */
  /* see getServerSideProps */
  const { mintEvents, burnEvents } = props;

  const columns = React.useMemo(
    () => [
      {
        Header: 'Txn Hash',  
        accessor: 'hash'  
      },
      {  
        Header: 'Date',  
        accessor: 'date'  
      },
      {  
        Header: 'From',  
        accessor: 'from'  
      }
    ],
    []
  ); 

  const mintData = React.useMemo(() => mintEvents);
  const burnData = React.useMemo(() => burnEvents);

  return (
    <div>
      <div className={eventList}><h2>Mint events</h2>
        <Table  
          columns={columns}
          data={mintData}
        />
      </div>
      <div className={eventList}><h2>Burn events</h2>
        <Table  
          columns={columns}
          data={burnData}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const wbtc = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const contract = new ethers.Contract(wbtc, ABI, provider);

  const mintEvents = await contract.queryFilter(contract.filters.Mint(), 1000000, 'latest');
  const burnEvents = await contract.queryFilter(contract.filters.Burn(), 1000000, 'latest');
  const mintEventsData = mintEvents.reverse().slice(0, 20);
  const burnEventsData = burnEvents.reverse().slice(0, 20);

  let txnHash, txn, blockNum, from, block, date;
  const mints = [];
  const burns = [];

  for (let i = 0; i < mintEventsData.length; i++) {
    txnHash = mintEventsData[i].transactionHash;
    txn = await provider.getTransaction(txnHash);
    from = txn.from;
    blockNum = txn.blockNumber;
    block = await provider.getBlock(blockNum);
    date = new Date(block.timestamp * 1000).toLocaleString();
    mints.push({hash: txnHash, date: date, from: from});
  };

  for (let i = 0; i < burnEventsData.length; i++) {
    txnHash = burnEventsData[i].transactionHash;
    txn = await provider.getTransaction(txnHash);
    from = txn.from;
    blockNum = txn.blockNumber;
    block = await provider.getBlock(blockNum);
    date = new Date(block.timestamp * 1000).toLocaleString();
    burns.push({hash: txnHash, date: date, from: from});
  };

  return {
    props: {
      mintEvents: JSON.parse(JSON.stringify(mints)),
      burnEvents: JSON.parse(JSON.stringify(burns))
    }
  };
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <table className="table" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const eventList = css`
  margin: 0 auto;
  padding-top: 10px;
`