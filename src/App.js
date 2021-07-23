import { Switch, Route, withRouter } from "react-router-dom";
import React, { Component } from 'react'
import MyNav from './components/MyNav'
import axios from 'axios'
import TodoList from "./components/TodoList";
import TodoDetail from "./components/SpotifyDetail";
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import { API_URL } from './config'
import NotFound from "./components/NotFound";
//import ChatBot from "./components/ChatBot";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SliderMockUp from "./components/SliderMockUp";
import booksJson from './books.json';
<<<<<<< HEAD
import Search from './components/Search';
import {Paper, Grid} from '@material-ui/core';

=======
import Search from './components/SearchTest';
import { Paper, Grid } from '@material-ui/core';
import Items from './components/Items';
>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8

//TEST PAGES 
import TestEmmy from './components/TestEmmy'
import TestShade from './components/TestShade'
import SearchTest from './components/SearchTest'
import Random from './components/Random'
import Profile from './components/Profile'

class App extends Component {

  state = {
    todos: [],
    user: null,
<<<<<<< HEAD
    myError: null, 
    fetchingUser: true, 
=======
    myError: null,
    fetchingUser: true,
    books: booksJson,
    filteredBooks: booksJson,
>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8
  }


  async componentDidMount() {
    try {
      // fetch all the initial todos to show on the home page
      let response = await axios.get(`${API_URL}/api/todos`, { withCredentials: true })
      console.log(response.data)
      this.setState({
        todos: response.data
      })


      // fetch the loggedInUser if present
      let userResponse = await axios.get(`${API_URL}/api/user`, { withCredentials: true })
      this.setState({
        user: userResponse.data,
        fetchingUser: false,
      })

    }
    catch (err) {
      console.log('Spotify fetch failed', err)
      this.setState({
        fetchingUser: false,
      })
    }
  }


  handleSignUp = async (event) => {
    event.preventDefault()
    // event.target here is a `<form>` node
    const { username, email, password } = event.target

    // our new user info
    let newUser = {
      username: username.value,
      email: email.value,
      password: password.value
    }

    // make a POST signup request to the server
    try {
      await axios.post(`${API_URL}/api/signup`, newUser, { withCredentials: true })
      this.props.history.push('/')
    }
    catch (err) {
      console.log('Signup failed', err)
    }
  }

<<<<<<< HEAD
=======


  componentDidUpdate() {
    console.log('App was updated')
  }



>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8
  handleSignIn = async (event) => {
    event.preventDefault()
    console.log('Sign in works!!!! Yippeeee')
    // event.target here is a `<form>` node
    const { email, password } = event.target

    // our new user info
    let myUser = {
      email: email.value,
      password: password.value
    }

    // make a POST signin request to the server
    try {
      let response = await axios.post(`${API_URL}/api/signin`, myUser, { withCredentials: true })
      this.setState({
        user: response.data
      }, () => {

        this.props.history.push('/')
      })

    }
    catch (err) {
      console.log('Signup failed', err.response.data)
      // axios vides us the server response in `response.data`
      // we put `.error` because our server gives us an object with an `error` key  
      this.setState({
        myError: err.response.data.error
      })
    }
  }


  handleLogOut = async () => {
    try {

      await axios.post(`${API_URL}/api/logout`, {}, { withCredentials: true })
      // clearing the user once they logout
      this.setState({
        user: null
      }, () => {
        this.props.history.push('/')
      })

    }
    catch (err) {
      console.log('Logout failed', err)
    }
  }




  handleSearch = (event) => {
    event.preventDefault()
    let searchedBook = event.target.value
    const { books } = this.state
    let filteredBooks = books.filter((book) => {
      return book.title.toLowerCase().includes(searchedBook.toLowerCase())
    })

    this.setState({
      filteredBooks: filteredBooks
    })

  }





  render() {
    console.log('App props', this.props)




    if (this.state.fetchingUser) {
      return <p>Loading . . . </p>
    }


    // ❗

    return (
      <div >
        <MyNav user={this.state.user} onLogOut={this.handleLogOut} />
        {/*<Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper >
              <Search onSearch={this.handleSearch} />
<<<<<<< HEAD

        
=======
              <Items books={this.state.filteredBooks}
                handleAddTotal={this.handleAddTotal}
                onAddNewBook={this.handleAddNewBook}
              />
>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper >

            </Paper>
          </Grid>
        </Grid>
        {/*  */}

        <SliderMockUp/>
        <Switch>

          

          <Route exact path={'/'} render={() => {
            return <TodoList todos={this.state.todos} />
          }} />

          <Route path="/signin" render={(routeProps) => {
            return <SignIn error={this.state.myError} onSignIn={this.handleSignIn} {...routeProps} />
          }} />

          <Route path="/signup" render={(routeProps) => {
            return <SignUp onSignUp={this.handleSignUp} {...routeProps} />
          }} />

<<<<<<< HEAD
              <Route  path="/signup"  render={(routeProps) => {
                return  <SignUp onSignUp={this.handleSignUp} {...routeProps}  />
              }}/>
              
              <Route component={NotFound} />
=======
>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8


          {/* <Route  exact path="/shade"  components={() => {
                return  <TestShade onSearch={this.handleSearch} />
              }}/> */}

<<<<<<< HEAD
<Route exact path="/z/:id" component={SingleBeer} />
=======
          <Route exact path="/shade" component={TestShade} />

          <Route path="/testemmy" render={(routeProps) => {
            return <TestEmmy error={this.state.myError} {...routeProps} />
          }} />

          <Route exact path="/random" component={Random}/>

          <Route path="/search" render={(routeProps) => {
            return <Search error={this.state.myError} {...routeProps} />
          }} />

          <Route path="/profile" render={(routeProps) => {
            return <Profile error={this.state.myError} {...routeProps} />
          }} />

>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8


<<<<<<< HEAD
=======
          <Route component={NotFound} />
>>>>>>> 78d16503f1a6bfa7a45e2d6eb2797b76a70bc9b8

        </Switch>
      </div>
    );
  }
}

export default withRouter(App);