import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'real_jibin';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    window.addEventListener('load', checkIfWalletIsConnected);
    return () => window.removeEventListener('load', checkIfWalletIsConnected);
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log('address', response.publicKey.toString());
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        console.log('no solana wallet found');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (!solana) return;

    const response = await solana.connect();
    setWalletAddress(response.publicKey.toString());
  };

  const renderNotConnectedContainer = () => {
    return (
      <button
        className="cta-button connect-wallet-button"
        onClick={connectWallet}
      >
        Connect to Wallet
      </button>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}

        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
