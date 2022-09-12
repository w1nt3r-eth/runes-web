import type { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-query";
import axios from "axios";

const names = ["Power", "Wealth", "Time", "Space", "Influence"];

const Home: NextPage = () => {
  const owners = useQuery("owners", () => axios.get("/api/leaderboard"));

  return (
    <div className="container">
      <Head>
        <title>Runes of Ethereum</title>
        <meta
          name="description"
          content="A secret collection of 5 NFTs for the most skilled Ethereum adepts"
        />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:image" content="https://runes.at/og-image.png" />
      </Head>
      <div className="sections">
        <div className="description">
          <h1>Runes of Ethereum</h1>
          <p>
            A secret collection of 5 NFTs for the most skilled Ethereum adepts.
          </p>
          <p>
            <strong>Rune of Power</strong> is awarded to the one who can find a
            number that hashes to a higher value than the previous owner.
          </p>
          <p>
            <strong>Rune of Wealth</strong> is given to the one willing to pay
            more than the previous owner. The payment is refunded when the rune
            finds a new owner.
          </p>
          <p>
            <strong>Rune of Time</strong> can only be claimed after waiting for
            a specific time interval.
          </p>
          <p>
            <strong>Rune of Space</strong> can only be claimed when the
            blockspace gets more dense (and expensive).
          </p>
          <p>
            <strong>Rune of Influence</strong> is given to the one who has the
            most votes from the holders of Punks, Crypto Coven, Loot and
            Blitmaps.
          </p>
          <p>
            <a href="https://etherscan.io/address/0x555555551777611fd8eb00df11ea0904b560cf74">
              0x555555551777611fd8eb00df11ea0904b560cf74
            </a>
          </p>
        </div>

        <div className="runes">
          {[1, 2, 3, 4, 5].map((id) => (
            <RuneTile
              key={id}
              id={id}
              delay={id * 100}
              owner={
                owners.data?.data.owners[id - 1].ens ||
                owners.data?.data.owners[id - 1].address
              }
            />
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 60px;
          min-height: 100vh;
        }
        .sections {
          display: flex;
          flex-direction: row;
          max-width: 1060px;
          gap: 54px;
        }
        @media only screen and (max-width: 880px) {
          .sections {
            flex-direction: column;
          }
        }
        .description {
          display: flex;
          flex-direction: column;
          flex: 2;
          gap: 24px;
        }
        h1 {
          margin: 0 0 12px 0;
          font-family: "Fondamento", "Times New Roman", Times, serif;
          font-style: normal;
          font-weight: 400;
          font-size: 48px;
        }
        p {
          margin: 0;
          line-height: 1.3;
          font-size: 15px;
          font-weight: 300;
        }
        p strong {
          font-family: "Fondamento";
          font-size: 110%;
        }
        a {
          font-variant-ligatures: none;
        }
        .runes {
          display: flex;
          flex: 3;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 32px;
        }
      `}</style>
    </div>
  );
};

function RuneTile({
  id,
  delay,
  owner,
}: {
  id: number;
  delay: number;
  owner: string | undefined | null;
}) {
  return (
    <a
      href={`https://opensea.io/assets/ethereum/0x555555551777611fd8eb00df11ea0904b560cf74/${id}`}
      target="_blank"
      rel="noreferrer noopener"
      className="container"
    >
      <Rune id={id} style={{ width: 140, height: 140 }} />
      <div className="name">{names[id - 1]}</div>
      <div className="owner">{owner || <>&nbsp;</>}</div>
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .container {
          width: 179px;
          height: 240px;
          display: flex;
          flex: 0 0 auto;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 40px;
          box-shadow: 0px 0px 2px 2px rgba(255, 255, 255, 0.25);
          opacity: 0;
          animation: fade-in 1000ms;
          animation-delay: ${delay}ms;
          animation-fill-mode: forwards;
        }
        .name {
          font-family: "Fondamento";
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
        }
        .owner {
          text-overflow: ellipsis;
          overflow: hidden;
          max-width: 200px;
          font-weight: 300;
        }
      `}</style>
    </a>
  );
}
function Rune({ id, style }: { id: number; style?: any }) {
  const paths = [
    "m135 99-5 162c0 7 5 12 11 12l7-1c6 0 11-5 11-11l-4-127c0-9 10-14 17-9l32 21c3 2 5 5 5 9l-5 106c0 6 5 11 11 11h8c6 0 11-5 11-11l-5-117c0-4-2-8-6-9a315 315 0 0 1-70-44c-7-6-18-2-18 8Z",
    "M138 117c2 71-1 118-3 139 0 7 5 13 12 13h3c6 0 11-6 11-12l-3-77c0-4 2-7 5-9l62-41c5-4 6-12 2-17l-2-2c-4-4-10-4-15-1-16 12-52 37-52 26v-11c0-4 2-8 6-10 13-7 42-22 42-26 0-6-5-11-9-15-3-3-8-3-12 0-9 7-27 17-27 10V73c0-5-4-9-9-10-5 0-11-1-15 2-7 3 3 34 4 52Z",
    "m162 260-1 1c-5 5-12 4-16 0l-53-60c-4-5-4-11 0-15l44-46c4-4 12-4 16 0l1 1c5 5 4 14-2 18-14 10-37 27-37 37 0 9 30 34 47 47 6 4 6 12 1 17ZM171 202l1 1c5 5 12 4 16 0l46-52c4-4 4-11 0-15l-54-57c-4-5-12-5-16 0l-2 2c-5 5-4 13 1 17 18 13 51 37 51 46 0 8-27 30-42 41-5 4-5 12-1 17Z",
    "M150 246c-3 5-10 6-14 2-5-4-4-12 1-15 11-8 27-20 27-25 0-6-18-21-29-31-6-5-6-13 0-18 11-10 29-25 29-30s-17-17-28-25c-5-4-5-11-1-16 5-4 12-4 16 2 8 10 19 25 24 25s17-15 25-26c4-5 12-5 16-1 4 5 2 12-2 15-12 8-28 20-28 26 0 5 18 20 30 30 5 5 5 13 0 18-12 10-30 27-30 31s16 16 26 23c4 3 5 10 2 14-4 5-12 5-16-1-7-10-18-24-23-24s-17 16-25 26Zm35-58c-5 5-12 5-16 1l-14-14c-4-4-4-10-1-15l13-14c4-4 11-4 16 0l13 15c4 4 4 10 0 15l-11 12Z",
    "M169 145c-7 0-1 65 2 91a10 10 0 1 1-20 1V87c0-9 10-14 17-10l52 34a10 10 0 1 1-12 16l-27-20-1-1c-5-4-13-1-14 6-1 5 0 11 3 14 6 6 32 19 46 26a9 9 0 1 1-10 16c-11-9-29-23-36-23Z",
  ];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 350"
      style={{ background: "#000", ...style }}
    >
      <path
        d={paths[id - 1]}
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#fff"
      />
    </svg>
  );
}

export default Home;
