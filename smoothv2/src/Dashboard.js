import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import useAuth from './useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';

const spotifyApi = new SpotifyWebApi({
    clientId: "1b8ac1436a65485da7a98c2175bc9860"
})

export default function Dashboard({code}){
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")
    

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch("")
        setLyrics("")
      }
    
      useEffect(() => {
        if (!playingTrack) return
    
        axios
          .get("http://localhost:3001/lyrics", {
            params: {
              track: playingTrack.title,
              artist: playingTrack.artist,
            },
          })
          .then(res => {
            console.log(res.data)
            setLyrics(res.data.lyrics)
          })
      }, [playingTrack])

    useEffect(()=>{
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(()=>{
        if (!search) return setSearchResults([])
        if (!accessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            setSearchResults (res.body.tracks.items.map(track =>{
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) =>{
                        if (image.height < smallest.height) return image
                        return smallest
                    }, track.album.images[0])
                return {
                    // artist: track.artist[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url
                }
            }))
        })
        return () => cancel = true  
    }, [search, accessToken])


    return <Container className="d-flex flex-columm py-2" style ={{height: "100%"}}>
        <Form.Control type="search"
        style={{height: "10%"}}
        placeholder='Buscado de musicas e Artistas'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <div 
            className="flex-grow-1 my-2" 
            style={{overlflowY:"auto"}}>
            {searchResults.map(track =>(
                <TrackSearchResult 
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
            />
            ))}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {lyrics}
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
}