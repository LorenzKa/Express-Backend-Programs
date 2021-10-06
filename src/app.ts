import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as data from "./data";
import cors from "cors";
import { parse } from "path/posix";

require("dotenv").config();
data.read()
const app = express();
app.use(cors())
app.use(express.json());

//Get all playlists
app.get("/api/playlists", (req, res) => {
  res.send(data.playlists)
});

//Get tracks for a playlist
app.get("/api/playlisttracks/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id) {
    const filteredTracks = data.playlistTracks.filter((c) => c.PlaylistId === id);
    if (filteredTracks.length > 0) {
      res.status(StatusCodes.OK).send(filteredTracks);
    } else {
      res.status(StatusCodes.NOT_FOUND).send();
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Send number");
  }
});

//Get available genres
app.get("/api/genres", (req: Request, res: Response) => {
  res.send(data.genres)
});
//Get tracks for a certain genre
app.get("/api/tracks", (req: Request, res: Response) => {
  const genreId = parseInt(req.query.genreid + '')
  if(genreId){
    res.send(data.tracks.filter(x => x.GenreId == genreId))
  }
  else{
    res.status(StatusCodes.BAD_REQUEST).send("Send number")
  }
});
/*
app.post("/api/customers", (req, res) => {
  if (!req.body.id || !req.body.firstname || !req.body.lastname) {
    res.status(StatusCodes.BAD_REQUEST).send("Mandatory fields missing");
  } else {
    const newCustomerId = parseInt(req.body.id);
    if (customers.find((c) => c.id === newCustomerId)) {
      res.status(StatusCodes.BAD_REQUEST).send("already exists");
    } else {
      if (!newCustomerId) {
        res.status(StatusCodes.BAD_REQUEST).send("Id has to be a number");
      } else {
        const newCustomer: ICustomer = {
          id: newCustomerId,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        };
        customers.push(newCustomer);
        res
          .status(StatusCodes.CREATED)
          .header({ Location: `${req.path}/${req.body.id}` })
          .send(newCustomer);
      }
    }
  }
});
app.delete('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if(!id){
    res.status(StatusCodes.BAD_REQUEST).send('Parameter id must be a number')
  }
  else{
    customers.splice(id-1, 1)
    res.status(StatusCodes.NO_CONTENT).send();
  }
})
*/
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});