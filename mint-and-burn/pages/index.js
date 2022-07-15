/* pages/index.js */
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import Link from 'next/link'


/* import Application Binary Interface (ABI) */
// import Blog from '../artifacts/contracts/Blog.sol/Blog.json'

export default function Home(props) {
  /* requests are fetched server side and passed in as props */
  /* see getServerSideProps */
  const { requests } = props

  return (
    <div>
      <div className={postList}>
        {
          /* map over the requests array and render a button with the post title */
          requests.map((post, index) => (
            <Link href={`/post/${post[2]}`} key={index}>
              <a>
                <div className={linkStyle}>
                  <p className={postTitle}>{post[1]}</p>
                  <div className={arrowContainer}>
                  <img
                      src='/right-arrow.svg'
                      alt='Right arrow'
                      className={smallArrow}
                    />
                  </div>
                </div>
              </a>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/')
  }

  // const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
  // const data = await contract.fetchPosts()
  return {
    props: {
      requests: JSON.parse(JSON.stringify("test"))//data
    }
  }
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

const postList = css`
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
