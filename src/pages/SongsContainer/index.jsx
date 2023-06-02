import { BsPlayCircleFill } from 'react-icons/bs';
import styles from './style.module.css'
import { GiLouvrePyramid } from 'react-icons/gi';

function SongsContainer({ defaultSongs,setSongPlayed,setIsSongPlaying }) {
  return (<>
    <div className={styles.mainDiv}>
      {defaultSongs?.length > 0 ? (
        defaultSongs.map((song, i) => (
          <div className={styles.song} onClick={() => {setSongPlayed(song),setIsSongPlaying(true)}} key={i}>
            <div className={styles.imgAndButton}>
              <img className={styles.songImg} src={song.channel.icon}  onError={(e) => {
                  e.target.src =  song.thumbnail.url, console.log(e.target.src);
                        }} alt={song.title} />
              <BsPlayCircleFill className={`${styles.songButton} ${styles.redButton}`} size={40} />
            </div>
            <h3>{song.title.split(/[\(\[]/)[0].trim().replace(/(.*)\s*-\s*(.*)/, '$2\n$1').trim().slice(0, 50)}</h3>
          </div>/*song.channel.icon? song.channel.icon : song.thumbnail.url*/
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </div>
    </> );
  
}

export default SongsContainer
// .channel.icon / thumbnail.url 
//song.title.split(/[\(\[]/)[0].trim().slice(0,65).replace(/ ?- ?/g, "\n")

{/*song.album.cover_medium*/}{/*song.title*/}{/*song.title_short*/}{/*song.artist.name*/}

// To access the different properties in the provided object, you can use dot notation or bracket notation. Here's how you can access each property:

// For the album:
// - `cover`: `object.album.cover`
// - `cover_big`: `object.album.cover_big`
// - `cover_medium`: `object.album.cover_medium`
// - `cover_small`: `object.album.cover_small`
// - `cover_xl`: `object.album.cover_xl`

// For the artist:
// - `picture`: `object.artist.picture`
// - `picture_big`: `object.artist.picture_big`
// - `picture_medium`: `object.artist.picture_medium`
// - `picture_small`: `object.artist.picture_small`
// - `picture_xl`: `object.artist.picture_xl`

// For the track:
// - `duration`: `object.duration`
// - `explicit_content_cover`: `object.explicit_content_cover`
// - `explicit_content_lyrics`: `object.explicit_content_lyrics`
// - `explicit_lyrics`: `object.explicit_lyrics`
// - `id`: `object.id`
// - `link`: `object.link`
// - `md5_image`: `object.md5_image`
// - `preview`: `object.preview`
// - `rank`: `object.rank`
// - `readable`: `object.readable`
// - `title`: `object.title`
// - `title_short`: `object.title_short`
// - `title_version`: `object.title_version`
// - `type`: `object.type`

// You can replace `object` with the name of the actual object variable you have in your code. For example, if the object is assigned to a variable named `song`, you would access the properties as `song.album.cover`, `song.artist.picture`, etc.

// By using these access methods, you can retrieve the specific URLs and information for each property in the object.
// To check if an image URL is valid and returns a proper image, you can make an HTTP request to the image URL and check the response status. If the status is within the success range (e.g., 200-299), it indicates that the image URL is valid and returns a proper image. Here's an example of how you can implement this check in JavaScript:

// ```jsx
// function checkImageURL(url) {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.onload = function () {
//       resolve(true);
//     };
//     img.onerror = function () {
//       resolve(false);
//     };
//     img.src = url;
//   });
// }

// // Usage:
// const imageUrl = 'https://e-cdns-images.dzcdn.net/images/cover/dab1bff67e1d43c76ae00c302c3c506a/250x250-000000-80-0-0.jpg';

// checkImageURL(imageUrl)
//   .then((isValid) => {
//     if (isValid) {
//       // The image URL is valid
//       console.log('Image URL is valid');
//     } else {
//       // The image URL is not valid
//       console.log('Image URL is not valid');
//     }
//   })
//   .catch((error) => {
//     // An error occurred while checking the image URL
//     console.error('Error checking image URL:', error);
//   });
// ```

// In this example, the `checkImageURL` function takes an image URL as a parameter and returns a promise. It creates a new `Image` object and sets the `onload` and `onerror` handlers. If the image loads successfully, the promise resolves with `true`, indicating that the image URL is valid. If an error occurs while loading the image or the image fails to load, the promise resolves with `false`, indicating that the image URL is not valid.

// You can use this `checkImageURL` function to verify the validity of the image URLs you receive and handle them accordingly in your code.