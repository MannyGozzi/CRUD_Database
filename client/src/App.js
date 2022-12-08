import React, {useState, useEffect} from 'react';
import Axios from 'axios'
import './App.css';

function App() {

  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/get').then((response)=>{
      console.log(response.data);
      setMovieList(response.data);
    });
  }, []);

  const submitReview = ()=>{
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: movieReview
    });

    setMovieList([
      ...movieList, 
      {movie_name: movieName, movie_review: movieReview}
    ]);
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3001/api/delete/${movieName}`);
  }

  const updateReview = (movieName) => {
    Axios.put('http://localhost:3001/api/update', {
      movieName: movieName,
      movieReview: newReview
    });

    setNewReview("");
  }

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
            return (
              <div className="card" key={val.movieName}>
                <h1>{val.movie_name}</h1>
                <p>Movie Review: {val.movie_review}</p>
                <button onClick={()=>{deleteReview(val.movie_name)}}>Delete</button>
                <input type="text" id="updateInput" onChange={(e)=>{
                  setNewReview(e.target.value);
                }}/>
                <button onClick={()=>{updateReview(val.movie_name)}}>Update</button>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default App;
