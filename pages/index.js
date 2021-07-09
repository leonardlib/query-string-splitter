import { useState } from 'react'
import Head from 'next/head'
import {Button, TextField} from "@material-ui/core";

import { isURL } from '../utils'

import styles from '../styles/Home.module.css'

const Home = () => {
  const [url, setUrl] = useState('')

  const handleSplitButton = () => {
    if (!isURL(url)) {
      alert('Error')
      return
    }

    const urlParams = new URLSearchParams(url);
    const entries = urlParams.entries();

    for(const entry of entries) {
      console.log(`${entry[0]}: ${entry[1]}`);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Query String Splitter</title>
        <meta name="description" content="Get the name and the value of the query parameters from a URL string" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Query String Splitter
        </h1>
        <p className={styles.description}>
          Get the name and the value of the query parameters from a URL string
        </p>
        <div className={styles.grid}>
          <TextField
            variant="outlined"
            value={url}
            fullWidth
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSplitButton()}
            label="Paste your URL here"
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleSplitButton}
            style={{ marginTop: 10 }}
          >
            Split URL
          </Button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://twitter.com/leonard_lib"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @leonard_lib
        </a>
      </footer>
    </div>
  )
}

export default Home
