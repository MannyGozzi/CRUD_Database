import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = ()=>{
    Axios.post('http://localhost:3001/api/insert', {movieName: movieName, movieReview: movieReview}).then(()=>{
      alert("successful insert");
    });
  };

  return (
    <div className="App">
      <h1>Crud Application</h1>
      <div className="form">
        <label>Movie Name:</label>
        <input type="text" name="movieName" onChange={(e)=>{
          setMovieName(e.target.value);
        }}/>
        <label>Review:</label>
        <input type="text" name="movieReview" onChange={(e)=>{
          setReview(e.target.value);
        }}/>

        <button onClick={submitReview}>Submit</button>
        {
          movieList.map((val)=>{
            return <h1>Movie Name: {val.movie_name} | {val.movie_review}</h1>
          })
        }
      </div>
    </div>
  );
}

export default App;
