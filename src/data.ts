var fs = require("fs");
const path = "./csv/";
export interface IAlbum {
  AlbumId: number;
  Title: string;
  ArtistId: number;
}
export interface IGenre {
  GenreId: number;
  Name: string;
}
export interface ITrack {
  TrackId: number;
  Name: string;
  AlbumId: number;
  MediaTypeId: number;
  GenreId: number;
  Composer: string;
  Milliseconds: number;
  Bytes: number;
  UnitPrice: number;
}
export interface IPlaylistTrack {
  PlaylistId: number;
  TrackId: number;
}
export interface IPlaylist {
  PlaylistId: number;
  Name: string;
}
export let albums: IAlbum[] = [];
export let genres: IGenre[] = [];
export let playlistTracks: IPlaylistTrack[] = []
export let playlists: IPlaylist[] = []
export let tracks: ITrack[] = []
export function read() {
  fs.readFile(path + "album.csv", "utf8", function (err: any, data: any) {
    var lines = data.split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      let brackets = lines[i].replace(/"/g, "").split(",");
      let newAlbum: IAlbum = {
        AlbumId: parseInt(brackets[0]),
        Title: brackets[1],
        ArtistId: +brackets[2],
      };
      albums.push(newAlbum);
    }
  });
  fs.readFile(path + "genre.csv", "utf8", function (err: any, data: any) {
    var lines = data.split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      let brackets = lines[i].replace(/"/g, "").split(",");
      let newgenre: IGenre = {
        GenreId: +brackets[0],
        Name: brackets[1],
      };
      genres.push(newgenre);
    }
  });
  fs.readFile(path + "playlist-track.csv", "utf8", function (err: any, data: any) {
    var lines = data.split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      let brackets = lines[i].replace(/"/g, "").split(",");
      let newPlaylistTrack: IPlaylistTrack = {
          PlaylistId: +brackets[0],
          TrackId: +brackets[1]
      };
      playlistTracks.push(newPlaylistTrack);
    }
  });
  fs.readFile(path + "playlist.csv", "utf8", function (err: any, data: any) {
    var lines = data.split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      let brackets = lines[i].replace(/"/g, "").split(",");
      let newPlaylist: IPlaylist = {
          PlaylistId: +brackets[0],
          Name: brackets[1]
      };
      playlists.push(newPlaylist);
    }
  });
  fs.readFile(path + "track.csv", "utf8", function (err: any, data: any) {
    var lines = data.split(/\r?\n/);
    for (let i = 1; i < lines.length; i++) {
      let brackets = lines[i].replace(/(, )/g, '; ').replace(/"/g, "").split(",");;
      let newTrack: ITrack = {
        TrackId: +brackets[0],
        Name: brackets[1],
        AlbumId: +brackets[2],
        MediaTypeId: +brackets[3],
        GenreId: +brackets[4],
        Composer: brackets[5],
        Milliseconds: +brackets[6],
        Bytes: +brackets[7],
        UnitPrice: +brackets[8]
      };
      tracks.push(newTrack);
    }
  });
}
