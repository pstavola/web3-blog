/* pages/__app.js */
import '../styles/globals.css'
import Link from 'next/link'
import { css } from '@emotion/css'
import 'easymde/dist/easymde.min.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className={nav}>
        <div className={header}>
          <Link href="/">
            <a>
              <img
                src='/logo.svg'
                alt="React Logo"
                style={{ width: '50px' }}
              />
            </a>
          </Link>
          <Link href="/">
            <a>
              <div className={titleContainer}>
                <h2 className={title}>WBTC Mint and Burn</h2>
                <p className={description}>The last 20 WBTC mint and burn requests</p>
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </div>
  )
}

const nav = css`
  background-color: white;
`

const header = css`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, .075);
  padding: 20px 30px;
`

const description = css`
  margin: 0;
  color: #999999;
`

const titleContainer = css`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`

const title = css`
  margin-left: 30px;
  font-weight: 500;
  margin: 0;
`

const link = css`
  margin: 0px 40px 0px 0px;
  font-size: 16px;
  font-weight: 400;
`

export default MyApp
