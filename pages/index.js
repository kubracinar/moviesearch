import Head from 'next/head'
import getConfig from "next/config";
import {useEffect, useState} from "react";
import Movie from "../src/components/movie";


const {serverRuntimeConfig,publicRuntimeConfig}=getConfig()
export default function Home(initialData) {
    const [searchResults,setSearchResults]=useState([])
    useEffect(()=>{
        setSearchResults(initialData.trendingMovies.results)
    },[initialData])
  return (
    <div className="container">
      <Head>
        <title>Movie Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <div className="movie-search-results-grid">
          {searchResults.map((each,index) => {
              return(
                  <Movie index={each.id} title={each.title} poster_path={each.poster_path} overview={each.overview}/>
              )
          })
          }
      </div>
    </div>
  )
}
export async function getServerSideProps(context) {
    let trendingMovies= await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=e57d160f1c4a508eec29f8eb87c52487')
    trendingMovies =await trendingMovies.json()
    console.log(trendingMovies);
    return {
        props: {trendingMovies:trendingMovies}, // will be passed to the page component as props
    }
}
