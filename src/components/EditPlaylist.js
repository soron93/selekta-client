import React, { Component } from 'react'
import axios from "axios";
import { API_URL } from "../config";
import {Link} from  'react-router-dom'
import { Button, TextField } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

class EditPlaylist extends Component {

    state = {
        playlist:null,
    }

    componentDidMount(){   // getting the db info from -> server -> db
        let playlistId = this.props.match.params.id  // from the ID in routes in App js keywords match.params.id 
        axios.get( `${API_URL}/api/playlist/${playlistId}`, { withCredentials: true } )
        .then((response) => {
          console.log(response.data)
          this.setState({ playlist:response.data}) // we update the state here 
        })
        .catch(() => {
          console.log("get fail");
        })
    }

    handleDelete=(trackId) =>{
        let playlistId = this.props.match.params.id
        axios.delete( `${API_URL}/api/playlist/${playlistId}/${trackId}`, { withCredentials: true } )
        .then((response) => {
            let newTracks = this.state.playlist.tracks.filter((track)=>{
                console.log(track._id, trackId)
                return track._id != trackId
            })
            let clone = JSON.parse(JSON.stringify(this.state.playlist)) 
            clone.tracks = newTracks
            console.log(clone.tracks)
          this.setState({ playlist:clone}) // we update the state here 
        })
        .catch((err) => {
          console.log("delete fail",err);
        })
    }


    handleChange=(event) =>{
        let newName = event.target.value
        let clone = JSON.parse(JSON.stringify(this.state.playlist)) 
        clone.name = newName
        this.setState({ playlist:clone})
    }


    handleSave=() =>{
        let playlistId = this.props.match.params.id 
        axios.patch( `${API_URL}/api/playlist/${playlistId}`, {name:this.state.playlist.name}, { withCredentials: true } )
        .then((response) => {
            this.props.history.push('/profile')
        })
        .catch(() => {
          console.log("get fail");
        })

    }

    render() {
        if (!this.state.playlist) {
            return <p>Loading . . . </p>;
          }
        return (
            <div>
                {/* Playlist */}
            
                
                  <TextField
                    onChange={this.handleChange}
                    tracks={this.props.tracks}
                    id="standard-basic"
                    name="Save"
                  value={this.state.playlist.name}/>
                  <Button 
                  
                  variant="contained"
                    color="primary"
                  onClick={this.handleSave}> 
                  <SaveAltIcon/>
                  Save 
                  </Button>
             

                
                <Container>
                    





                {
            this.state.playlist.tracks.map((track) => {
              return <p>{track.name} <Button 
              variant="contained"
              color="primary"
              onClick={() => {this.handleDelete(track._id)}}>
              <DeleteForeverIcon/> 
              {/* Delete */}
              </Button></p>
              
            })
          }
          
        
          </Container>
    </div>
        )
    }
}
export default EditPlaylist