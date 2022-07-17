/* pages/index.js */
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import ABI from "../utils/ABI.json";

export const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/1fc7c7c3701c4083b769e561ae251f9a');

export default function Home(props) {
  /* events are fetched server side and passed in as props */
  /* see getServerSideProps */
  const { mintEvents, burnEvents } = props;

  return (
    <div>
      <div className={eventList}>
        {
          /* map over the requests array and render a button with the post title */
          mintEvents.map((event) => (
            <div key={event.txn}>
              <div className=" text-sm p-2 border-t border-gray-400">
              <div className="flex flex-col text-sm">
                <span className="text-gray-600 font-semibold">Txn Hash </span>
                <span className="font-bold">{event.date}</span>
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-gray-600 font-semibold">From </span>
                <span className="font-bold">{event.from}</span>
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-gray-600 font-semibold">Date </span>
                <span className="font-bold">{event.txn}</span>
              </div>
            </div>
            </div>
          ))
        }
      </div>
      <div className={eventList}>
        {
          /* map over the requests array and render a button with the post title */
          burnEvents.map((event) => (
            <div key={event.txn}>
              <div className=" text-sm p-2 border-t border-gray-400">
              <div className="flex flex-col text-sm">
                <span className="text-gray-600 font-semibold">Txn Hash </span>
                <span className="font-bold">{event.date}</span>
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-gray-600 font-semibold">From </span>
                <span className="font-bold">{event.from}</span>
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-gray-600 font-semibold">Date </span>
                <span className="font-bold">{event.txn}</span>
              </div>
            </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const wbtc = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const contract = new ethers.Contract(wbtc, ABI, provider);

  const mintEvents = await contract.queryFilter(contract.filters.Mint(), 15000000, 'latest');
  const burnEvents = await contract.queryFilter(contract.filters.Burn(), 15000000, 'latest');
  const mintEventsData = mintEvents.reverse().slice(0, 20);
  const burnEventsData = burnEvents.reverse().slice(0, 20);

  let txnHash, txn, blockNum, from, block, date;
  const mints = new Array();
  const burns = new Array();

  for (let i = 0; i < mintEventsData.length; i++) {
    txnHash = mintEventsData[i].transactionHash;
    txn = await provider.getTransaction(txnHash);
    from = txn.from;
    blockNum = txn.blockNumber;
    block = await provider.getBlock(blockNum);
    date = new Date(block.timestamp * 1000).toLocaleString();
    mints.push({date: date, from: from, txn: txnHash});
  };

  for (let i = 0; i < burnEventsData.length; i++) {
    txn = await provider.getTransaction(burnEventsData[i].transactionHash)
    from = txn.from
    blockNum = txn.blockNumber
    block = await provider.getBlock(blockNum);
    date = new Date(block.timestamp * 1000).toLocaleString();
    let temp = {date: date, from: from, txn: burnEventsData[i].transactionHash};
    burns.push(temp)
  }

  return {
    props: {
      mintEvents: JSON.parse(JSON.stringify(mints)),
      burnEvents: JSON.parse(JSON.stringify(burns))
    }
  };
}

const arrowContainer = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
`

const postTitle = css`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  padding: 20px;
`

const linkStyle = css`
  border: 1px solid #ddd;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
`

const eventList = css`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;  
`

const container = css`
  display: flex;
  justify-content: center;
`

const buttonStyle = css`
  margin-top: 100px;
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 44px;
  padding: 20px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const arrow = css`
  width: 35px;
  margin-left: 30px;
`

const smallArrow = css`
  width: 25px;
`
