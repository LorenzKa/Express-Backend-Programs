import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as data from "./data";
import cors from "cors";
import { parse } from "path/posix";

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
let albums = data.readAlbums();
let genres = data.readGenres();
let playlistTracks = data.readPlaylistTracks();
let playlists = data.readPlaylists();
let tracks = data.readTracks();
//Get all playlists
app.get("/api/playlists", (req, res) => {
  res.send(playlists);
});

//Get tracks for a playlist
app.get("/api/playlisttracks/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (id) {
    const filteredTracks = playlistTracks.filter((c) => c.PlaylistId === id);
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
  res.send(genres);
});
//Get tracks for a certain genre
app.get("/api/tracks", (req: Request, res: Response) => {
  const genreId = parseInt(req.query.genreid + "");
  if (genreId) {
    res.send(tracks.filter((x) => x.GenreId == genreId));
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Send number");
  }
});
app.post("/api/track", (req: Request, res: Response) => {
  const playlistId = parseInt(req.body.playlistid);
  const trackId = parseInt(req.body.trackid);
  if (playlistId && trackId) {
    playlistTracks.push({ PlaylistId: playlistId, TrackId: trackId });
    res.send(playlistTracks[playlistTracks.length - 1]);
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Send 2 numbers");
  }
});
app.delete("/api/track", (req: Request, res: Response) => {
  const playlistId = parseInt(req.query.playlistid + "");
  const trackId = parseInt(req.query.trackid + "");
  if (playlistId && trackId) {
    const index = playlistTracks.findIndex(
      (x) => x.PlaylistId == playlistId && x.TrackId == trackId
    );
    if (index >= 0) {
      playlistTracks = playlistTracks.slice(index, 1);
      res.status(StatusCodes.NO_CONTENT).send();
    } else {
      res.status(StatusCodes.NOT_FOUND).send();
    }
  } else {
    res.status(StatusCodes.BAD_REQUEST).send("Send 2 numbers");
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
