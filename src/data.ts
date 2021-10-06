var fs = require('fs')

export interface IAlbum {
    AlbumId: number;
    Title: string;
    ArtistId: number;
}
export interface IGenre {
    GenreId: number;
    Name: string;
}
export interface ITracks {
    TrackId: number,
    Name: string,
    AlbumId: number,
    MediaTypeId: number,
    GenreId: number,
    Composer: string,
    Milliseconds: number,
    Bytes: number,
    UnitPrice: number
}
export interface IPlaylistTracks {
    PlaylistId: number,
    TrackId: number
}
export interface IAlbum {
    AlbumId: number,
    Title: string,
    ArtistId: number
}
export function read(){
    

}