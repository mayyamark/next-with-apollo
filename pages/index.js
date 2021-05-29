import styles from '../styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";

export default function Home({ countries }) {
  console.log(countries);
  
  return (
    <div className={styles.grid}>
      {countries.map((country) => (
        <div key={country.code} className={styles.card}>
          <h1>{country.name} ({country.native}) </h1>
          <p>
            {country.code} - {country.emoji}
          </p>
          <p>Continent: {country.continent.name}</p>
          <p>Capital: {country.capital}</p>
          <p>Currency: {country.currency}</p>
          {country.languages.length > 0 && (
            <p>Languages: {country.languages.map(language => (
              `${language.name} (${language.native})`))
              .join(", ")}
            </p>)
          }
          {country.states.length > 0 && (
            <p>States: {country.states.map(state => state.name).join(", ")}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          native
          phone
          continent {
            code
            name
          }
          capital
          currency
          languages {
            code
            name
            native
            rtl
          }
          emoji
          states {
            code
            name
          }
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
 };
}