import { useState } from 'react'
import Head from 'next/head'
import {
  Button,
  TableContainer,
  TextField,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fade,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import { isURL } from '../utils'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [url, setUrl] = useState('')
  const [params, setParams] = useState(null)
  const [error, setError] = useState(null)

  const handleSplitButton = () => {
    setError(null);

    if (!isURL(url)) {
      setError('The string is not a valid URL')
      return
    }

    const urlParams = new URLSearchParams(url.split('?')[1]);
    setParams(Object.fromEntries(urlParams.entries()));
  };

  const handleClearButton = () => {
    setUrl('');
    setError(null);
    setParams(null);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Query String Splitter</title>
        <meta name="google-site-verification" content="CWE3cMGLzGlJN8o3lkU-XWrZQxe97DLLJNCFmcKZoCI" />
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
        {error && (
          <Fade in>
            <Alert severity="error">{error}</Alert>
          </Fade>
        )}
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
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            size="large"
            onClick={handleClearButton}
            style={{ marginTop: 10 }}
          >
            Clear
          </Button>
        </div>
        {params && (
          <Fade in>
            <div className={styles.grid}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.bold}>Parameter</TableCell>
                      <TableCell className={styles.bold}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(params).map(key => (
                      <TableRow key={key}>
                        <TableCell className={styles.bold}>{key}</TableCell>
                        <TableCell className={styles.wrap}>{params[key]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Fade>
        )}
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
