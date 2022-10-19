import React from 'react';
import {Container} from 'react-bootstrap';

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=f48f212a495c442f81d07819015f3a6d&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return <Container
    className="d-flex justify-content-center align-itens-center"
    
    >
        
        <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login com Spotify
        </a>
    </Container>
}