/* pages/index.js */
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import ABI from "../utils/ABI.json";

export default function Home(props) {
  /* requests are fetched server side and passed in as props */
  /* see getServerSideProps */
  const { mintEvents, burnEvents } = props;

  console.log(mintEvents)
  console.log(burnEvents)

  return (
    <div>
      <div className={eventList}>
        {

        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const wbtc = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";
  const provider = new ethers.providers.JsonRpcProvider('https://rpc.flashbots.net');
  const contract = new ethers.Contract(wbtc, ABI, provider);
  const blockNumber = await provider.getBlockNumber();

  const mintEvents = await contract.queryFilter(contract.filters.Mint(), blockNumber-100000, blockNumber);
  const burnEvents = await contract.queryFilter(contract.filters.Burn(), blockNumber-100000, blockNumber);
  const mintEventsData = mintEvents.reverse().slice(0, 20);
  const burnEventsData = burnEvents.reverse().slice(0, 20);

  return {
    props: {
      mintEvents: JSON.parse(JSON.stringify(mintEventsData)),
      burnEvents: JSON.parse(JSON.stringify(burnEventsData))
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
